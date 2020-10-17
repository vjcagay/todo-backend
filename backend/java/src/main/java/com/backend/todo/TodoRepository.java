package com.backend.todo;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface TodoRepository extends MongoRepository<Todo, String> {

  // We write a custom delete operation based on the filter
  @Query(value = "{ done: true }", delete = true)
  public List<Todo> deleteDoneTodos();
}
