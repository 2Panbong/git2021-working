
import Header from './Header';
import Button from '.'


const Components = () => {
  return <div>
      {/* 속성값을 변경하여 재사용하는 컴포넌트 */}
      {/* Component의 속성(prop)을 넘김 */}
      {/* 속성명 = {속성값} */}
      <Header color={"red"} title={"React"} />
      <Header color={"green"} title={"Typescript"} />
      <Header color={"blue"} title={"Function Component"} />

      <Button color={"White"} backgroundColor={"blue"} text={"Add"} />
      <Button color={"black"} backgroundColor={"red"} text={"Delete"} />
      <Button color={"black"} backgroundColor={"green"} text={"Done"} />
      {/* <Header color={"blue"} title={"Typescript"}/>  */}
      {/* <Header color={"red"} title= {"React"}/> */}

      <Counter />
      <Calculator />
      <Generator />
      <Hello />
  </div>
}

export default Components;