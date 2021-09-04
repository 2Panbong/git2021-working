import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  name: string | undefined;
  number: number | string | undefined;
  email: string | undefined;
  createdTime: number | string;
  memo?: string;
}

// 백엔드 연동 고려 아직 isFetched가 뭔지모름
interface ContactState {
  data: ContactItem[]; // 컨텍트 아이템 배열로 만듬
  isFetched: boolean; // 서버에서 데이터 받아온지에 대한 정보
}

// 기본값
const initialState: ContactState = {
  data: [
    {
      id: 3,
      name: "김나라",
      number: 123,
      email: "flamex@naver.com",
      memo: "김박사님 어디 계십니까?",
      createdTime: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      name: "김나박이라",
      number: 123,
      email: "flamex@naver.com",
      memo: "김박사는 김을 사러 갔다",
      createdTime: new Date().toLocaleTimeString(),
    },
    {
      id: 1,
      name: "김밥천국",
      number: 123,
      email: "flamex@naver.com",
      memo: "김박사보단 이박사가 최고지",
      createdTime: new Date().toLocaleTimeString(),
    },
  ],
  isFetched: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      state.data.unshift(contact);
    },
    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
    },
    modifyContact: (state, action: PayloadAction<ContactItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const contactItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (contactItem) {
        contactItem.name = modifyItem.name;
        contactItem.number = modifyItem.number;
        contactItem.email = modifyItem.email;
        contactItem.memo = modifyItem.memo;
        contactItem.createdTime = modifyItem.createdTime;
      }
    },
  },
});

export const { addContact, removeContact, modifyContact } =
  contactSlice.actions;

export default contactSlice.reducer;
