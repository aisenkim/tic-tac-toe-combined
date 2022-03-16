package com.aisencode.ttt.game.entity.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class ListGameEntity {

    private String id;
    private LocalDate start_date;

}
