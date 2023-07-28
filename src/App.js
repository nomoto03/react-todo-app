import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";

const STATUSES = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
};

const todos = [
  { id: 0, title: "朝ごはん", status: STATUSES.DONE },
  { id: 1, title: "昼ごはん", status: STATUSES.IN_PROGRESS },
  { id: 2, title: "夜ごはん", status: STATUSES.TODO },
];

function App() {
  return (
    <div className="App">
      <h1>TODOリスト</h1>
      <NewTaskForm />
      <TaskList todos={todos} />
    </div>
  );
}

export default App;
