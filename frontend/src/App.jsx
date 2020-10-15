import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Todo from "./Todo";

// Tell the browser to send the data via JSON
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const App = () => {
  const [todos, setTodos] = useState([]);

  const [task, setTask] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const todos = await fetch("http://localhost:3000/todos");
      setTodos(await todos.json());
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    const todo = await fetch("http://localhost:3000/todos", {
      method: "post",
      headers,
      body: JSON.stringify({ task }),
    });
    const newTodos = [...todos];
    newTodos.push(await todo.json());
    setTodos(newTodos);
    setTask("");
  };

  const updateTodo = async (todo) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((item) => item._id === todo._id);
    newTodos[index] = todo;
    setTodos(newTodos);
    await fetch("http://localhost:3000/todos", {
      method: "put",
      headers,
      body: JSON.stringify(todo),
    });
  };

  const deleteTodo = async (_id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo._id === _id);
    newTodos.splice(index, 1);
    setTodos(newTodos);
    await fetch("http://localhost:3000/todos", {
      method: "delete",
      headers,
      body: JSON.stringify({ _id }),
    });
  };

  const activeItems = todos.filter((todo) => !todo.done).length;

  const deleteDoneTodos = async () => {
    setTodos(todos.filter((todo) => !todo.done));
    await fetch("http://localhost:3000/todos/all", {
      method: "delete",
    });
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
