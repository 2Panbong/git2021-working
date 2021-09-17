import photoReducer from "./photoSlice";

// ----- saga action을 생성하는 부분

import { createAction } from "@reduxjs/toolkit";
import { PhotoItem } from "./photoSlice";

// photo를 추가하도록 요청하는 action
// {type:String, payload:PhotoItem}
// {type: "photo/requestAddPhoto", payload: {title, photoUrl...}}

// photo를 추가하도록 요청하는 action creator를 생성
// createAction<Payload타입>(Action.type)

// cons item : PhotoItem = {title, photoUrl}
// const sagaAction = requestAddPhoto(item);
// sagaAction > {type: "photo/requestAddPhoto", payload: {title, photoUrl...}}

export const requestAddPhoto = createAction<PhotoItem>(
  `${photoReducer.name}/requestAddPhoto`
);

// photo redux state 처리와 관련된 saga action들을 감지(take)할 saga를 생성
// saga는 다 generator라고 생각하면됨

export default function* photoSaga() {}
