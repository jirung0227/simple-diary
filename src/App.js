import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import "./App.css";
import { DiaryEditor } from "./DiaryEditor";
import DiaryList from "./DiaryList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };

      return [newItem, ...state];
    case "REMOVE":
      return state.filter((it) => it.id !== action.targetId);
    case "EDIT":
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );

    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  /**
   * reducer함수 사용시 함수형 업데이트 필요없이 현재의 state를 자동으로 참조해주어
   * useCallback을 쓰면서 의존성 배열을 걱정할 필요가 없다.
   */
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        author,
        content,
        emotion,
        id: dataId.current,
      },
    });

    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  // const dispatches = {
  //   onCreate, onRemove, onEdit
  // }
  //위 형식은 재렌더링시 재 생성됨
  //재생성되지 않게 useMemo를 사용하여 객체를 묵어야함
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  //첫번째 인자인 콜백함수가 리턴하는 값을 최적화 할 수 있도록 도와줌
  //두번째 인자인 dependency배열의 값이 바뀔되면 콜백함수 실행
  //useMemo 리턴값은 콜백함수 리턴값
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = Math.round((goodCount / data.length) * 100);
    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className='App'>
          <DiaryEditor onCreate={onCreate} />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList onEdit={onEdit} onRemove={onRemove} />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
