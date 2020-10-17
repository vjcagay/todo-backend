package com.backend.todo;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
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

}
