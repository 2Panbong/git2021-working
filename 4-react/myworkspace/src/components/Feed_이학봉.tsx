import { useRef, useState } from "react";

import SadCat from "./SadCat";

interface FeedState {
  id: number;
  text: string | undefined;
  url: string | undefined;
  createTime: number;
  modifyTime?: number;
  type: string;
}

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Feed = () => {
  const [feed, setFeed] = useState<FeedState[]>([
    {
      id: 1,
      text: " 난 이제 지쳤어요 땡벌 땡벌 과제하다 지쳤어요 땡벌 땡벌",
      url: SadCat,
      createTime: new Date().getTime(),
      type: "image/png",
    },
  ]);

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

  return (
    <>
      <form
        id="form-input"
        className="mt-5"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <textarea
          className="form-control mb-1"
          placeholder="Leave a post here"
          ref={textRef}
          style={{ boxSizing: "border-box" }}
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

      {feed.map((item) =>
        item.type === "video/mp4" ? (
          <div key={item.id} className="card">
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
    </>
  );
};

export default Feed;
