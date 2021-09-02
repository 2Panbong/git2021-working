import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  name: string | undefined;
  number: number | string | undefined;
  email: string | undefined;
  createdTime: number | string;
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
      createdTime: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      name: "김나박이라",
      number: 123,
      email: "flamex@naver.com",
      createdTime: new Date().toLocaleTimeString(),
    },
    {
      id: 1,
      name: "김밥천국",
      number: 123,
      email: "flamex@naver.com",
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
  },
});

export const { addContact } = contactSlice.actions;

export default contactSlice.reducer;
