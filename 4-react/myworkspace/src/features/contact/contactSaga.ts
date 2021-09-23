import contactReducer, { addContact, initialContact } from "./ContactSlice";
import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ContactItem } from "./ContactSlice";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import api, { ContactItemRequest, ContactItemResponse } from "./contactApi";

/* saga action 생성 */

// contact creator를 생성해줌
export const requestAddContact = createAction<ContactItem>(
  `${contactReducer.name}/requestAddContact`
);

// contact를 가져오는 action
export const requestFetchContacts = createAction(
  `${contactReducer.name}/requestFetchContacts`
);

/* ========saga action을 처리하는 부분======== */

// 서버에 POST로 데이터를 보내 추가하고, redux state를 변경
function* addData(action: PayloadAction<ContactItem>) {
  yield console.log("--addData--");

  // playload로 넘어온 객체
  const contactItemPayload = action.payload;

  // rest api로 보낼 요청객체
  const contactItemRequest: ContactItemRequest = {
    name: contactItemPayload.name,
    number: contactItemPayload.number,
    email: contactItemPayload.email,
    memo: contactItemPayload.memo,
  };

  // rest api에 ost로 데이터를 보낼꺼임
  const result: AxiosResponse<ContactItemResponse> = yield call(
    api.add, // 서버와 통신할 promise 함수
    contactItemRequest // 해당함수의 매개
  );

  // ------2. redux state를 변경
  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성합니다
  const contactItem: ContactItem = {
    id: result.data.id,
    name: result.data.name,
    email: result.data.email,
    number: result.data.number,
    memo: result.data.memo,
    createdTime: new Date(result.data.createdTime).toLocaleTimeString(),
  };

  // dispatcher(액션과 동일함)
  // useDispatch는 컴포넌트에서만 할수있음
  yield put(addContact(contactItem));
}

// 서버에서 GET으로 데이터를 가져오고, redux state를 초기화
function* fetchData() {
  yield console.log("fetch");

  // 백엔드에서 데이터 받기
  const result: AxiosResponse<ContactItemResponse[]> = yield call(api.fetch);

  // 응답데이터배열을 액션페이로드배열로 변환
  // PhotoItemReponse[] => PhotoItem[]

  const contacts = result.data.map(
    (item) =>
      ({
        id: item.id,
        name: item.name,
        number: item.number,
        email: item.email,
        memo: item.memo,
        createdTime: new Date(item.createdTime).toLocaleTimeString(),
      } as ContactItem)
  );
  // state 초기화 reducer 실행
  yield put(initialContact(contacts));
}

/* saga action을 take 하는 부분, generator함수를 생성해줌 */
export default function* contactSaga() {
  // 동일한 타입의 액션들을 모두 처리해줌
  yield takeEvery(requestAddContact, addData);

  yield takeLatest(requestFetchContacts, fetchData);
}
