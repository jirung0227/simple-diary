import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { DiaryEditor } from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);
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
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;

    /** 메모제이션 사용시 의존성 배열에 있는 값이 바뀌지 않으면 함수가 재렌더링되지 않으므로
     * state의 값을 최신값으로 사용하지 못하는 문제가 발생할 수 있다.
     * 이때 함수형 업데이트를 사용하자 */

    // 함수형 업데이트 : 인자를 넘겨줌으로써 현재 값을 사용할 수 있다.
    setData((data) => [newItem, ...data]);
    // 값 업데이트 : 값을 넘겨줌으로써 렌더링된 시점의 값을 사용하게 된다.
    // setData([newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    // const newDiaryList = data.filter((it) => it.id !== targetId);
    // 함수형 업데이트
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
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
    <div className='App'>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
