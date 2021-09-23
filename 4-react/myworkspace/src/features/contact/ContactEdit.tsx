import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { AppDispatch, RootState } from "../../store";
import { modifyContact } from "./ContactSlice";

const ContactEdit = () => {
  const { id } = useParams<{ id: string }>();

  const contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const nameInput = useRef<HTMLInputElement>(null);
  const numberInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const memoInput = useRef<HTMLTextAreaElement>(null);

  const handleSaveClick = () => {
    if (contactItem) {
      const item = { ...contactItem };
      item.name = nameInput.current ? nameInput.current.value : "";
      item.number = numberInput.current ? numberInput.current.value : "";
      item.email = emailInput.current ? emailInput.current.value : "";
      item.memo = memoInput.current ? memoInput.current.value : "";
      item.createdTime = new Date().toLocaleTimeString();
      dispatch(modifyContact(item));
      // if문 안쓰면 안먹음..
      history.push("/contacts");
    }
  };

  return (
    <div>
      (
      <div style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center">Contact Create</h2>
        <form>
          <table className="table">
            <tbody>
              <tr>
                <th>이름</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    ref={nameInput}
                    defaultValue={contactItem?.name}
                  />
                </td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    ref={numberInput}
                    defaultValue={contactItem?.number}
                  />
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    ref={emailInput}
                    defaultValue={contactItem?.email}
                  />
                </td>
              </tr>
              <tr>
                <th>메모</th>
                <td>
                  <textarea
                    className="form-control"
                    style={{ height: "40vh" }}
                    ref={memoInput}
                    defaultValue={contactItem?.memo}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div>
          <button
            className="btn btn-secondary float-start"
            onClick={() => {
              history.push("/contacts");
            }}
          >
            <i className="bi bi-grid-3x3-gap me-1"></i>
            목록
          </button>
          <button
            className="btn btn-primary float-end"
            onClick={() => {
              handleSaveClick();
            }}
          >
            <i className="bi bi-check" />
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactEdit;
