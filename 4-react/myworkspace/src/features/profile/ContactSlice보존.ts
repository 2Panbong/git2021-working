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
  data: [],
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
    // payload값으로 state를 초기화하는 reducer 필요함
    initialContact: (state, action: PayloadAction<ContactItem[]>) => {
      const contacts = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = contacts;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
  },
});

export const { addContact, removeContact, modifyContact, initialContact } =
  contactSlice.actions;

export default contactSlice.reducer;
