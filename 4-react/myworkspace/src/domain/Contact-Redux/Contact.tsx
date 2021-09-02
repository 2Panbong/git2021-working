import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Contact = () => {
  // contact state 전체 가져오기
  const contact = useSelector((state: RootState) => state.contact);

  const history = useHistory();

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
          className="btn btn-primary"
          onClick={() => {
            history.push("/contact/create");
          }}
        >
          <i className="bi bi-plus" />
          추가
        </button>
      </div>
      <form className="d-flex"></form>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>작업일시</th>
          </tr>
        </thead>
        <tbody>
          {contact.data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.number}</td>
              <td>{item.email}</td>
              <td>{item.createdTime}</td>
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
