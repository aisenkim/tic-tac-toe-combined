package com.aisencode.ttt.game.entity.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
public class UserId {

    @JsonProperty("id")
    private String id;
}
