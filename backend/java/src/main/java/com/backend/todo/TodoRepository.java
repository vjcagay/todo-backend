package com.backend.todo;

import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface TodoRepository extends MongoRepository<Todo, String> {

  // We write a custom delete operation based on the filter
  @Query(value = "{ done: true }", delete = true)
  public List<Todo> deleteDone();

  // Map _id as a query by using ?0
  @Query(value = "{ '_id': ?0 }", delete = true)
  public List<Todo> deleteOne(String _id);
}
