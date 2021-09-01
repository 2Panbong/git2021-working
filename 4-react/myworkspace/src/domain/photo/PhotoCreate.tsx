import { useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";
import { PhotoItem } from "./photoSlice";

const PhotoCreate = () => {
  const history = useHistory();
  const photoData = useSelector((state: RootState) => state.photo.data);

  const title = useRef<HTMLInputElement>(null);
  const desc = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null);

  const add = () => {
    const item: PhotoItem = {
      id: photoData.length > 0 ? photoData[0].id + 1 : 1,
    };
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Photos Create</h2>
      <form>
        <table className="table">
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                {" "}
                <input className="form-control" type="text" ref={title} />
              </td>
            </tr>
            <tr>
              <th>설명</th>
              <td>
                {" "}
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  ref={desc}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>이미지</th>
              <td>
                {" "}
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  ref={file}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary me-1"
          onClick={() => {
            history.push("/photos");
          }}
        >
          <i className="bi bi-grid-3x3-gap me-1"></i>
          목록
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            add();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>
      </div>
    </div>
  );
};

export default PhotoCreate;
