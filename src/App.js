import { useState, useReducer } from "react";
import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";

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
      const newTodos = [...state];
      newTodos.map((todo) =>
        todo.id === action.payload.id
          ? {
              id: action.payload.id,
              title: action.payload.title,
              status: action.payload.status,
            }
          : todo
      );
      return [...state];
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
  const [latestTodoId, setLatestTodoId] = useState(initialTodos.length);
  const [newTask, setNewTask] = useState("");
  const [todos, dispatchTodos] = useReducer(todosReducer, initialTodos);
  // ↓ここで定義するのか？
  const handleAddTodo = () => {
    dispatchTodos({
      type: "add",
      payload: { id: latestTodoId, title: newTask },
    });
    setLatestTodoId(latestTodoId + 1);
  };
  return (
    <div className="App">
      <h1>TODOリスト</h1>
      {/* ↓compornentに渡すpropsはこれで良い？ */}
      <NewTaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTodo={handleAddTodo}
      />
      <TaskList todos={todos} />
    </div>
  );
}

export default App;
