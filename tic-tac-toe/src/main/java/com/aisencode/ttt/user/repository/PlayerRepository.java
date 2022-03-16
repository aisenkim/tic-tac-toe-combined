package com.aisencode.ttt.user.repository;

import com.aisencode.ttt.user.entity.Player;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface PlayerRepository extends MongoRepository<Player, String> {
    @Query("{username: '?0'}")
    Player findPlayerByUsername(String username);

    @Query("{email: '?0'}")
    Player findPlayerByEmail(String email);
}
