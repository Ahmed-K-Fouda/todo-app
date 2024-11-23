import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../../assets/todo_icon.png";
import TodoItems from "../Todo-Item/TodoItems";

const Todo = function () {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRef = useRef();

  const addTask = function () {
    const inputText = inputRef.current.value.trim();

    // guard class
    if (inputText === "") return;

    const now = new Date();
    const formattedTime = `${now.toLocaleDateString(undefined, {
      weekday: "long",
    })} ${now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      time: formattedTime,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTask = function (id) {
    setTodoList((prev) => prev.filter((todo) => todo?.id !== id));
  };

  const updateTask = function (id, newText) {
    setTodoList((prev) =>
      prev.map((todo) => (todo?.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const toggleCheck = function (id) {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo?.isComplete };
        }
        return todo;
      });
    });
  };

  //   save todos on localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* -------- Title -------- */}

      <div className="flex items-center mt-7 gap-2">
        <img src={todo_icon} alt="todo icon" className="w-8" />
        <h1 className="text-3xl font-semibold">To-Do List </h1>
      </div>

      {/* -------- input box -------- */}

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Your Task"
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
        />
        <button
          onClick={addTask}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          Add +
        </button>
      </div>

      {/* -------- Todo list -------- */}

      <div>
        {todoList.map((item) => {
          return (
            <TodoItems
              key={item?.id}
              text={item?.text}
              id={item?.id}
              isComplete={item?.isComplete}
              deleteTask={deleteTask}
              updateTask={updateTask}
              toggleCheck={toggleCheck}
              time={item?.time}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
