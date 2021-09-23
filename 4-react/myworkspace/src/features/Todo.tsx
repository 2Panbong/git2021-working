import { useRef, useState } from "react";
import Alert from "../components/alert/Alert";

import { produce } from "immer";

// 1건에 대한 타입
interface TodoState {
  id: number;
  memo: string | undefined;
  createTime: number;
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
  const [todoList, setTodoList] = useState<TodoState[]>([
    { id: 2, memo: "Typescript", createTime: new Date().getTime() },
    { id: 1, memo: "React State 연습", createTime: new Date().getTime() },
  ]);

  // 빈 값 여부 state
  const [isError, setIsError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  // event를 매개변수로 받아옴 근데 그 해당 event를 어떤 타입으로만 하게 할거냐
  //event가 키보드이벤트가 발생하는 타입인데 그 이벤트의 타입은 HTMl INpElment다

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    // 이벤트 객체가 있을 때는 입력박스에서 엔터 입력
    if (e) {
      if (e.code !== "Enter") return;
    }

    // 입력값이 없으면 에러 메시지 표시
    if (!inputRef.current?.value) {
      setIsError(true);
      return;
    }

    const todo: TodoState = {
      id: todoList.length > 0 ? todoList[0].id + 1 : 1,
      // optional chaning
      memo: inputRef.current?.value,
      createTime: new Date().getTime(),
    };

    // immer 없이 새로운 배열을 생성하여 state 변경
    // setTodoList([todo, ...todoList]);
    // console.log(todoList);

    // current state(현재) -> draf state(곧 변경될 초안) -> next state
    // draft state를 조작함
    setTodoList(
      // produce(([draftstate변수)]=> {draft state 변수 조작})
      // 반환 객체는 변경된 state(next state)
      produce((state) => {
        // draft state 배열에 추가
        // draft state의 타입은 TodoState[]
        state.unshift(todo);
        // console.log("--draft state--");
        // console.log(state);
        // console 찍어보면 draft하고 사라지는구조인듯?
      })
    );

    // 입력값 초기화
    formRef.current?.reset();
    // 에러 메시지 제거
    setIsError(false);
  };

  const del = (id: number, index: number) => {
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

    // imemr로 state 배열 직접 조작(index로 삭제)
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

    // [{},{isEdit: true/false}]
    // React 관점에서는 map함수로 새로운 배열
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
        console.log(id, mod);
        // 해당 id값에 해당하는 요소를 찾음
        const item = state.find((item) => item.id === id);
        if (item) {
          item.isEdit = mod;
        }
      })
    );
  };

  const save = (id: number, index: number) => {
    console.log(ulRef.current);

    // ul 밑에 있는 입력박스중에서 index번째 입력박스만 선택
    const input = ulRef.current?.querySelectorAll("input")[index];

    // immer 없이 map 함수로 새로운 배열을 반환 후 변경
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

    // immer를 사용하여 해당 요소를 직접 변경
    setTodoList(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          item.memo = input?.value;
          item.modifyTime = new Date().getTime();
          item.isEdit = false;
        }
      })
    );
  };

  return (
    <>
      <h2 className="text-center my-5">할 일 관리</h2>
      <form
        className="d-flex"
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
          message={"내용을 입력해주세요."}
          variant={"danger"}
          // 닫기 버튼을 클릭할 때 처리하는 함수를 넘김
          onClose={() => {
            setIsError(false);
          }}
        />
      )}
      <ul id="ul-list" className="list-group list-group-flush mt-3" ref={ulRef}>
        {todoList.length === 0 && (
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
                    item.modifyTime ? item.modifyTime : item.createTime
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
    </>
  );
};

export default Todo;
