// @ts-nocheck
import data from "../../../data/spetialTexts.json";
import styles from "@/styles/Home.module.css";

export default function MonthsList({ current, setCurrent }) {
  const monthsList = data.map((item, i) => {
    if (typeof item.key === "number") {
      return (
        <p
          key={i}
          style={{ margin: "1rem" }}
          className={current === item.key ? styles.yearActive : styles.year}
          onClick={() => setCurrent(item.key)}
        >
          {item.key}
        </p>
      );
    }
  });
  return <div style={{ display: "flex" }}>{monthsList}</div>;
}
