import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import Todo from "./Todo";

const App = () => {
  const [todos, setTodos] = useState([]);

  const [task, setTask] = useState("");

  const addTodo = () => {
    const newTodos = [...todos];
    newTodos.push({
      id: new Date().getTime(),
      task,
      done: false,
    });
    setTodos(newTodos);
    setTask("");
  };

  const updateTodo = (newTodo) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === newTodo.id);
    newTodos[index] = newTodo;
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const activeItems = todos.filter((todo) => !todo.done).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-6xl text-center text-red-300">todos</h1>
      <ul className="border rounded bg-white mt-6">
        <li className="border-t first:border-t-0 px-1 py-1">
          <input
            type="text"
            className="block w-full text-3xl px-4 py-2 placeholder-gray-400 text-gray-700 outline-none"
            placeholder="What needs to be done?"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            onKeyUp={(event) => event.key === "Enter" && event.target.value && addTodo()}
            autoFocus
          />
        </li>
        {todos.map((todo) => (
          <Todo key={todo.id} value={todo} onChange={updateTodo} onDelete={deleteTodo} />
        ))}
        {todos.length > 0 && (
          <li className="border-t flex px-4 py-1 text-gray-500">
            <span className="flex-grow-0">
              {activeItems} {activeItems > 1 ? "items" : "item"} left
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
