package com.aisencode.ttt.game.entity.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetScoreResponse {

    private String status; // OK or ERROR
    private Integer human; // Number of wins for human
    private Integer wopr;  // Number of wins for server
    private Integer tie;   // Number of ties

}
