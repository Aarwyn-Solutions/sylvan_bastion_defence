import styles from "./heroes.module.css";
import druid from "../assets/heroes/Druid.jpg";
import mage from "../assets/heroes/Mage.png";
import ranger from "../assets/heroes/Ranger.jpg";
import knight from "../assets/heroes/Knight.jpg";
import shaman from "../assets/heroes/Shaman.jpg";

export default function Heroes() {
  return (
    <div className={styles.mainheroes}>
      <nav>
        <a>back</a>
        <br />
        <a>team icon</a>
        <br />
        <a>bar icon</a>
        <br />
        <a>gold icon</a>
      </nav>
      <section className={styles.heroes}>
        <div className={styles.herostack}>
          <div className={styles.herobillet}>
            <img src={druid} alt="" />
            <div className={styles.heroshortdesc}>
              <h3>Annabel</h3>
              <div className={styles.stats}>
                <p>❤ 10</p>
                <p>⚔ 10</p>
                <p>🛡 10</p>
              </div>
            </div>
          </div>
          <div className={styles.herobillet}>
            <img src={druid} alt="" />
            <div className={styles.heroshortdesc}>
              <h3>Annabel</h3>
              <div className={styles.stats}>
                <p>❤ 10</p>
                <p>⚔ 10</p>
                <p>🛡 10</p>
              </div>
            </div>
          </div>
          <div className={styles.herobillet}>
            <img src={mage} alt="" />
            <div className={styles.heroshortdesc}>
              <h3>Annabel</h3>
              <div className={styles.stats}>
                <p>❤ 10</p>
                <p>⚔ 10</p>
                <p>🛡 10</p>
              </div>
            </div>
          </div>
          <div className={styles.herobillet}>
            <img src={ranger} alt="" />
            <div className={styles.heroshortdesc}>
              <h3>Annabel</h3>
              <div className={styles.stats}>
                <p>❤ 10</p>
                <p>⚔ 10</p>
                <p>🛡 10</p>
              </div>
            </div>
          </div>
          <div className={styles.herobillet}>
            <img src={shaman} alt="" />
            <div className={styles.heroshortdesc}>
              <h3>Annabel</h3>
              <div className={styles.stats}>
                <p>❤ 10</p>
                <p>⚔ 10</p>
                <p>🛡 10</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.party}>
        <div className={styles.partygrid1}>
          <h1>Loem Ipsum</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
            libero impedit delectus explicabo quibusdam tempore nemo sit nobis
            debitis ipsam quas non dolore sapiente itaque error, ea soluta
            accusantium dicta.
          </p>
        </div>

        <div className={styles.partygrid2}>
          <section className={styles.yourparty}>
            <h2>YOUR PARTY</h2>
            <div className={styles.yourheroes}>
              <div className={styles.yourhero}>
                <img src={knight} alt="" />
              </div>
              <div className={styles.yourhero}>
                <img src={druid} alt="" />
              </div>
              <div className={styles.yourhero}></div>
            </div>
          </section>
          <button>Begin journey!</button>
        </div>
      </section>
      <section className={styles.herocard}>
        <div className={styles.info}>
          <h1>Hero Card</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            inventore facere eum voluptas animi quos harum unde laboriosam
            omnis, aliquam dolore numquam at qui labore aperiam vel architecto
            id reprehenderit.
          </p>
        </div>
        <img src={druid} alt="" />
        <div className={styles.basestats}>
          <h2>Base stats</h2>
          <p>sdlfksdlfs: 10</p>
          <p>sdlfksdlfs: 10</p>
          <p>sdlfksdlfs: 10</p>
          <p>sdlfksdlfs: 10</p>
          <p>sdlfksdlfs: 10</p>
        </div>
        <div className={styles.artifacts}>
          <h2>Artifacts</h2>
          <p>sdlfksdlfs: +10</p>
          <p>sdlfksdlfs: +10</p>
        </div>
        <button>HIRE</button>
      </section>
    </div>
  );
}
