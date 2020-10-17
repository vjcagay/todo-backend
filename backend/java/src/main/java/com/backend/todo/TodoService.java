package com.backend.todo;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

  @GetMapping("/todos")
  public List<Todo> getTodos() {
    return repository.findAll();
  }

  @PostMapping("/todos")
  public Todo addTodo(@RequestBody Todo todo) {
    // _id will be assigned to todo after successful insertion
    // By default, Spring will add a _class key to todo
    // https://stackoverflow.com/questions/6810488/spring-data-mongodb-mappingmongoconverter-remove-class/
    repository.insert(todo);
    return todo;
  }

  @PutMapping("/todos")
  public Todo updateTodo(@RequestBody Todo todo) {
    repository.save(todo);
    return todo;
  }
}
