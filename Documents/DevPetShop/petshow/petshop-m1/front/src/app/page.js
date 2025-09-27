import { PawPrint } from "lucide-react";
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
        </div>
      </div>
    </>
  );
}
