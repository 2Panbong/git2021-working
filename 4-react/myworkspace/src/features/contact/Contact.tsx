import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { requestFetchContacts } from "./contactSaga";

const Contact = () => {
  // contact state 전체 가져오기
  const contact = useSelector((state: RootState) => state.contact);

  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!contact.isFetched) {
      dispatch(requestFetchContacts());
    }
  }, [dispatch, contact.isFetched]);

  // // 빈 값 여부 state 기본값으로 false를 넣어놓았다.
  // const [isError, setIsError] = useState(false);

  // const formRef = useRef<HTMLFormElement>(null);
  // const nameRef = useRef<HTMLInputElement>(null);
  // const numberRef = useRef<HTMLInputElement>(null);
  // const emailRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h1 className="text-center my-5">Contact</h1>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-secondary me-2"
          onClick={() => {
            dispatch(requestFetchContacts());
          }}
        >
          <i className="bi bi-arrow-clockwise"></i>
          새로고침
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            history.push("/contacts/create");
          }}
        >
          <i className="bi bi-plus" />
          추가
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th style={{ width: "5%" }} scope="col">
              #
            </th>
            <th style={{ width: "15%" }} scope="col">
              이름
            </th>
            <th style={{ width: "30%" }} scope="col">
              전화번호
            </th>
            <th style={{ width: "30%" }} scope="col">
              이메일
            </th>
            <th style={{ width: "20%" }} scope="col">
              작업일시
            </th>
          </tr>
        </thead>
        <tbody>
          {contact.data.map((item) => (
            <tr
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push(`/contacts/detail/${item.id}`);
              }}
            >
              <th style={{ width: "5%" }}>{item.id}</th>
              <td style={{ width: "15%" }}>{item.name}</td>
              <td style={{ width: "30%" }}>{item.number}</td>
              <td style={{ width: "30%" }}>{item.email}</td>
              <td style={{ width: "20%" }}>{item.createdTime}</td>
            </tr>
          ))}
        </tbody>

        <tfoot></tfoot>
      </table>
      {/* {toContact.length === 0 && <span>데이터가 없습니다</span>} */}
    </div>
  );
};

export default Contact;
