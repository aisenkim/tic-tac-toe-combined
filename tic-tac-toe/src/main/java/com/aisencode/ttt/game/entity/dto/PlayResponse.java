package com.aisencode.ttt.game.entity.dto;

import lombok.Data;

import java.util.List;

@Data
public class PlayResponse {

    private final String status;
    private final List<String> grid;
    private final String winner;

}
