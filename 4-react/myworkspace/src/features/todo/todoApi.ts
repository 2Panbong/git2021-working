import axios from "axios";

// 서버로 부터 받아오는 데이터 1건에 대한 타입
interface TodoItemResponse {
  id: number;
  memo: string;
  createdTime: number;
}

interface TodoItemRequest {
  memo: string;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const todoApi = {
  fetch: () =>
    // axios.get<응답데이터의타입>(응답URL);
    // GET 요청 URL HTTP/1.1
    axios.get<TodoItemResponse[]>(`${process.env.REACT_APP_API_BASE}/todos`),

  // axios.port<응답타입>(요청URL, 요청객체(JOSN바디));
  // POST 요청 URL HTTP/1.1 {...}
  add: (todoItem: TodoItemRequest) =>
    axios.post<TodoItemResponse>(
      `${process.env.REACT_APP_API_BASE}/todos`,
      todoItem
    ),
  // axios.delete<응답타입>(요청URL);
  // DELETE 요청 HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/todos/${id}`),

  // axios.put<응답타입>(요청URL, 요청객체(JOSN바디));
  // PUT 요청 URL HTTP/1.1 {...}
  modify: (id: number, todoItem: TodoItemRequest) =>
    axios.put<TodoItemResponse>(
      `${process.env.REACT_APP_API_BASE}/todos/${id}`,
      todoItem
    ),
};

export default todoApi;
