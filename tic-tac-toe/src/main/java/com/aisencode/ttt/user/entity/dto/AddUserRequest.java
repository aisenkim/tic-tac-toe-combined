package com.aisencode.ttt.user.entity.dto;

import lombok.Data;

@Data
public class AddUserRequest {

    private final String username;
    private final String password;
    private final String email;

}
