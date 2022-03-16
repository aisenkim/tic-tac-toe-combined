package com.aisencode.ttt.user.entity.dto;

import lombok.Data;

@Data
public class LoginSuccessResponse {

    private final String status;
    private final String username;
}
