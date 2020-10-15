import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Todo from "./Todo";

const ajax = async (url, method = "get", body = {}) => {
  const result = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: method !== "get" ? JSON.stringify(body) : null,
  });

  return await result.json();
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const todos = await ajax("/todos");
      setTodos(todos);
    };
    getTodos();
  }, []);

  // Perform CRUD
  const manageTodos = (todo, method) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((item) => item._id === todo._id);
    if (index === -1) {
      newTodos.push(todo);
    } else if (method === "put") {
      newTodos[index] = todo;
    } else if (method === "delete") {
      newTodos.splice(index, 1);
    }
    setTodos(newTodos);
  };

  const addTodo = async () => {
    const todo = await ajax("/todos", "post", { task });
    manageTodos(todo);
    setTask("");
  };

  const updateTodo = (todo) => {
    const method = "put";
    manageTodos(todo, method);
    ajax("/todos", method, todo);
  };

  const deleteTodo = (todo) => {
    const method = "delete";
    manageTodos(todo, method);
    ajax("/todos", "delete", todo);
  };

  const activeItems = todos.filter((todo) => !todo.done).length;

  const deleteDoneTodos = () => {
    setTodos(todos.filter((todo) => !todo.done));
    ajax("/todos/all", "delete");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-6xl text-center text-red-300">todos</h1>
      <ul className="border rounded bg-white mt-6">
        <li className="border-t first:border-t-0 px-1 py-1">
          <input
            type="text"
            className="block w-full text-xl px-4 py-2 placeholder-gray-400 text-gray-700 outline-none"
            placeholder="What needs to be done?"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            onKeyUp={(event) => event.key === "Enter" && event.target.value && addTodo()}
            autoFocus
          />
        </li>
        {todos.map((todo) => (
          <Todo key={todo._id} value={todo} onChange={updateTodo} onDelete={deleteTodo} />
        ))}
        {todos.length > 0 && (
          <li className="border-t flex justify-between px-4 py-1 text-gray-500">
            <span className="flex-grow-0">
              {activeItems} {activeItems > 1 ? "items" : "item"} left
            </span>
            <button className="flex-grow-0 outline-none" onClick={deleteDoneTodos}>
              Clear done
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
