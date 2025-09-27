import { PawPrint, User } from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.hero}>
            <img className={styles.heroimage} src="/pets.png" alt="Pets" />
          <div className={styles.herotext}>
            Gerencie seu negócio com Petshow
          </div>
        </div>
        <div className={styles.links}>
          <Link href="./pets/view" className={styles.link}>
            <div className={styles.linkheader}>
              <div><PawPrint /></div>
              <h2>Pets</h2>
            </div>
            <p className={styles.linkbody}>Gerencie pets</p>
          </Link>
          <Link href="./tutores/view" className={`${styles.link} ${styles.secondarybg}`}>
            <div className={styles.linkheader}>
              <div><User /></div>
              <h2>Tutores</h2>
            </div>
            <p className={styles.linkbody}>Gerencie tutores</p>
          </Link>
        </div>
      </div>
    </>
  );
}
