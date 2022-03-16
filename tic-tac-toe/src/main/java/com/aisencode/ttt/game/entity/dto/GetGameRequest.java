package com.aisencode.ttt.game.entity.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetGameRequest {

    @JsonProperty("id")
    private String id;

}
