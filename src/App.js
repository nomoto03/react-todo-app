import "./App.css";

function App() {
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
  return (
    <div className="App">
      <h1>TODOリスト</h1>
      <div>
        <h2>新規タスク</h2>
        <input type="text" />
        <button>追加</button>
      </div>
      <div>
        <h2>タスク一覧</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <button>完了</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
