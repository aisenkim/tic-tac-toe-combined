package com.aisencode.ttt.game.entity.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetGameResponse {

   private String status;
   private List<String> grid;
   private String winner;

}
