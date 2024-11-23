import React, { useState } from "react";
import tick from "../../assets/tick.png";
import not_tick from "../../assets/not_tick.png";
import delete_icon from "../../assets/delete.png";
import update from "../../assets/update.webp";

const TodoItems = function ({
  text,
  time,
  id,
  isComplete,
  deleteTask,
  updateTask,
  toggleCheck,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleUpdate = function () {
    if (newText.trim() === "") return;
    updateTask(id, newText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center my-3 gap-2">
      {isEditing ? (
        <div className="flex flex-1 items-center">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border border-gray-300 rounded outline-none px-2 py-1 w-full"
          />
          <button
            onClick={handleUpdate}
            className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div
          onClick={() => toggleCheck(id)}
          className="flex flex-1 items-center cursor-pointer"
        >
          <img
            src={isComplete ? tick : not_tick}
            alt="checked"
            className="w-6"
          />
          <p
            className={`text-slate-900 ml-4 text-[16px] ${
              isComplete ? "line-through" : ""
            }`}
          >
            {text}
          </p>
        </div>
      )}

      <img
        onClick={() => deleteTask(id)}
        src={delete_icon}
        alt="delete"
        className="w-3.5 cursor-pointer"
      />
      <img
        onClick={() => setIsEditing(!isEditing)}
        src={update}
        alt="update"
        className="w-3.5 cursor-pointer"
      />
      <p className="text-sm text-gray-700">{time}</p>
    </div>
  );
};

export default TodoItems;
