package com.aisencode.ttt.game.service;

import com.aisencode.ttt.game.GameUtil;
import com.aisencode.ttt.game.entity.Game;
import com.aisencode.ttt.game.entity.dto.*;
import com.aisencode.ttt.game.repository.GameRepository;
import com.aisencode.ttt.user.entity.Player;
import com.aisencode.ttt.user.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class GameService {

    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;

    public PlayResponse playGame(PlayRequest playRequest, String username) {
        log.info("USERNAME from session: " + username);
        Player currentPlayer = playerRepository.findPlayerByUsername(username);

        if (currentPlayer == null) {
            log.info("User not found in play game");
            return new PlayResponse("ERROR", null, null);
        }

        Game currentGame = gameRepository.findGameById(currentPlayer.getBoardId()); // CHECK IF GAME EXISTS
        if (currentGame == null) {
            log.info("INITIALIZING game with new id stored in currentPlayer");  // either when user first created or after game over (win / tie / lose)
            currentGame = Game.builder()
                    .id(currentPlayer.getBoardId())
                    .username(username)
                    .grid(Arrays.asList(" ", " ", " ", " ", " ", " ", " ", " ", " "))
                    .winner(" ")
                    .start_date(LocalDate.now())
                    .build();
        }

        List<String> currentGrid = currentGame.getGrid();

        if (playRequest.getMove() == null || playRequest.getMove().isEmpty()) {
            log.info("User move is null or empty");
            return new PlayResponse("OK", currentGrid, null);
        }

        int move = Integer.parseInt(playRequest.getMove()); // idx 0 - 8

        if (move < 0 || move > 8) {
            log.info("Out of bounds Error");
            return new PlayResponse("ERROR", currentGrid, null);
        }

        // CHECK IF A MOVE IS LEGAL
        if (!currentGrid.get(move).equals(" ")) {
            log.info("Illegal Move. Move at index: " + move + " has already been made");
            return new PlayResponse("ERROR", currentGrid, null);
        }

        currentGrid.set(move, "O"); // SET USER's MOVE AS "O"
        log.info("User made move at: " + move);

        String potentialWinner = GameUtil.checkWinner(currentGrid);
        if (!potentialWinner.equals(" ")) {
            log.info("USER MADE THE WINNING MOVE AT: " + move);
            currentGame.setGrid(currentGrid);
            currentGame.setWinner(potentialWinner);
            gameRepository.save(currentGame);
            currentPlayer.setBoardId(RandomStringUtils.randomAlphanumeric(10));
            playerRepository.save(currentPlayer);
            return new PlayResponse("OK", currentGrid, potentialWinner); // RETURN WINNING BOARD AND WINNER
        }

        for (int i = 0; i < currentGrid.size(); i++) {
            if (currentGrid.get(i).equals(" ")) {
                log.info("SETTING BOT'S MOVE AT: " + i);
                currentGrid.set(i, "X"); // SET BOT'S MOVE
                break;
            }
        }

        // CHECK IF BOT'S MOVE IS THE WINNING MOVE
        potentialWinner = GameUtil.checkWinner(currentGrid);
        if (!potentialWinner.equals(" ")) {
            log.info("BOT MADE THE WINNING MOVE AT: " + move);
            currentGame.setGrid(currentGrid);
            currentGame.setWinner(potentialWinner);
            gameRepository.save(currentGame);
            currentPlayer.setBoardId(RandomStringUtils.randomAlphanumeric(10));
            playerRepository.save(currentPlayer);
            return new PlayResponse("OK", currentGrid, potentialWinner); // RETURN WINNING BOARD AND WINNER
        }

        // CHECK FOR TIE
        if (GameUtil.isGridFull(currentGrid)) {
            log.info("TIE MOVE MADE AT: " + move);
            currentGame.setGrid(currentGrid);
            currentGame.setWinner(" ");
            gameRepository.save(currentGame);
            currentPlayer.setBoardId(RandomStringUtils.randomAlphanumeric(10));
            playerRepository.save(currentPlayer);
            return new PlayResponse("OK", currentGrid, " "); // RETURN WINNING BOARD AND WINNER
        }

        // NORMAL MOVE -> SAVE GAME AND RETURN
        gameRepository.save(currentGame);
        System.out.println("currentGame = " + currentGame.getGrid());
        return new PlayResponse("OK", currentGrid, null); // RETURN WINNING BOARD AND WINNER
    }

    public ListGameResponse listGames(String username) {
        List<Game> userGames = gameRepository.findAllByUsername(username);
        if (userGames == null || userGames.isEmpty()) {
            log.info("User Game Null or Empty");
            return ListGameResponse.builder()
                    .status("OK")
                    .games(new ArrayList<>())
                    .build();
        }

        List<ListGameEntity> listGames = new ArrayList<>();
        for (Game game : userGames) {
            listGames.add(ListGameEntity.builder().id(game.getId()).start_date(game.getStart_date()).build());
        }

        return ListGameResponse.builder().status("OK").games(listGames).build();
    }


    public GetGameResponse getGame(String id) {
        log.info("Game id is: " + id);
        Game game = gameRepository.findGameById(id);
        if (game == null) {
            log.info("Game not found by the provided ID");
            return GetGameResponse.builder()
                    .status("ERROR")
                    .grid(null)
                    .winner(null).build();
        }
        return GetGameResponse.builder()
                .status("OK")
                .grid(game.getGrid())
                .winner(game.getWinner()).build();
    }

    public GetScoreResponse getScore(String username) {
        log.info("username is: " + username);
        List<Game> playerGames = gameRepository.findAllByUsername(username);
        int human = 0, wopr = 0, tie = 0;
        if (playerGames == null)
            return GetScoreResponse.builder()
                    .status("ERROR")
                    .human(null)
                    .wopr(null)
                    .tie(null).build();

        for (Game game : playerGames) {
            if(game.getWinner() == null) {
                log.info("null winner game id: " + game.getId());
                continue;
            }
            if (game.getWinner().equals("O"))
                human++;
            else if (game.getWinner().equals("X"))
                wopr++;
            else
                tie++;
        }

        return GetScoreResponse.builder()
                .status("OK")
                .human(human)
                .wopr(wopr)
                .tie(tie).build();
    }
}