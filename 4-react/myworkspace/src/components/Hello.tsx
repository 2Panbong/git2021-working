import { useRef, useState } from "react";

const Hello = () => {
  // useState<state타입>(초깃값)
  // state타입도 union타입으로 설정 가능
  const [userName, setUserName] = useState<string | undefined>(""); //타입추론일어나서 타입값안넣어도 됨

  // 참조객체 생성
  // useRef<참조객체타입>(초깃값);

  // JSX Element를 참조하는 객체라면
  // JSX Element로 렌더링 되는 HTML 요소의 타입을 넣어야함, 기본값은 null
  const inputRef = useRef<HTMLInputElement>(null);

  const hello = () => {
    // JSX Element를 참조하는 개체일때
    // 참조객체.current는 현재 렌더링된 HTML요소
    // inputRef.current가 null/undefined가 아니면 value 속성을 참조해라
    // console.log(inputRef.current);
    //console.log(inputRef.current?.value); // inputRef는 null일수도있어서 ?로 보여줌

    // current 객체가 있으면 ==렌더링된 HTML요소 있으면
    // current.value == 입력박스의 입력값(string)

    // current 객체가 없으면 == 렌더링된 HTMl요소 없음(렌더링 되기 전,null)
    // current?.value == undefined

    setUserName(inputRef.current?.value);

    // 값 비워주기
    inputRef.current && (inputRef.current.value = "");
  };

  //console.log(inputRef.current); //current가 null
  //console.log(inputRef.current?.value); // current가 null이면 undefined를 반환 value값

  return (
    <div>
      <h2>Hello</h2>
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          hello();
        }}
      >
        인사
      </button>
      {userName && <div>안녕하세요, [{userName}] 님!</div>}
    </div>
  );
};

export default Hello;
