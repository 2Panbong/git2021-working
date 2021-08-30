import { useRef, useState } from "react";
import { produce } from "immer";

import { FeedState } from "./type";
import FeedEditModal from "./FeedEditModal";

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Feed = () => {
  const [feed, setFeed] = useState<FeedState[]>([]);

  const [isEdit, setIsEdit] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const add = () => {
    // const inputText = textRef.current?.value;

    // file가 있어도, 선택을 안하면 length 0

    if (fileRef.current?.files?.length) {
      const file = fileRef.current?.files[0];
      const fileType = file.type;
      const reader = new FileReader();
      const inputText = textRef.current?.value;
      reader.readAsDataURL(file);

      reader.onload = () => {
        const baseCode = reader.result?.toString();

        console.log(baseCode);

        const data: FeedState = {
          id: feed.length > 0 ? feed[0].id + 1 : 1,
          text: inputText,
          url: baseCode,
          createTime: new Date().getTime(),
          type: fileType,
        };

        setFeed([data, ...feed]);
      };
      // 입력값 초기화
      formRef.current?.reset();
    }
  };
  const remove = (id: number) => {
    setFeed(feed.filter((item) => item.id !== id));
  };

  // const del = (id: number) => {

  //   setFeed(feed.filter((item) => item.id !== id));
  // };

  const editItem = useRef<FeedState>({
    id: 0,
    text: "",
    url: "",
    type: "",
    createTime: 0,
  });

  const edit = (item: FeedState) => {
    // 수정할 todo객체
    editItem.current = item;
    // 모달 팝업을 보여주기
    setIsEdit(true);
  };

  const save = (editItem: FeedState) => {
    console.log(editItem);
    setFeed(
      produce((state) => {
        const item = state.find((item) => item.id === editItem.id);
        // const url = state.find((item) => item.url === editItem.url);

        // console.log(url);
        if (item) {
          item.text = editItem.text;
          item.url = editItem.url;
          item.type = editItem.type;
        }
      })
    );

    // 모달창 닫기
    setIsEdit(false);
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h1 className="text-center my-5">Feed</h1>
      <form className="mt-5" ref={formRef} onSubmit={(e) => e.preventDefault()}>
        {/* isEdit state가 true일 때만 Modal 창이 보임 */}

        <textarea
          className="form-control mb-1"
          placeholder="Leave a post here"
          ref={textRef}
          style={{ boxSizing: "border-box", height: "100px" }}
        ></textarea>
        <div className="d-flex">
          <input
            type="file"
            className="form-control me-1"
            accept="image/png, image/jpeg, video/mp4"
            aria-describedby="inputGroupFileAddon04"
            aria-label="Upload"
            ref={fileRef}
          />
          <button
            className="btn btn-primary text-nowrap"
            type="button"
            onClick={() => {
              add();
            }}
          >
            입력
          </button>
        </div>
      </form>

      {feed.length === 0 && <span>데이터가 없음</span>}

      {isEdit && (
        <FeedEditModal
          item={editItem.current}
          onClose={() => {
            setIsEdit(false);
          }}
          onSave={(editItem) => {
            save(editItem);
          }}
        />
      )}
      {feed.map((item) =>
        item.type === "video/mp4" ? (
          <div key={item.id} className="card">
            <div className="card-header">
              Feed 작성한 profile이미지, 사용자명
            </div>
            <video controls>
              <source src={item.url} type="video/mp4"></source>
            </video>
            <p className="card-text">{item.text}</p>
            <div className="card-body d-flex">
              <span className="w-100">
                {getTimeString(
                  item.modifyTime ? item.modifyTime : item.createTime
                )}
              </span>
              <a
                onClick={() => {
                  edit(item);
                }}
                href="#!"
                className="link-secondary fs-6 float-end text-nowrap me-2"
              >
                수정
              </a>
              <a
                onClick={() => {
                  remove(item.id);
                }}
                href="#!"
                className="link-secondary fs-6 float-end text-nowrap"
              >
                삭제
              </a>
            </div>
          </div>
        ) : (
          <div key={item.id} className="card">
            <div className="card-header">
              Feed 작성한 profile이미지, 사용자명
            </div>
            <img src={item.url} className="card-img-top" alt="…" />
            <p className="card-text">{item.text}</p>
            <div className="card-body d-flex">
              <span className="w-100">
                {getTimeString(
                  item.modifyTime ? item.modifyTime : item.createTime
                )}
              </span>
              <a
                onClick={() => {
                  edit(item);
                }}
                href="#!"
                className="link-secondary fs-6 float-end text-nowrap me-2"
              >
                수정
              </a>
              <a
                onClick={() => {
                  remove(item.id);
                }}
                href="#!"
                className="link-secondary fs-6 float-end text-nowrap"
              >
                삭제
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Feed;
