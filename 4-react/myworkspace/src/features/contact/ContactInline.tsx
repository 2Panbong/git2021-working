import { useEffect, useRef, useState } from "react";
import Alert from "../../components/Alert";

import { produce } from "immer";
import api from "./contactApi";

// state 1건에 대한 타입
interface ContactItemState {
  id: number;
  name: string | undefined;
  number: number | string | undefined;
  email: string | undefined;
  isEdit?: boolean; // 수정모드 불리언값으로 여부확인하기 옵셔널체이닝
}

// // 서버로부터 받아오는 데이터 1건에 대한 타입구조
// interface ContactItemReponse {
//   id: number;
//   name: string;
//   number: string;
//   email: string;
// }

const Contactt = () => {
  const [toContact, setContact] = useState<ContactItemState[]>([]);
  // 데이터 로딩처리 여부표시하기
  const [isLoading, setLoading] = useState<boolean>(true);

  // // 빈 값 여부 state 기본값으로 false를 넣어놓았다.
  // const [isError, setIsError] = useState(false);

  // // 에러 여부 state
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const fetchData = async () => {
    const res = await api.fetch();

    // console.log(res);

    // axios에서 응답받은 데이터는 data속성에 들어가있음
    // 서버로 부터 받은 데이터를 state 객체로 변경함
    const contacts = res.data.map((item) => ({
      id: item.id,
      name: item.name,
      number: item.number,
      email: item.email,
    })) as ContactItemState[];

    setLoading(false); // 로딩중 여부 state업데이트
    setContact(contacts); // todo state 업데이트

    console.log("--2. await axios.get completed--");
  };

  useEffect(() => {
    console.log("1번");

    fetchData();
  }, []);

  const add = async () => {
    // if (!nameRef.current?.value) {
    //   setErrMessage("메모를 입력해주세요.");
    //   setIsError(true);
    //   return;
    // }

    if (
      !nameRef.current?.value ||
      !numberRef.current?.value ||
      !emailRef.current?.value
    ) {
      setErrMessage("메모를 입력해주세요.");
      setIsError(true);
      return;
    }
    try {
      const result = await api.add({
        name: nameRef.current.value,
        number: numberRef.current?.value,
        email: emailRef.current?.value,
      });
      // const result = await api.add({ name: "" });
      // 강제로 오류 발생 시켜봄
      console.log(result);
      // ---------------------state변경부분---------------
      const toCon: ContactItemState = {
        id: result.data.id,
        name: result.data.name,
        number: result.data.number,
        email: result.data.email,
      };

      // const toCon: ContactItemState = {
      //   id: toContact.length > 0 ? toContact[0].id + 1 : 1,
      //   name: nameRef.current?.value,
      //   number: numberRef.current?.value,
      //   email: emailRef.current?.value,
      // };

      setContact(
        produce((state) => {
          state.unshift(toCon);
        })
      );

      // 입력값 초기화
      formRef.current?.reset();
      setIsError(false);
    } catch (e: any) {
      // for (let prop in e) {
      // console.log(prop);
      // }
      console.log(e.response);
      formRef.current?.reset();
      // 에러 메시지를 표시
      // const message = (e as Error).message;
      // setIsError(true);
      // setErrMessage(message);
    }
  };

  const del = async (id: number, index: number) => {
    console.log(id);
    // immer 개편하네... 뭐지..

    const result = await api.remove(id);
    console.log(result.status);

    // immer로 state 배열 직접 조작(index로 삭제)
    setContact(
      produce((state) => {
        state.splice(index, 1);
      })
    );
  };

  const edit = (id: number, mod: boolean) => {
    setContact(
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

  const save = async (id: number, index: number) => {
    console.log(tbodyRef.current);

    //  tbody밑에있는 입력박스중에서 index번째 입력박스만 선택함
    // const firstInput = tbodyRef.current?.querySelectorAll("input")[index];

    // tbody의 tr을 index로 하여금 선택
    const tr = tbodyRef.current?.querySelectorAll("tr")[index];

    // tbody안의 tr안의 input들을 선택함!
    const inputt = tr?.querySelectorAll("input");

    //https://developer.mozilla.org/ko/docs/Web/API/NodeList 모질라 사이트 참고 구글링

    let tbody_array = Array.prototype.slice.call(inputt);
    console.log(tbody_array);

    //-- 백엔드------------
    if (!inputt) return; // undefined이면 반환
    // 배열처리를 어떻게 해야하지
    const result = await api.modify(id, {
      // id값은 백엔드쪽에서 지정할거므로 item1번부터 값을 가져오게함 0번은 id임
      // 만든건 id도 수정누르게 인풋이 되게 해놨지만 다시 수정하고 저장시에는 안되게끔해놓음
      name: inputt?.item(1).value,
      number: inputt?.item(2).value,
      email: inputt?.item(3).value,
    });

    //-----------state 변경 부분---------
    setContact(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          // id값도 변경시킬수 있게 해봄
          // item.id = tbody_array[0].value;
          item.name = result.data.name;
          item.number = result.data.number;
          item.email = result.data.email;
          item.isEdit = false; // 화면에 수정모드/뷰모드 제어
        }
      })
    );
    // setContact(
    //   produce((state) => {
    //     const item = state.find((item) => item.id === id);
    //     if (item) {
    //       // id값도 변경시킬수 있게 해봄
    //       item.id = tbody_array[0].value;
    //       item.name = tbody_array[1].value;
    //       item.number = tbody_array[2].value;
    //       item.email = tbody_array[3].value;
    //       item.isEdit = false;
    //     }
    //   })
    // );
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h1 className="text-center my-5">Contact-Inline</h1>
      <form className="d-flex" ref={formRef}>
        <input
          type="text"
          placeholder="이름"
          className="form-control me-2"
          ref={nameRef}
        />
        <input
          type="text"
          placeholder="전화번호"
          className="form-control me-2"
          ref={numberRef}
        />
        <input
          type="text"
          placeholder="이메일"
          className="form-control me-2"
          ref={emailRef}
        />
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={() => {
            add();
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
      {/* 로딩중 처리 표시 */}
      {isLoading && (
        <li className="list-group-item text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </li>
      )}
      {!isLoading && toContact.length === 0 && <span>데이터가 없습니다</span>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "6%" }}>이름</th>
            <th style={{ width: "11%" }}>전화번호</th>
            <th style={{ width: "9.5%" }}>이메일</th>
            <th style={{ width: "2%" }}>작업</th>
            <th style={{ width: "2%" }}>작업</th>
          </tr>
        </thead>
        <tbody ref={tbodyRef}>
          {toContact.map((item, index) => (
            <tr key={item.id}>
              {/*보기모드 */}
              {!item.isEdit && <td style={{ width: "5%" }}>{item.id}</td>}
              {!item.isEdit && <td style={{ width: "6%" }}>{item.name}</td>}
              {!item.isEdit && <td style={{ width: "11%" }}>{item.number}</td>}
              {!item.isEdit && <td style={{ width: "9.5%" }}>{item.email}</td>}
              {!item.isEdit && (
                <td style={{ width: "2%" }}>
                  {" "}
                  <button
                    className="btn btn-outline-secondary btn-sm  me-1 text-nowrap"
                    onClick={() => {
                      edit(item.id, true);
                    }}
                  >
                    수정
                  </button>{" "}
                </td>
              )}
              {!item.isEdit && (
                <td style={{ width: "2%" }}>
                  {" "}
                  <button
                    className="btn btn-outline-secondary btn-sm  text-nowrap"
                    onClick={() => {
                      del(item.id, index);
                    }}
                  >
                    삭제
                  </button>{" "}
                </td>
              )}

              {/* 수정모드 */}
              {item.isEdit && (
                <td style={{ width: "5%" }}>
                  {" "}
                  <input type="text" className="w-100" defaultValue={item.id} />
                </td>
              )}
              {item.isEdit && (
                <td style={{ width: "6%" }}>
                  {" "}
                  <input
                    type="text"
                    className="w-100"
                    defaultValue={item.name}
                  />
                </td>
              )}
              {item.isEdit && (
                <td style={{ width: "11%" }}>
                  {" "}
                  <input
                    type="text"
                    className="w-100"
                    defaultValue={item.number}
                  />
                </td>
              )}
              {item.isEdit && (
                <td style={{ width: "9.5%" }}>
                  {" "}
                  <input
                    type="text"
                    className="w-100"
                    defaultValue={item.email}
                  />
                </td>
              )}
              {item.isEdit && (
                <td style={{ width: "2%" }}>
                  <button
                    className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                    onClick={() => {
                      save(item.id, index);
                    }}
                  >
                    저장
                  </button>
                </td>
              )}
              {item.isEdit && (
                <td style={{ width: "2%" }}>
                  <button
                    className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                    onClick={() => {
                      edit(item.id, false);
                    }}
                  >
                    취소
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>

        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default Contactt;
