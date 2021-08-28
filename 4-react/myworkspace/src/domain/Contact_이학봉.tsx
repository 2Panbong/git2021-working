import { useRef, useState } from "react";

import { produce } from "immer";

interface ContactState {
  id: number;
  name: string | undefined;
  number: number | string | undefined;
  eamil: string | undefined;
  isEdit?: boolean; // 수정모드 불리언값으로 여부확인하기 옵셔널체이닝
}

const Contactt = () => {
  const [toContact, setContact] = useState<ContactState[]>([]);

  // // 빈 값 여부 state 기본값으로 false를 넣어놓았다.
  // const [isError, setIsError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const add = () => {
    const toCon: ContactState = {
      id: toContact.length > 0 ? toContact[0].id + 1 : 1,
      name: nameRef.current?.value,
      number: numberRef.current?.value,
      eamil: emailRef.current?.value,
    };

    setContact(
      produce((state) => {
        state.unshift(toCon);
      })
    );

    // 입력값 초기화
    formRef.current?.reset();
  };

  const del = (id: number, index: number) => {
    console.log(id);
    // immer 개편하네... 뭐지..
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

  const save = (id: number, index: number) => {
    //  tbody밑에있는 입력박스중에서 index번째 입력박스만 선택함
    // const firstInput = tbodyRef.current?.querySelectorAll("input")[index];

    // tbody의 tr을 index로 하여금 선택
    const tr = tbodyRef.current?.querySelectorAll("tr")[index];

    // tbody안의 tr안의 input들을 선택함!
    const inputt = tr?.querySelectorAll("input");

    //https://developer.mozilla.org/ko/docs/Web/API/NodeList 모질라 사이트 참고 구글링

    let tbody_array = Array.prototype.slice.call(inputt);

    setContact(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          // id값도 변경시킬수 있게 해봄
          item.id = tbody_array[0].value;
          item.name = tbody_array[1].value;
          item.number = tbody_array[2].value;
          item.eamil = tbody_array[3].value;
          item.isEdit = false;
        }
      })
    );
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h1 className="text-center my-5">연락처 관리</h1>
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
      {toContact.length === 0 && <span>데이터가 없습니다</span>}
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
              {!item.isEdit && <td style={{ width: "9.5%" }}>{item.eamil}</td>}
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
                    defaultValue={item.eamil}
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
