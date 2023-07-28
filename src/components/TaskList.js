import React from "react";

const TaskList = ({ todos, handleCompleteTodo }) => {
  return (
    <div>
      <h2>タスク一覧</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleCompleteTodo(todo.id)}>完了</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
