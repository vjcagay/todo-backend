# Todo Backend

This project aims to create todo app implementations demonstrating basic CRUD (create, read, update, delete) operations on several backend programming languages.

Inspired by [TodoMVC](http://todomvc.com), I created this project with the aim of learning new programming languages in a fun way. Simple enough, but still teaches the fundamentals of backend development.

- [x] [JavaScript (Node.js)](backend/javascript/README.md)
- [x] [Java (Spring Boot)](backend/java/README.md)
- [ ] TypeScript
- [ ] Ruby
- [ ] Go
- [ ] PHP
- [ ] Rust
- [ ] C/C++
- [ ] Scala
- [ ] Swift
- [ ] Python

...and many more in the future.

The app, no matter the backend, will connect only into a single MongoDB database and will access the same set of data.

## Screenshot

![screenshot](images/screenshot.png)

## Setup

- Make sure that you have MongoDB installed in your system.
- Run `./db/start.sh` to start the local MongoDB server.
- Check out the [frontend documentation](frontend/README.md) for instructions on how to prepare the frontend so that it can be served by the backend code of the language of your choosing.
- Choose a backend language in [`backend`](backend) you want
- Let's rock!

## API

A Todo is an object that will have the following data:

- ObjectID `_id` acts as the primary key
- String `task` describes what the Todo is about
- Boolean `done` marks the when the Todo is done

The frontend and backend should use the following endpoints:

- **GET** `/todos`
  - Gets all Todos
  - Does not require anything
  - Returns an array of Todos
- **POST** `/todos`
  - Create a new Todo
  - Requires Todo data
  - Returns new Todo with the generated `_id`
- **PUT** `/todos/{_id}`
  - Updates an existing Todo
  - Requires Todo data and `_id` to be passed on the URL
  - Returns a Todo with the updated data (`_id` is immutable)
- **DELETE** `/todos/{_id}`
  - Deletes a Todo
  - Requires `_id` to be passed on the URL
  - Returns a JSON object displaying the number of deleted Todos, in this case, only 1 (`{ deleted: 1 }`)
- **DELETE** `/todos`
  - Deletes all Todos that are marked `done`
  - Does not require anything
  - Returns a JSON object displaying the number (n > -1) of deleted Todos (`{ deleted: n > -1 }`)

## Author

© Vincent John Cagay

- [https://vjca.gay](https://vjca.gay)
- [https://vjcagay.com](https://vjcagay.com)
