package com.aisencode.ttt.game.entity.dto;

import lombok.*;

import java.util.List;

@Builder
@Data
public class ListGameResponse {

    private final String status;

    private final List<ListGameEntity> games;

}
