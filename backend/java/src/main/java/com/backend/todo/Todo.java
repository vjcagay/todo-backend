package com.backend.todo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todos")
public class Todo {
    
    @Id
    private final String _id;

    private final String task;
    private final Boolean done;

    public Todo(String _id, String task, boolean done) {
        this._id = _id;
        this.task = task;
        this.done = done;
    }

    public String get_id() {
        return this._id;
    }
    
    public String getTask() {
        return this.task;
    }

    public Boolean getDone() {
        return this.done;
    }
}
