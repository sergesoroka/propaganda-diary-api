// @ts-nocheck
import styles from "@/styles/Home.module.css";

export default function YearsList({ current, setCurrent }) {
  return (
    <div className={styles.yearsWrap}>
      <p
        className={current === "2022" ? styles.yearActive : styles.year}
        onClick={() => setCurrent("2022")}
      >
        2022
      </p>
      <p
        className={current === "2023" ? styles.yearActive : styles.year}
        onClick={() => setCurrent("2023")}
      >
        2023
      </p>
    </div>
  );
}
