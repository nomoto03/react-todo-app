import React from "react";

import { STATUSES } from "../App";

const TaskList = ({
  todos,
  handleEditTaskFormOpen,
  handleStatusChange,
  handleCompleteTodo,
  children,
}) => {
  const statusOptions = [
    { value: STATUSES.TODO, label: "未着手" },
    { value: STATUSES.IN_PROGRESS, label: "着手中" },
    { value: STATUSES.DONE, label: "完了" },
  ];
  return (
    <div>
      <h2>タスク一覧</h2>
      {children}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <select value={todo.status} onChange={(e) => handleStatusChange(todo.id, e)}>
              {statusOptions.map((status) => (
                <option value={status.value}>{status.label}</option>
              ))}
            </select>
            <button onClick={() => handleEditTaskFormOpen(todo.id, todo.title)}>
              編集
            </button>
            <button onClick={() => handleCompleteTodo(todo.id)}>完了</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
