import React, { useState } from "react";

export const DiaryEditor = () => {
  // 하나의 객체로 상태관리
  const [state, setState] = useState({
    author: "",
    content: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='DiaryEditor'>
      <h2>오늘의 일기</h2>
      <div>
        <input
          name='author'
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        {/* 입력받은 값을 새로운 상태값으로 저장한다. */}
        <textarea
          name='content'
          value={state.content}
          onChange={(e) => {
            setState(handleChangeState);
          }}
        />
      </div>
    </div>
  );
};
