import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { penguin } from "../../common/data";

export interface PhotoItem {
  id: number;
  profileUrl: string;
  username: string;
  title: string;
  description?: string;
  photoUrl: string;
}

interface PhotoState {
  data: PhotoItem[]; // 포토 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아온지에 대한 정보
}

const initialState: PhotoState = {
  data: [
    {
      id: 5,
      profileUrl: penguin,
      username: "Hack Bong Lee",
      title: "펭귄이",
      description: "세 마리 펭귄들의 대화",
      photoUrl: penguin,
    },
    {
      id: 4,
      profileUrl: penguin,
      username: "Hack Bong Lee",
      title: "펭귄이",
      description: "세 마리 펭귄들의 대화",
      photoUrl: penguin,
    },
    {
      id: 3,
      profileUrl: penguin,
      username: "Hack Bong Lee",
      title: "펭귄이",
      description: "세 마리 펭귄들의 대화",
      photoUrl: penguin,
    },
    {
      id: 2,
      profileUrl: penguin,
      username: "Hack Bong Lee",
      title: "펭귄이",
      description: "세 마리 펭귄들의 대화",
      photoUrl: penguin,
    },
    {
      id: 1,
      profileUrl: penguin,
      username: "Hack Bong Lee",
      title: "펭귄이",
      description: "세 마리 펭귄들의 대화",
      photoUrl: penguin,
    },
  ],
  isFetched: false,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    addPhoto: (state, action: PayloadAction<PhotoItem>) => {
      const photo = action.payload;
      state.data.unshift(photo);
    },
  },
});

export const { addPhoto } = photoSlice.actions;

export default photoSlice.reducer;
