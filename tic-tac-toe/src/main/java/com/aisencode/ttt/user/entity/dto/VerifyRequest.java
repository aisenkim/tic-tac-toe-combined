package com.aisencode.ttt.user.entity.dto;

import lombok.Data;

@Data
public class VerifyRequest {

   private final String email;
   private final String key;

}
