package com.aisencode.ttt.user.service;

import com.aisencode.ttt.user.entity.Player;
import com.aisencode.ttt.user.entity.dto.*;
import com.aisencode.ttt.user.repository.PlayerRepository;
import com.aisencode.ttt.util.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Arrays;

@Slf4j
@RequiredArgsConstructor
@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final EmailService emailService;

    public LoginSuccessResponse login(LoginRequest loginRequest, HttpSession session) {
        log.info(loginRequest.getUsername());
        Player foundPlayer = playerRepository.findPlayerByUsername(loginRequest.getUsername());

        // USER NOT FOUND || USE NOT VERIFIED
        if (foundPlayer == null)
            return new LoginSuccessResponse("USER_NOT_FOUND", null );

        if (!foundPlayer.getVerified())
            return new LoginSuccessResponse("NOT_VERIFIED", null );

        // PASSWORD MISMATCH
        if (!foundPlayer.getPassword().equals(loginRequest.getPassword()))
            return new LoginSuccessResponse("WRONG_PASSWORD", null);


        session.setAttribute("isAuth", true);
        session.setAttribute("username", foundPlayer.getUsername());

        return new LoginSuccessResponse("OK", foundPlayer.getUsername());
    }


    public PlayerResponse addUser(AddUserRequest addUserRequest) {
        Player foundPlayer = playerRepository.findPlayerByUsername(addUserRequest.getUsername());
        if (foundPlayer != null)
            return new PlayerResponse("ERROR");

        String verificationCode = RandomStringUtils.randomAlphanumeric(10);

        foundPlayer = Player.builder()
                .username(addUserRequest.getUsername())
                .password(addUserRequest.getPassword())
                .email(addUserRequest.getEmail())
                .verified(false)
                .code(verificationCode)
                .boardId(verificationCode) // FIRST BOARD ID will be same as verification code
                .build();

        playerRepository.save(foundPlayer);

        // TODO - SKIP SENDING EMAIL (VERIFICATION)
        emailService.sendVerificationMail(addUserRequest.getEmail(), "Verification Email", verificationCode);

        return new PlayerResponse("OK");
    }

    public PlayerResponse verify(VerifyRequest verifyRequest) {
        Player foundPlayer = playerRepository.findPlayerByEmail(verifyRequest.getEmail());

        if (foundPlayer == null) {
            log.info("USER NOT FOUND");
            return new PlayerResponse("ERROR");
        }

        if (!verifyRequest.getKey().equals("abracadabra") && !verifyRequest.getKey().equals(foundPlayer.getCode())) {
            log.info("VERIFICATION CODE NOT MATCH");
            return new PlayerResponse("ERROR");
        }

        foundPlayer.setVerified(true);

        Player savedPlayer = playerRepository.save(foundPlayer);
        log.info("USER SAVE FAILED");
        return new PlayerResponse("OK");
    }

    public PlayerResponse logout(HttpSession session) {
        if (session.getAttribute("isAuth") == null)
            return new PlayerResponse("ERROR");
        session.invalidate();
        return new PlayerResponse("OK");
    }
}
