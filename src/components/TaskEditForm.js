import React from 'react'

const TaskEditForm = ({ editId, newTask, setNewTask, handleEditTodo, handleEditTaskFormClose }) => {
  return (
    <div>
      <h2>タスク編集</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={() => handleEditTodo(editId)}>保存</button>
      <button onClick={handleEditTaskFormClose}>キャンセル</button>
    </div>
  )
}

export default TaskEditForm
