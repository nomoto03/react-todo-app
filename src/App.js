import { useState, useReducer } from "react";
import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import TaskEditForm from "./components/TaskEditForm";

const STATUSES = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
};

const todosReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          status: STATUSES.TODO,
        },
      ];
    case "update":
      return [...state].map((todo) =>
        todo.id === action.payload.id
          ? {
              id: action.payload.id,
              title: action.payload.title,
            }
          : todo
      );
    case "delete":
      return [...state].filter((todo) => todo.id !== action.payload.id);
    default:
      throw Error("Unknown action:" + action.type);
  }
};

function App() {
  const initialTodos = [
    { id: 0, title: "朝ごはん", status: STATUSES.DONE },
    { id: 1, title: "昼ごはん", status: STATUSES.IN_PROGRESS },
    { id: 2, title: "夜ごはん", status: STATUSES.TODO },
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [latestTodoId, setLatestTodoId] = useState(initialTodos.length);
  const [editId, setEditId] = useState(0);
  const [newTask, setNewTask] = useState("");
  const [todos, dispatchTodos] = useReducer(todosReducer, initialTodos);
  // ↓ここで定義するのか？
  const handleAddTodo = () => {
    dispatchTodos({
      type: "add",
      payload: { id: latestTodoId, title: newTask },
    });
    setLatestTodoId(latestTodoId + 1);
    setNewTask("");
  };
  const handleEditTodo = (currentTodoId) => {
    dispatchTodos({
      type: "update",
      // TODO: statusの編集
      payload: { id: currentTodoId, title: newTask },
    });
    setIsEditing(false);
    setNewTask("");
  };
  const handleEditTaskFormClose = () => {
    setIsEditing(false);
    setNewTask("");
  };
  const handleEditTaskFormOpen = (id, title) => {
    setIsEditing(true);
    setEditId(id);
    setNewTask(title);
  };
  const handleCompleteTodo = (currentTodoId) => {
    dispatchTodos({
      type: "delete",
      payload: { id: currentTodoId },
    });
  };
  return (
    <div className="App">
      <h1>TODOリスト</h1>
      {/* ↓compornentに渡すpropsはこれで良い？ */}
      {isEditing ? (
        <TaskEditForm
          editId={editId}
          newTask={newTask}
          setNewTask={setNewTask}
          handleEditTodo={handleEditTodo}
          handleEditTaskFormClose={handleEditTaskFormClose}
        />
      ) : (
        <NewTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTodo={handleAddTodo}
        />
      )}
      <TaskList
        todos={todos}
        handleEditTaskFormOpen={handleEditTaskFormOpen}
        handleCompleteTodo={handleCompleteTodo}
      />
    </div>
  );
}

export default App;
