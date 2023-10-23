// @ts-nocheck
import styles from "./BarChart.module.css";
import { motion } from "framer-motion";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

// import { commonStatistic } from "../../../utils/statisticCalculate";
import Link from "next/link";
import SpetialText from "../../../data/SpetialText";
import { useRouter } from "next/router";

const BarChart = () => {
  const router = useRouter();
  const { month } = router.query;

  const { data: statisticData } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/dashboards-statistic`,
    fetcher
  );
  // const data = [
  //   {
  //     name: "01",
  //     score: commonStatistic("2022-01-01", "2022-01-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "02",
  //     score: commonStatistic("2022-02-01", "2022-02-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "03",
  //     score: commonStatistic("2022-03-01", "2022-03-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "04",
  //     score: commonStatistic("2022-04-01", "2022-04-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "05",
  //     score: commonStatistic("2022-05-01", "2022-05-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "06",
  //     score: commonStatistic("2022-06-01", "2022-06-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "07",
  //     score: commonStatistic("2022-07-01", "2022-07-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "08",
  //     score: commonStatistic("2022-08-01", "2022-08-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "09",
  //     score: commonStatistic("2022-09-01", "2022-09-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "10",
  //     score: commonStatistic("2022-10-01", "2022-10-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "11",
  //     score: commonStatistic("2022-11-01", "2022-11-31", "Fake").length * 10,
  //   },
  //   {
  //     name: "12",
  //     score: commonStatistic("2022-12-01", "2022-12-31", "Fake").length * 10,
  //   },
  // ];

  return (
    <div>
      <div className={styles.BarChart}>
        <svg className={styles.barChart} style={{ transform: "scaleY(-1)" }}>
          {statisticData &&
            statisticData.data.map((item, i) => {
              if (i<1>) {
                <rect style={{ width: "16px" }} />;
              }
              if (item.year == 2022) {
                let color = i % 2 === 0 ? "#CDCDCD" : "#e4e4e4";
                return (
                  <Link key={i} href={`/month/${item.month}`}>
                    <rect
                      className={
                        month == item.month ? styles.barActive : styles.bar
                      }
                      width="60"
                      height={item.sub_narrative}
                      style={{ fill: color }}
                      x={i * 70}
                    />
                  </Link>
                );
              }
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
            className={styles.barNumbers}
          >
            {statisticData &&
              statisticData.data.map((item, i) => {
                if (item.year == 2022) {
                  return <p key={i}>{item.month}</p>;
                }
              })}
          </motion.div>
        </div>

        <p className={styles.subtitle}>
          <SpetialText name={"Fakes_dynamics"} />, 2022
        </p>
      </div>

      <div className={styles.BarChartMob}>
        <svg className={styles.barChartMob} style={{ transform: "scaleY(-1)" }}>
          {statisticData &&
            statisticData.data.map((item, i) => {
              let color = i % 2 === 0 ? "#CDCDCD" : "#e4e4e4";

              return (
                <Link key={i} href={`/month/${item.month}`}>
                  <rect
                    className={
                      month == item.month ? styles.barActiveMob : styles.barMob
                    }
                    width="17"
                    height={item.sub_narrative}
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
            className={styles.barNumbersMob}
          >
            <p>02</p>
            <p>03</p>
            <p>04</p>
            <p>05</p>
            <p>06</p>
            <p>07</p>
            <p>08</p>
            <p>09</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
          </motion.div>
        </div>

        <p className={styles.subtitle}>
          <SpetialText name={"Fakes_dynamics"} />, 2022
        </p>
      </div>
    </div>
  );
};

export default BarChart;
