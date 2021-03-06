// JSX : Javscript 기반의 HTML 태그 형식
// 각각의 태그(element)들은 javascript 객체임
// 일반적인 html 태그 표기법과 다름

// JSX Element
// const element = (
//    <h1 className = "greeting">
//      Hello, world!
//    </h1>
//  );

// 실제 컴파일되는 결과
// const element = React.createElement(
//   'h1', // 태그 종류
//   {className: 'greeting'}, // 속성
//   'Hello, world!'  // 컨텐트
// )

// document.createElement("div")
// 실제 DOM을 생성함

// React.createElement("div",...)
// 가상 DOM을 생성함
// 가상 DOM == javascript 객체
// 내부적으로 가상 DOM tree를 관리함

// 렌더링(rendering) : 화면에 그리기
// 가상DOM을 생성하고 렌더링시점(event loop)에 가상DOM을 HTML DOM으로 그림

// 일반 DOM
// DOM을 조작할 때마다 rendering 함, 성능 저하

// 가상 DOM
// 렌더링ㄹ 주기에 따라서 변동사항만 렌더링함

// react 관련 자료는 2020년 이후 것으로만

// Function Component
// 대문자로 시작함
// JSX Element를 반환함
// JS함수인데 , JSX Element를 반환함 == Component
// 리액트에서 컴포넌트는 JSX Element를 렌더링하는 함수

// https://react.vlpt.us/styling/02-css-module.html
// css module
// 파일명.module.css
// css를 사용하는 컴포넌트 범위로 css class 사용범위를 좁힐 수 있음

import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux"; // react 앱에 redux store를 제공해줌
import { store } from "./store"; // redux store

import { Link } from "react-router-dom";

import Home from "./features/Home";
import Profile from "./features/profile/Profile";
import Progress from "./components/progress/Progress";
import AlertStack from "./components/alert/AlertStack";

// SPA(Single Page Application)
// : 페이지 파일이 1개, index.html
// : 특정 영역(Switch)에 컴포넌트(js)를 로딩함
// : 애플리케이션이 컴파일될 때 import한 컴포넌트가 같이 컴파일됨
//   -> 컴파일됐을 때 파일크기가 커짐, 초기 로딩할 때 시간 걸림

// Lazy-Loading 처리
// 컴포넌트를 방문하는 시점에 로딩함

const Todo = lazy(() => import("./features/todo/TodoInlineEdit"));
const Feed = lazy(() => import("./features/feed/Feed_이학봉"));
// const ContactInline = lazy(() => import("./features/contact/ContactInline"));
const ContactInline = lazy(() => import("./features/contact/ContactInline"));
const Photo = lazy(() => import("./features/photo/Photo"));
const PhotoCreate = lazy(() => import("./features/photo/PhotoCreate"));
const Contact = lazy(() => import("./features/contact/Contact"));
const ContactCreate = lazy(() => import("./features/contact/ContactCreate"));
const ContactDetail = lazy(() => import("./features/contact/ContactDetail"));
const ContactEdit = lazy(() => import("./features/contact/ContactEdit"));
const PhotoDetail = lazy(() => import("./features/photo/PhotoDetail"));
const PhotoEdit = lazy(() => import("./features/photo/PhotoEdit"));

// React == 컴포넌트 개발 라이브러리
function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* main container */}
        <div className="mx-auto">
          <header className="app-bar position-fixed d-flex justify-content-end bg-primary shadow">
            <Profile />
          </header>
          <nav className="drawer-menu position-fixed bg-light shadow-sm">
            <h4 className="ms-2 my-2">MY WORKSPACE</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/todo">Todo</Link>
              </li>
              <li>
                <Link to="/feed">Feed</Link>
              </li>
              <li>
                <Link to="/contactinline">Contact-Inline</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
              <li>
                <Link to="/photos">Photos</Link>
              </li>
            </ul>
          </nav>
          <main className="content-container">
            {/* Suspense 컴포넌트로 로딩중에 보여줄 화면을 처리하는 것 */}
            {/* fallback={로딩중에 보여줄 컴포넌트} */}
            <Suspense
              fallback={
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              }
            >
              <Switch>
                {/* Switch 영역에 컴포넌트가 로딩됨 */}
                {/* 해당 경로에 대해서 로딩할 컴포넌트 목록을 작성 */}
                {/* exact: 속성은 true/false, 경로가 정확히 일치할때만 */}
                <Route path="/" component={Home} exact />
                <Route path="/todo" component={Todo} />
                <Route path="/feed" component={Feed} />
                <Route path="/contactinline" component={ContactInline} />
                <Route path="/contacts" component={Contact} exact />
                <Route path="/contacts/create" component={ContactCreate} />
                <Route path="/contacts/detail/:id" component={ContactDetail} />
                <Route path="/contacts/edit/:id" component={ContactEdit} />{" "}
                <Route path="/photos" component={Photo} exact />
                <Route path="/photos/create" component={PhotoCreate} />
                {/* id라는 매개변수를 url 경로에 넘김, path parameter */}
                <Route path="/photos/detail/:id" component={PhotoDetail} />
                <Route path="/photos/edit/:id" component={PhotoEdit} />
              </Switch>
            </Suspense>
            <Progress />
            <AlertStack />
          </main>
        </div>
      </Router>
    </Provider>
  );
}

// App.tsx 모듈의 기본 내보내기를 App 함수로 함
export default App;
