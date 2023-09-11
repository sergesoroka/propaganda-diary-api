import styles from "./StatisticDisplay.module.css";
import SpetialText from "../../../data/SpetialText";

const StatisticDisplay = ({
  mode,
  month,
  narratives,
  fakes,
  sources,
  year,
}: {
  mode: string;
  month: string;
  narratives: string | number;
  fakes: string | number;
  sources: string | number;
  year?: string | number;
}) => {
  return (
    <div className={styles.cards}>
      <div className={styles.cardsWrap}>
        <div className={mode === "active" ? styles.cardActive : styles.card}>
          <p
            className={
              mode === "active" ? styles.cardNumberActive : styles.cardNumber
            }
          >
            {narratives}
          </p>
          <p
            className={
              mode === "active"
                ? styles.cardCategoryActive
                : styles.cardCategory
            }
          >
            <SpetialText name={"Narratives"} />
          </p>
        </div>
        <div className={mode === "active" ? styles.cardActive : styles.card}>
          <p
            className={
              mode === "active" ? styles.cardNumberActive : styles.cardNumber
            }
          >
            {fakes}
          </p>
          <p
            className={
              mode === "active"
                ? styles.cardCategoryActive
                : styles.cardCategory
            }
          >
            <SpetialText name={"Fakes"} />
          </p>
        </div>
        <div className={mode === "active" ? styles.cardActive : styles.card}>
          <p
            className={
              mode === "active" ? styles.cardNumberActive : styles.cardNumber
            }
          >
            {sources}
          </p>
          <p
            className={
              mode === "active"
                ? styles.cardCategoryActive
                : styles.cardCategory
            }
          >
            <SpetialText name={"Sources"} />
          </p>
        </div>
      </div>
      <p className={styles.subtitle}>
        <SpetialText name={month} />
        {month !== "General_statistics" &&
          (year == "2023" ? ", 2023" : ", 2022")}
      </p>
    </div>
  );
};

export default StatisticDisplay;
