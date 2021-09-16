// 프론트엔드 state: UI 처리 바뀌게 하는 변수
// -> 모달팝업상태(보이고, 안보이고), 연락처 목록상태(10개보이고, 5개보이고, 수정모드)

// 백엔드 : state : 비즈니스 로직 처리가 바뀌게 하는 데이터
// -> 주문상태(주문요청, 결제, 결제확인, 배송중, 배송완료)
// -> 승인상태(제출, 검토중, 반려, 승인)

import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice";
import photoReducer from "../features/photo/photoSlice";
import contactReducer from "../features/contact/ContactSlice";

// import { enableMapSet } from "immer";
// // immer 객체에 Map을 사용하기
// enableMapSet();

// global state(전역 상태) 저장소 만듬
// global state : profile, todo, contact ... 여러가 state가 있음
// ** 이러한 state들은 다른 컴포넌트와 state가 공유 됨
export const store = configureStore({
  // 각 state별로 처리할 reducer 목록
  reducer: {
    // state 이름: reducser 이름
    // profile state 처리하는 reducer를 등록
    profile: profileReducer,
    // photo state 처리하는 reducer를 등록
    photo: photoReducer,
    // contact state 처리하는 reducere를 등록
    contact: contactReducer,
  },
  devTools: true, // 개발툴 사용여부
});

// typescript에서는 몇가지 타입 선언을 해야함

// root state 타입 정의
// 가장 최상위 state
// state.profile, state.contact....
export type RootState = ReturnType<typeof store.getState>;

// dispatch 타입 정의
// dispatch 함수의 generic type
export type AppDispatch = typeof store.dispatch;
