package com.aisencode.ttt.user.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document("player")
public class Player {

    @Id
    private String id;

    private String username;

    private String password;

    private String email;

    private Boolean verified;

    private String code;

    private String boardId;

}
