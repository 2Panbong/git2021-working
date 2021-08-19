
// JSX: Javascript 기반의 HTML 태그 형식
// 각각의 태그(element)들은 javascript 객체임
// 일반적인 html 태그 표기법과 다름

// JSX Element
// const element = (
//  <h1 className="greeting">
//    Hello, world!
//    <h1>
//  );

//실제 컴파일되는 결과
// const element = React.createElement(
  //   'h1',// 태그 종류
  // {className: 'greeting'}, // 속성
  // 'Hello,wordl!'//컨텐츠
  // );

  // document.createElement("div")
  // 실제 DOM을 생성함

  // React.createElement("div",...)
  // 가상 DOM을 생성함
  // 가상 DOM == javascript 객체
  // 내부적으로 가상 DOM tree를 관리함
 
  // 렌더링(rendering) : 화면에 그리기
  // 가상 DOM을 생성하고 렌더링 시점(event loop)에 가상DOM을 HTML DOM으로 그림

  // 일반 DOM
  // DOM을 조작할 때마다 rendering함, 성능 저하

  // 가상 DOM
  // 렌더링 주기에 따라서 변동사항만 렌더링함, 성능 향상

// recat 관련 자료는 2020년 이후 것으로만
// Function Component
// 리액트는 함수이름이 대문자로 시작하는게 있음
// JSX Element를 반환함
// JS함수인데, JSX Element를 반환함 == Component
// 리액트에서 컴포넌트는 JSX Element를 렌더링하는 함수

import Header from "./components/Header";
import Button from './components/Button';
import Counter from './components/Counter';
import Calculator from './components/Calculator';


// React == 컴포넌트 개발 라이브러리
function App() {
  return (
    // main-container
    <div style={{ width:"500px",margin:"0 autoe" }}>
      {/* JSX 내부에서 주석 달기 */}
      {/* 재사용하지 않는 컴포넌트 */}
    <h1 style={{ color:"red" }}>Hello React with Typescript !</h1> 

    {/* 속성값을 변경하여 재사용하는 컴포넌트 */}
    {/* Component의 속성(prop)을 넘김 */}
    {/* 속성명 = {속성값} */}
     <Header color={"red"} title={"React"} />
     <Header color={"green"} title={"Typescript"} />
     <Header color={"blue"} title={"Function Component"} />

     <Button color ={"White"} backgroundColor = {"blue"} text = {"Add"} />
     <Button color ={"black"} backgroundColor = {"red"} text = {"Delete"} />
     <Button color ={"black"} backgroundColor = {"green"} text = {"Done"} />
     {/* <Header color={"blue"} title={"Typescript"}/>  */}
     {/* <Header color={"red"} title= {"React"}/> */}

     <Counter />
     <Calculator />
     <Generator />
    </div>
  );
}

// App.tsx 모듈의 기본 내보내기를 App 함수로 함
export default App;
