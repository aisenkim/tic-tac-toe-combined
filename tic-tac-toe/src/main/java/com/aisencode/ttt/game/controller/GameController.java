package com.aisencode.ttt.game.controller;


import com.aisencode.ttt.game.entity.dto.*;
import com.aisencode.ttt.game.service.GameService;
import com.aisencode.ttt.user.AuthUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/ttt/api/v1")
public class GameController {

    private final GameService gameService;

    @PostMapping("/ttt/play")
    public ResponseEntity<PlayResponse> playGame(@RequestBody PlayRequest playRequest, HttpSession session) {
        System.out.println("playRequest.getMove() = " + playRequest.getMove());
        HttpHeaders idHeader = AuthUtil.setHeader();

        if (session.getAttribute("isAuth") == null || session.getAttribute("username") == null) {
            log.info("USER NOT AUTHENTICATED");
            return ResponseEntity.ok().headers(idHeader).body(new PlayResponse("ERROR", null, null));
        }

        return ResponseEntity.ok().headers(idHeader).body(gameService.playGame(playRequest, session.getAttribute("username").toString()));
    }

    @PostMapping("/listgames")
    public ResponseEntity<ListGameResponse> listGames(HttpSession session) {
        HttpHeaders idHeader = AuthUtil.setHeader();

        Boolean isAuthenticated = AuthUtil.isAuth(session);
        if (!isAuthenticated) {
            log.info("USER NOT AUTHENTICATED");
            return ResponseEntity.ok().headers(idHeader).body(ListGameResponse.builder().status("ERROR").games(null).build());
        }

        return ResponseEntity.ok().headers(idHeader).body(gameService.listGames(session.getAttribute("username").toString()));
    }


    @PostMapping("/getgame")
    public ResponseEntity<GetGameResponse> getGame(@RequestBody GetGameRequest getGameRequest, HttpSession session) {
        HttpHeaders idHeader = AuthUtil.setHeader(); // For Grading Purpose

        Boolean isAuthenticated = AuthUtil.isAuth(session);
        if (!isAuthenticated) {
            log.info("USER NOT AUTHENTICATED");
            return ResponseEntity.ok().headers(idHeader).body(GetGameResponse.builder().status("ERROR").grid(null).winner(null).build());
        }

        return ResponseEntity.ok().headers(idHeader).body(gameService.getGame(getGameRequest.getId()));
    }


    @PostMapping("/getscore")
    public ResponseEntity<GetScoreResponse> getScore(HttpSession session) {

        HttpHeaders idHeader = AuthUtil.setHeader(); // For Grading Purpose

        Boolean isAuthenticated = AuthUtil.isAuth(session);
        if (!isAuthenticated) {
            log.info("USER NOT AUTHENTICATED");
            return ResponseEntity.ok().headers(idHeader).body(GetScoreResponse.builder()
                    .status("ERROR")
                    .human(null)
                    .wopr(null)
                    .tie(null).build());
        }

        return ResponseEntity.ok().headers(idHeader).body(gameService.getScore(session.getAttribute("username").toString()));
    }
}

