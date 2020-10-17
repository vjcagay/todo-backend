# Todo Backend

This project aims to create todo app implementations demonstrating basic CRUD (create, read, update, delete) operations on several backend programming languages.

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

This project is inspired from [TodoMVC](http://todomvc.com) but instead of implementing a todo app with several MV\* frameworks this will only focus on a single frontend with several implementations in the backend.
