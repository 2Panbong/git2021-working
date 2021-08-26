import { useRef, useState } from "react";
import { FeedState } from "./type";

interface ModalProp {
  item: FeedState;
  onClose: () => void; // 콜백함수
  onSave: (editItem: FeedState) => void; // 콜백함수
}

const FeedEditModal = ({ item, onClose, onSave }: ModalProp) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fiRef = useRef<HTMLInputElement>(null);
  const [types, setTypes] = useState("");
  const [Wkwmd, setWkwmd] = useState<string | undefined>(item.url);

  const inputText = inputRef.current?.value;
  const modalEdit = () => {
    console.log("함수켜짐?");
    if (fiRef.current?.files?.length) {
      const files = fiRef.current.files[0];
      const filesType = files.type;
      setTypes(filesType);

      const readers = new FileReader();
      console.log("555");

      // 로딩이 끝났을때 처리될 함수를 선언
      readers.onload = () => {
        const baseCodes = readers.result?.toString();
        console.log(baseCodes);
        setWkwmd(baseCodes);
        // console.log(Wkwmd);
      };
      // read 하라고 실행 한것
      readers.readAsDataURL(files);
    }
  };
  const save = (Wkwmd: string | undefined) => {
    const toFeed: FeedState = {
      id: item.id,
      text: inputText, // 수정된 입력값
      createTime: item.createTime,
      url: Wkwmd,
      type: types,
    };
    console.log(toFeed.url);
    onSave(toFeed);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => {
        onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h5 className="modal-title">EDIT FEED</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                onClose();
              }}
            ></button>
          </div>

          <div className="modal-body">
            {/* type은 무조건 있으니 if문처럼 사용을 하도록 삼항연산자를 만듬 */}
            {item.type && item.type === "video/mp4" ? (
              <video controls>
                <source src={Wkwmd} type="video/mp4"></source>
              </video>
            ) : (
              <img src={Wkwmd} className="card-img-top" alt="..." />
            )}

            {/* {isChange === false && item.type === "video/mp4" ? (
              // 비디오를 보여줌
              <video controls>
                <source src={Wkwmd} type="video/mp4"></source>
              </video>
            ) : (
              //아니라면 이미지를 보여줌
              <img src={Wkwmd} className="card-img-top" alt="..." />
            )} */}
            {/* {(isChange === true && item.type === "video/mp4") ||
            (isChange === false && item.type === "video/mp4") ? (
              <video controls>
                <source src={Wkwmd} type="video/mp4"></source>
              </video>
            ) : undefined} */}

            {/* {isChange === false ? (
              item.type === "video/mp4" ? (
                <video controls>
                  <source src={Wkwmd} type="video/mp4"></source>
                </video>
              ) : (
                <img src={Wkwmd} className="card-img-top" alt="..." />
              )
            ) : // 입력 버튼을 눌렀을때
            item.type === "video/mp4" ? (
              <video controls>
                <source src={Wkwmd} type="video/mp4"></source>
              </video>
            ) : (
              <img src={Wkwmd} className="card-img-top" alt="..." />
            )} */}
            <textarea
              className="form-control mb-1"
              placeholder="Leave a post here"
              defaultValue={item.text}
              style={{ boxSizing: "border-box", height: "100px" }}
              ref={inputRef}
            />
            <div className="d-flex">
              <input
                type="file"
                className="form-control me-1"
                accept="image/png, image/jpeg, video/mp4"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                ref={fiRef}
              />
              <button
                className="btn btn-primary text-nowrap"
                type="button"
                onClick={() => {
                  modalEdit();
                }}
              >
                입력
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
              }}
            >
              닫기
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                save(Wkwmd);
              }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedEditModal;
