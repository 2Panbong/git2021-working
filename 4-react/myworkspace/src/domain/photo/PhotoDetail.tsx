import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { removePhoto } from "./PhotoSlice";

const PhotoDetail = () => {
  // use Param<타입>, 매개변수들을 객체화할 형식을 제너릭으로 넣어줌
  // Generic: <타입>: 타입을 매개변수로 넣음
  // 타입에 따라서 처리를 다르게 하기 위함
  // 객체지향 다형성(poly mophisim) : 같은 이름의 함수가 내부적으로 처리를 다르게 해줌
  const { id } = useParams<{ id: string }>();

  // 타입 단언을 하지 않으면 추론에 의해서 PhotoItme | undefined 타입이 됨
  // 타입 단언을 하면 변환 형식을 정의할 수 있음
  const photoItem = useSelector((state: RootState) =>
    state.photo.data.find((item) => item.id === +id)
  ); //  반환형식을 타입 추론으로 처리
  // ) as PhotoItem; // 타입 단언(type assertion)
  console.log(photoItem);

  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const handDeleteClick = () => {
    dispatch(removePhoto(+id)); // id값만 넣어서 삭제
    history.push("/photos"); // 목록화면으로 이동
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Photo Detail</h2>
      {!photoItem && <div className="text-center my-5">데이터가 없습니다.</div>}
      {photoItem && <table></table>}
      <div>{id}</div>
    </div>
  );
};

export default PhotoDetail;
