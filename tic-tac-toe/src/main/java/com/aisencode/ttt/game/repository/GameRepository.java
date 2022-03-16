package com.aisencode.ttt.game.repository;

import com.aisencode.ttt.game.entity.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface GameRepository extends MongoRepository<Game, String> {

    @Query(value = "{username: '?0'}", fields="{'id' : 1, 'start_date' : 1, 'winner' : 1}")
    List<Game> findAllByUsername(String username);

    @Query("{_id: '?0'}")
    Game findGameById(String id);

}
