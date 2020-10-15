import React, { useEffect, useRef, useState } from "react";

const Todo = ({ value, onChange, onDelete }) => {
  const input = useRef(null);
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState("");

  useEffect(() => {
    if (edit) {
      // Copy the value from parent first as initial value
      setTask(value.task);
      input.current.focus();
      document.addEventListener("click", isOutSideClick);
    } else {
      // When saving make sure it's not empty
      if (task.trim()) {
        onChange({ ...value, task: task.trim() });
      }
      setTask("");
    }

    return () => document.removeEventListener("click", isOutSideClick);
  }, [edit]);

  const isOutSideClick = (event) => event.target !== input.current && setEdit(false);

  return (
    <li className="group border-t px-4 py-2 text-gray-700 flex items-center" onDoubleClick={() => setEdit(true)}>
      {edit ? (
        <input
          type="text"
          className="w-full py-1 outline-none"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          onKeyUp={(event) => event.key === "Enter" && task.trim() && setEdit(false)}
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
          <button className="ml-4 text-xl outline-none" onClick={() => onDelete(value._id)}>
            ×
          </button>
        </>
      )}
    </li>
  );
};

export default Todo;
