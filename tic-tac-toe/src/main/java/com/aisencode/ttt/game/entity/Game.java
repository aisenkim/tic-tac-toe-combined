package com.aisencode.ttt.game.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("game")
public class Game {

    private String id;

    private String username;

    private List<String> grid;

    private String winner;

    private LocalDate start_date;

}
