import styles from "./BarChart.module.css";
import { motion } from "framer-motion";

import { commonStatistic } from "../../../utils/statisticCalculate";
import Link from "next/link";
import SpetialText from "../../../data/SpetialText";
import { useRouter } from "next/router";


const BarChartCurrent = () => {
  const router = useRouter();
  const { month } = router.query;
  const data = [
    {
      name: "01",
      score: commonStatistic("2023-01-01", "2023-01-31", "Fake").length * 10,
    },
    {
      name: "02",
      score: commonStatistic("2023-02-01", "2023-02-31", "Fake").length * 10,
    },
    // {
    //   name: "03",
    //   score: commonStatistic("2023-03-01", "2023-03-31", "Fake").length * 10,
    // },
    // {
    //   name: "04",
    //   score: commonStatistic("2023-04-01", "2023-04-31", "Fake").length * 10,
    // },
    // {
    //   name: "05",
    //   score: commonStatistic("2023-05-01", "2023-05-31", "Fake").length * 10,
    // },
    // {
    //   name: "06",
    //   score: commonStatistic("2023-06-01", "2023-06-31", "Fake").length * 10,
    // },
    // {
    //   name: "07",
    //   score: commonStatistic("2023-07-01", "2023-07-31", "Fake").length * 10,
    // },
    // {
    //   name: "08",
    //   score: commonStatistic("2023-08-01", "2023-08-31", "Fake").length * 10,
    // },
    // {
    //   name: "09",
    //   score: commonStatistic("2023-09-01", "2023-09-31", "Fake").length * 10,
    // },
    // {
    //   name: "10",
    //   score: commonStatistic("2023-10-01", "2023-10-31", "Fake").length * 10,
    // },
    // {
    //   name: "11",
    //   score: commonStatistic("2023-11-01", "2023-11-31", "Fake").length * 10,
    // },
    // {
    //   name: "12",
    //   score: commonStatistic("2023-12-01", "2023-12-31", "Fake").length * 10,
    // },
  ];

  return (
    <div>
      <div className={styles.BarChart}>
        <svg className={styles.barChart} style={{ transform: "scaleY(-1)" }}>
          {data.map((item, i) => {
            let color = i % 2 === 0 ? "#CDCDCD" : "#e4e4e4";
            return (
              <Link key={item.name} href={`/month/${item.name}`}>
                <rect
                  // @ts-ignore

                  className={
                    month === item.name ? styles.barActive : styles.bar
                  }
                  width="60"
                  height={item.score / 10}
                  style={{ fill: color }}
                  x={i * 70}
                />
              </Link>
            );
          })}
        </svg>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "830px",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={styles.barNumbersCurrent}
          >
            <p>01</p>
            <p>02</p>
          </motion.div>
        </div>

        <p className={styles.subtitle}>
          <SpetialText name={"Fakes_dynamics"} />, 2023
        </p>
      </div>

      <div className={styles.BarChartMob}>
        <svg className={styles.barChartMob} style={{ transform: "scaleY(-1)" }}>
          {data.map((item, i) => {
            let color = i % 2 === 0 ? "#CDCDCD" : "#e4e4e4";
            return (
              <Link key={item.name} href={`/month/${item.name}`}>
                <rect
                  className={
                    month === item.name ? styles.barActiveMob : styles.barMob
                  }
                  width="17"
                  height={item.score / 10}
                  style={{ fill: color }}
                  x={i * 26}
                />
              </Link>
            );
          })}
        </svg>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={styles.barNumbersCurrentMob}
          >
            <p>01</p>
            <p>02</p>
          </motion.div>
        </div>

        <p className={styles.subtitle}>
          <SpetialText name={"Fakes_dynamics"} />, 2023
        </p>
      </div>
    </div>
  );
};

export default BarChartCurrent;
