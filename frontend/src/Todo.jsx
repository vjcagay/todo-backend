import React, { useEffect, useRef, useState } from "react";

const Todo = ({ value, onChange, onDelete }) => {
  const input = useRef(null);
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(value.task);

  useEffect(() => {
    if (edit) {
      input.current.focus();
      document.addEventListener("click", isOutSideClick);
    }

    return () => document.removeEventListener("click", isOutSideClick);
  }, [edit]);

  const isOutSideClick = (event) => {
    if (event.target !== input.current) {
      setEdit(false);
    }
  };

  return (
    <li className="group border-t px-4 py-2 text-gray-700 flex items-center" onDoubleClick={() => setEdit(true)}>
      {edit ? (
        <input
          type="text"
          className="w-full py-1 outline-none"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter" && task.trim()) {
              setEdit(false);
              onChange({ ...value, task: task.trim() });
            }
          }}
          ref={input}
        />
      ) : (
        <>
          <input
            type="checkbox"
            className="mr-4 flex-grow-0"
            checked={value.done}
            onChange={(event) => onChange({ ...value, done: event.target.checked })}
          />
          <span className={value.done ? "py-1 flex-grow line-through" : "py-1 flex-grow"}>{value.task}</span>
          <button className="ml-4 text-xl outline-none" onClick={() => onDelete(value.id)}>
            ×
          </button>
        </>
      )}
    </li>
  );
};

export default Todo;
