import React, { useRef, useState } from "react";

export const DiaryEditor = React.memo(({ onCreate }) => {
  // useEffect(() => {
  //   console.log("update");
  // }, []);
  // 하나의 객체로 상태관리
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  // html돔 요소를 접근할 수 있는 기능
  const authorInput = useRef();
  const contentInput = useRef();

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    // 기본 값 초기화
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };
  return (
    <div className='DiaryEditor'>
      <h2>오늘의 일기</h2>
      <div>
        {/* input태그에 접근 가능 */}
        <input
          ref={authorInput}
          name='author'
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name='content'
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        오늘의 감정점수 :
        <select
          name='emotion'
          id='emotion'
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
});
