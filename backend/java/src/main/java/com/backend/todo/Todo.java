package com.backend.todo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todos")
public class Todo {

  @Id
  private String _id;

  private final String task;
  private final boolean done;

  public Todo(String _id, String task, boolean done) {
    this._id = _id;
    this.task = task;
    this.done = done;
  }

  public String get_id() {
    return this._id;
  }

  // This function should be implemented so that the MongoRepository class
  // can assign the ObjectId after insertion
  public void set_id(String _id) {
    this._id = _id;
  }

  public String getTask() {
    return this.task;
  }

  public boolean getDone() {
    return this.done;
  }
}
