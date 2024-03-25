import styles from "./start.module.css";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();
  function routeHeroes(): void {
    navigate("/heroes");
  }

  return (
    <div className={styles.mainstart}>
      <section>
        <h1>Defend Elven forest from evil</h1>
        <button onClick={routeHeroes}>PLAY</button>
      </section>
      <footer>©AarwynSolutions</footer>
    </div>
  );
}
