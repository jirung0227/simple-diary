import { useContext } from "react";
import { DiaryStateContext } from "./App";
import DiaryItem from "./DiaryItem";

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext);

  return (
    <div className='DiaryList'>
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {/* props drilling: 사용하지 않는 props을 내려준다.(추후 다룰예정) */}
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
