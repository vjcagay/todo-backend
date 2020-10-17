package com.backend.todo;

public class Todo {
    
    private final String _id;
    private final String task;
    private final Boolean done;

    public Todo(String _id, String task, boolean done) {
        this._id = _id;
        this.task = task;
        this.done = done;
    }

    public String getId() {
        return this._id;
    }
    
    public String getTask() {
        return this.task;
    }

    public Boolean getDone() {
        return this.done;
    }
}
