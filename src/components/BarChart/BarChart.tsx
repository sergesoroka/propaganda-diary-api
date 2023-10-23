// @ts-nocheck
import styles from "./BarChart.module.css";
import { motion } from "framer-motion";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

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
