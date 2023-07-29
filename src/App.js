import { useState, useReducer, useEffect } from "react";
import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import TaskEditForm from "./components/TaskEditForm";
import Filter from "./components/Filter";

export const STATUSES = {
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
    case "updateTitle":
      return [...state].map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
            }
          : todo
      );
    case "updateStatus":
      return [...state].map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              status: action.payload.status,
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
  const [editId, setEditId] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [todos, dispatchTodos] = useReducer(todosReducer, initialTodos);
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState(todos);
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
      type: "updateTitle",
      payload: { id: currentTodoId, title: newTask },
    });
    setIsEditing(false);
    setEditId(null);
    setNewTask("");
  };
  const handleEditTaskFormOpen = (id, title) => {
    setIsEditing(true);
    setEditId(id);
    setNewTask(title);
  };
  const handleEditTaskFormClose = () => {
    setIsEditing(false);
    setNewTask("");
  };
  const handleStatusChange = (currentTodoId, e) => {
    dispatchTodos({
      type: "updateStatus",
      payload: { id: currentTodoId, status: e.target.value },
    });
  };
  const handleCompleteTodo = (currentTodoId) => {
    dispatchTodos({
      type: "delete",
      payload: { id: currentTodoId },
    });
  };
  useEffect(() => {
    const handleFilterChange = () => {
      const newFilteredTodos =
        filter === "all"
          ? [...todos]
          : [...todos].filter((todo) => todo.status === filter);
      setFilteredTodos(newFilteredTodos);
    };
    handleFilterChange();
  }, [filter, todos]);

  return (
    <div className="App">
      <h1>TODOリスト</h1>
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
        todos={filteredTodos}
        handleEditTaskFormOpen={handleEditTaskFormOpen}
        handleStatusChange={handleStatusChange}
        handleCompleteTodo={handleCompleteTodo}
      >
        <Filter setFilter={setFilter} />
      </TaskList>
    </div>
  );
}

export default App;
