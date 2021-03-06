import { useEffect, useRef, useState } from "react";
import Alert from "../../components/alert/Alert";

import produce from "immer";

import api from "./todoApi";

// state 1건에 대한 타입
interface TodoItemState {
  id: number;
  memo: string | undefined;
  createdTime: number;
  modifyTime?: number;
  isEdit?: boolean; // 수정모드인지 여부
}

const getTimeString = (unixtime: number) => {
  // Locale: timezone, currency 등
  // js에서는 브라우저의 정보를 이용함
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Todo = () => {
  // todo 여러건에 대한 state
  // 참고) new Date().getTime() -> unix time 생성됨
  // 가짜스테이트는 지워넣음
  const [todoList, setTodoList] = useState<TodoItemState[]>([]);
  // 데이터 로딩처리 여부를 표시
  const [isLoading, setLoading] = useState<boolean>(true);
  // 에러 여부 state
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  // // 데이터 받아오기 완료 여부를 표시
  // const [isFetched, setFetched] = useState<boolean>(false);

  //   { id: 2, memo: "Typescript", createdTime: new Date().getTime() },
  //   { id: 1, memo: "React State 연습", createdTime: new Date().getTime() },
  // ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const fetchData = async () => {
    // 백엔드에서 데이터 받아옴
    const res = await api.fetch();

    // console.log(res);

    // axios에서 응답받은 데이터는 data속성에 들어가있음
    // 서버로 부터 받은 데이터를 state 객체로 변경함
    const todos = res.data.map((item) => ({
      id: item.id,
      memo: item.memo,
      createdTime: item.createdTime,
    })) as TodoItemState[];

    setLoading(false); // 로딩중 여부 state업데이트
    setTodoList(todos); // todo state 업데이트

    console.log("--2. await axios.get completed--");
  };

  useEffect(() => {
    console.log("--1. mounted--");

    // 백엔드에서 데이터를 받아올 것임
    // ES8 style로 async-await 기법을 이용해서 데이터를 조회해옴
    fetchData();
  }, []);

  // await 키워드를 쓰기위해서는 await를 쓰는 함수가 async 메서드로 선언되어야함
  const add = async (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    // 이벤트 객체가 있을 때는 입력박스에서 엔터 입력
    if (e) {
      if (e.code !== "Enter") return;
    }

    // 입력값이 없으면 에러 메시지 표시
    if (!inputRef.current?.value) {
      setErrMessage("메모를 입력해주세요.");
      setIsError(true);
      return;
    }

    // -----------------------백엔드 연동 부분--------------------------------
    // try {
    //   ... 코드 실행 부분
    // } catch(e) {
    //   // 코드 처리중 에러(예외)가 발생하면 실행되는 곳
    //   // e라는 객체는 어떤 에러인지, 에러메시지가 무엇인지를 담고 있음
    // }
    try {
      //       //백엔드에서 응답 데이어를 줄때
      // marshalling : 프로그램객체(메모리)구조에서 -> 데이터전송용구조
      // :   Java Object-> JSON String
      // 과정은 스프링프레임워크에서 자동으로 일어나는거임
      // ^
      // HTTP Response Body
      // v

      // // 프론트엔드에서 응답 데이터를 받을 때
      // un-marshalling: 데이터전송용구조 -> 프로그램 객체구조
      // : JSON String -> Javascript object
      const result = await api.add({ memo: inputRef.current.value });
      // const result = await api.add({ memo: "" }); // 강제로 오류 발생 시켜봄
      console.log(result);

      // ---------------------- state 변경부분 ---------------------------------
      const todo: TodoItemState = {
        id: result.data.id,
        // optional chaning
        memo: result.data.memo,
        createdTime: result.data.createdTime,
      };

      // const todo: TodoItemState = {
      //   id: todoList.length > 0 ? todoList[0].id + 1 : 1,
      //   // optional chaning
      //   memo: inputRef.current?.value,
      //   createdTime: new Date().getTime(),
      // };

      // console.log(todoList);
      // immer 없이 새로운 배열을 생성하여 state 변경
      // setTodoList([todo, ...todoList]);

      // current state -> draft state -> next state
      // draft state를 조작함
      setTodoList(
        // produce(([draftstate변수]) => {draft state 변수 조작})
        // 반환 객체는 변경된 state(next state)
        produce((state) => {
          // draft state 배열에 추가
          // draft state의 타입은 TodoItemState[]
          state.unshift(todo);
        })
      );

      // 입력값 초기화
      formRef.current?.reset();
      // 에러 메시지 제거
      setIsError(false);
    } catch (e: any) {
      // for (let prop in e) {
      // console.log(prop);
      // }
      console.log(e.response);
      // 에러 메시지를 표시
      const message = (e as Error).message;
      setIsError(true);
      setErrMessage(message);
    }

    // // ---------------------- state 변경부분 ---------------------------------
    // const todo: TodoItemState = {
    //   id: result.data.id,
    //   // optional chaning
    //   memo: result.data.memo,
    //   createdTime: result.data.createdTime,
    // };

    // // const todo: TodoItemState = {
    // //   id: todoList.length > 0 ? todoList[0].id + 1 : 1,
    // //   // optional chaning
    // //   memo: inputRef.current?.value,
    // //   createdTime: new Date().getTime(),
    // // };

    // // console.log(todoList);
    // // immer 없이 새로운 배열을 생성하여 state 변경
    // // setTodoList([todo, ...todoList]);

    // // current state -> draft state -> next state
    // // draft state를 조작함
    // setTodoList(
    //   // produce(([draftstate변수]) => {draft state 변수 조작})
    //   // 반환 객체는 변경된 state(next state)
    //   produce((state) => {
    //     // draft state 배열에 추가
    //     // draft state의 타입은 TodoItemState[]
    //     state.unshift(todo);
    //   })
    // );

    // // 입력값 초기화
    // formRef.current?.reset();
    // // 에러 메시지 제거
    // setIsError(false);
  };

  const del = async (id: number, index: number) => {
    console.log(id);

    // 불변성 때문에 splice를 사용할 수 없음
    // 주로 filter 함수를 사용
    // filter 함수로 해당 id를 제외하고 새로운 배열로 리턴함.
    // immer 없이 사용
    // setTodoList(todoList.filter((item) => item.id !== id));

    // immer로 state 배열 직접 조작
    // setTodoList(
    //   produce((state) => {
    //     // id로 해당 item을 찾음
    //     const item = state.find((item) => item.id === id);
    //     if (item) {
    //       // 해당 item의 index로 배열에서 삭제
    //       state.splice(state.indexOf(item), 1);
    //     }
    //   })
    // );

    const result = await api.remove(id);
    console.log(result.status);

    // immer로 state 배열 직접 조작(index로 삭제)
    setTodoList(
      produce((state) => {
        state.splice(index, 1);
      })
    );
  };

  const edit = (id: number, mod: boolean) => {
    // 해당 id에 해당하는 item만 edit 모드로 변경함
    // 해당 item의 속성을 변경한 후 변경된 item을 반환
    // map 함수는 새로운 배열을 반환하는 함수, 배열길이는 기존 배열 길이와 같음
    // immer 없이 사용
    // setTodoList(
    //   todoList.map((item) => {
    //     if (item.id === id) {
    //       item.isEdit = mod;
    //     }
    //     return item;
    //   })
    // );
    // immer를 사용해서 해당 요소를 변경
    setTodoList(
      produce((state) => {
        // 해당 id값에 해당하는 요소를 찾음
        const item = state.find((item) => item.id === id);
        if (item) {
          item.isEdit = mod;
        }
      })
    );
  };

  const save = async (id: number, index: number) => {
    console.log(ulRef.current);

    // ul 밑에 있는 입력박스중에서 index번째 입력박스만 선택
    // 버그: item index와 input index가 일치하지 않음 input박스는 안 열렸을 수도 있기 때문
    // const input = ulRef.current?.querySelectorAll("input")[index];

    // 2021.08.28 버그 수정
    // ul> li[index] 밑에 input 박스를 찾음
    const input = ulRef.current
      ?.querySelectorAll("li")
      [index].querySelector("input");
    // console.log(li);
    console.log(input);

    // ----------------백엔드 연동 부분 ------------------------
    if (!input) return; // input박스가 undefined이면 반환
    const result = await api.modify(id, { memo: input.value });

    // immer 없이 map함수로 새로운 배열을 반환 후 변경
    // setTodoList(
    //   todoList.map((item) => {
    //     // 해당 id의 item의 값을 변경
    //     if (item.id === id) {
    //       item.memo = input?.value;
    //       item.modifyTime = new Date().getTime();
    //       item.isEdit = false;
    //     }

    //     return item;
    //   })
    // );

    // // immer를 사용하여 해당 요소를 직접변경
    // setTodoList(
    //   produce((state) => {
    //     const item = state.find((item) => item.id === id);
    //     if (item) {
    //       item.memo = input?.value;
    //       item.modifyTime = new Date().getTime();
    //       item.isEdit = false;
    //     }
    //   })
    // );

    //------------------- state 변경 부분-------------------------------------
    setTodoList(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          item.memo = result.data.memo;
          item.modifyTime = new Date().getTime(); // 그냥 놔둠
          item.isEdit = false; // 화면에 수정모드/뷰모드제어용
        }
      })
    );
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-5">할 일 관리</h2>
      <form
        style={{ width: "40vw" }}
        className="d-flex mx-auto"
        ref={formRef}
        /* 
          event.preventDefault(); 
          - 기본이벤트 작업을 처리하지 않음 
          - submit form
        */
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="form-control me-2"
          placeholder="할 일 ..."
          ref={inputRef}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={() => {
            add(null);
          }}
        >
          추가
        </button>
      </form>
      {isError && (
        <Alert
          message={errMessage}
          variant={"danger"}
          // 닫기 버튼을 클릭할 때 처리하는 함수를 넘김
          onClose={() => {
            setIsError(false);
          }}
        />
      )}

      <ul id="ul-list" className="list-group list-group-flush mt-3" ref={ulRef}>
        {/* 로딩중 처리 표시 */}
        {isLoading && (
          <li className="text-center list-group-item">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </li>
        )}
        {/* 빈 데이터 표시 */}
        {!isLoading && todoList.length === 0 && (
          <li className="list-group-item">데이터가 없습니다.</li>
        )}
        {/* 데이터와 UI요소 바인딩 */}
        {todoList.map((item, index) => (
          <li className="list-group-item d-flex" key={item.id}>
            <div className="w-100">
              {/* 보기모드일 때 보이는 내용 */}
              {!item.isEdit && <span className="me-1">{item.memo}</span>}
              {!item.isEdit && (
                <span style={{ fontSize: "0.75rem" }}>
                  -{" "}
                  {getTimeString(
                    item.modifyTime ? item.modifyTime : item.createdTime
                  )}
                </span>
              )}
              {/* 수정모드일 때 보이는 입력폼 */}
              {item.isEdit && (
                <input type="text" className="w-100" defaultValue={item.memo} />
              )}
            </div>
            {/* 보기모드일 때 보이는 버튼 */}
            {!item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                onClick={() => {
                  edit(item.id, true);
                }}
              >
                수정
              </button>
            )}
            {!item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm text-nowrap"
                onClick={() => {
                  del(item.id, index);
                }}
              >
                삭제
              </button>
            )}
            {/* 수정모드일 때 보이는 버튼 */}
            {item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                onClick={() => {
                  save(item.id, index);
                }}
              >
                저장
              </button>
            )}
            {item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm text-nowrap"
                onClick={() => {
                  edit(item.id, false);
                }}
              >
                취소
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
