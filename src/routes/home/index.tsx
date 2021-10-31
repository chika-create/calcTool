import { FunctionalComponent, h } from "preact";
import HogeFuga from "../../components/test";
import style from "./style.css";

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <p>test hoge</p>
      <HogeFuga />
    </div>
  );
};

export default Home;
