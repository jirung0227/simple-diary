import "./App.css";
import { DiaryEditor } from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "정",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "정",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "정",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "정",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 5,
    author: "정",
    emotion: 5,
    created_date: new Date().getTime(),
  },
];
function App() {
  return (
    <div className='App'>
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
