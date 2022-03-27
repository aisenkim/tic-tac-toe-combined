package com.aisencode.ttt.user.controller;

import com.aisencode.ttt.user.entity.dto.*;
import com.aisencode.ttt.user.service.PlayerService;
import com.aisencode.ttt.util.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

//@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/ttt/api/v1")
public class PlayerController {

    private final PlayerService playerService;

    @PostMapping("/adduser")
    public ResponseEntity<PlayerResponse> addUser(@RequestBody AddUserRequest addUserRequest) {
        HttpHeaders idHeader = new HttpHeaders();
        idHeader.set("X-CSE356", "61f9c246ca96e9505dd3f812");
        return ResponseEntity.ok().headers(idHeader).body(playerService.addUser(addUserRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginSuccessResponse> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        HttpHeaders idHeader = new HttpHeaders();
        idHeader.set("X-CSE356", "61f9c246ca96e9505dd3f812");
        return ResponseEntity.ok().headers(idHeader).body(playerService.login(loginRequest, session));
    }

//
//   @PostMapping("/logout")
//   public ResponseEntity<PlayerResponse> logout() {
//      HttpHeaders idHeader = new HttpHeaders();
//      idHeader.set("X-CSE356", "61f9c246ca96e9505dd3f812");
//      return ResponseEntity.ok().headers(idHeader).body(playerService.login(loginRequest));
//   }

    @PostMapping("/verify")
    public ResponseEntity<PlayerResponse> verify(@RequestBody VerifyRequest verifyRequest) {
        HttpHeaders idHeader = new HttpHeaders();
        idHeader.set("X-CSE356", "61f9c246ca96e9505dd3f812");
        return ResponseEntity.ok().headers(idHeader).body(playerService.verify(verifyRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<PlayerResponse> logout(HttpSession session) {
        HttpHeaders idHeader = new HttpHeaders();
        idHeader.set("X-CSE356", "61f9c246ca96e9505dd3f812");
        return ResponseEntity.ok().headers(idHeader).body(playerService.logout(session));
    }
}
