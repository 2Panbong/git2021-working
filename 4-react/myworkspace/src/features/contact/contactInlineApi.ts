import axios from "axios";

// 서버로부터 받아오는 데이터 1건에 대한 타입구조
export interface ContactItemResponse {
  id: number;
  name: string;
  number: string;
  email: string;
}

export interface ContactItemRequest {
  name: string;
  number: string;
  email: string;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const contactApi = {
  fetch: () =>
    // axios.get<응답데이터의타입>(응답URL);
    // GET 응답 URL HTTP/1.1
    axios.get<ContactItemResponse[]>(
      `${process.env.REACT_APP_API_BASE}/contactInline`
    ),

  // 추가할때는 post이고 요청url과 요청객체를 해줘야함
  add: (contactItem: ContactItemRequest) =>
    axios.post<ContactItemResponse>(
      `${process.env.REACT_APP_API_BASE}/contactInline`,
      contactItem
    ),
  // axios.delete<응답타입>(요청URL);
  // DELETE 요청 HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(
      `${process.env.REACT_APP_API_BASE}/contactInline/${id}`
    ),
  // axios.put<응답타입>(요청URL, 요청객체(JOSN바디));
  // PUT 요청 URL HTTP/1.1 {...}
  modify: (id: number, contactItem: ContactItemRequest) =>
    axios.put<ContactItemResponse>(
      `${process.env.REACT_APP_API_BASE}/contactInline/${id}`,
      contactItem
    ),
};

export default contactApi;
