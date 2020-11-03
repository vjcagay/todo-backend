package com.backend.todo;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TodoService {

  @Autowired
  private TodoRepository repository;

  public static void main(String[] args) {
    SpringApplication.run(TodoService.class, args);
  }

  // "/" automatically maps to resources/static

  // Returns an array of Todos
  @GetMapping("/todos")
  public List<Todo> getTodos() {
    return repository.findAll();
  }

  // Returns new Todo with the generated id
  @PostMapping("/todos")
  public Todo addTodo(@RequestBody Todo todo) {
    // _id will be assigned to todo after successful insertion
    // By default, Spring will add a _class key to todo
    // https://stackoverflow.com/questions/6810488/spring-data-mongodb-mappingmongoconverter-remove-class/
    repository.insert(todo);
    return todo;
  }

  // Returns Todo with the updated values
  @PutMapping("/todos/{_id}")
  public Todo updateTodo(@PathVariable(name = "_id") String _id, @RequestBody Todo todo) {
    System.out.println(_id);
    Todo updatedTodo = new Todo(_id, todo.getTask(), todo.getDone());
    repository.save(updatedTodo);
    return updatedTodo;
  }

  // Returns { deleted: 1 }
  @DeleteMapping("/todos/{_id}")
  public Map deleteTodo(@PathVariable(name = "_id") String _id) {
    List<Todo> deletedTodo = repository.deleteOne(_id);

    // Along with Map, it this endpoin to return a custom JSON object
    return Collections.singletonMap("deleted", deletedTodo.size());
  }

  // Returns { deleted: <no. of deleted todos }
  @DeleteMapping("/todos")
  public Map<String, Integer> deleteAllDone() {
    List<Todo> deletedTodos = repository.deleteDone();

    // Along with Map, it this endpoin to return a custom JSON object
    return Collections.singletonMap("deleted", deletedTodos.size());
  }
}
