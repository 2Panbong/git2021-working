// Generator

// 숫자 값을 랜덤 - 50~50범위로 생성하고 
// 배열 state에 추가
// 숫자 목록을 ul > li로 출력

// 기존 javascript
// DOM요소를 직접적으로 조작

// React
// Virtual DOM 요소와 관련된 
// state 또는 prop를 조작

const Generator = () => {
  // useState<타입>
  // state의 타입을 지정해줄 수 있음
  const [numbers, setNumber] = useState<number[]>([]);
}

const generate = () => {
  const num =Math.trunc(Math.random()*100-50)
  
  // primitive type(원시타입) : number,string,boolean
  // 값이 바뀌어야만 다시 렌더링함

  // reference type(참조타입):object,array
  // 참조가 바뀌어야만 다시 렌더링함 
  // object -> 새로운 객체를 생성하고 state변경함수를 실행함
  // array -> 새로운 배ㅕㅇㄹ을 생성하고 state변경함수를 실행함

  // numbers 배열 참조가 같으므로 변경이 일어나지 않음
  // numbers.push(num)
  // setNumber(numbers);

  // [0,1,2,3]

  // []: 새로운 배열 생성
  // []

  // [...numbers] : 기존 배열 복사,... 나열 연산
  // [0,1,2,3]

  // [num, ... numbers]
  // [-17,0,1,2,3]

  // : 새로운 배열에 첫번째 요소로 num값, 나머지는 기존 배열
  setNumber([num,...numbers]);

  
  // : 새로운 배열에 마지막 요소로 num값, 나머지는 기존 배열
  // setNumber([...numbers,num]);
}


  return (<div>
    <h2>Generator</h2>
    <button 
    onClick={()=>{
      generate();
    }}>GEMERATE</button>
    <div>{numbers}</div>
    <ul>{}</ul>
  </div>);
);


