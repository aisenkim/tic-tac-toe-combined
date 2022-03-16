package com.aisencode.ttt.game.entity.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class PlayRequest {

    @JsonProperty("move")
    private String move;

}
