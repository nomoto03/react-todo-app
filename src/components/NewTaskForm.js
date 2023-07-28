import React from "react";

const NewTaskForm = ({ newTask, setNewTask, handleAddTodo }) => {
  return (
    <div>
      <h2>新規タスク</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTodo}>追加</button>
    </div>
  );
};

export default NewTaskForm;
