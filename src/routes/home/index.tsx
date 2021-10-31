import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import HogeFuga from "../../components/test";
import Button from "@mui/material/Button";

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <p>この下はHogeFugaコンポーネント</p>
      <HogeFuga />
      <p>この下はButtonコンポーネント</p>
      <Button variant="contained">Button</Button>
      <p>test 終わり</p>
    </div>
  );
};

export default Home;
