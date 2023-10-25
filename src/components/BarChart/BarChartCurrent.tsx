// @ts-nocheck
import styles from "./BarChart.module.css";
import { motion } from "framer-motion";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

import Link from "next/link";
import SpetialText from "../../../data/SpetialText";
import { useRouter } from "next/router";

const BarChartCurrent = (current) => {
  const router = useRouter();
  const { month } = router.query;

  const { data: statisticData } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/dashboards-statistic`,
    fetcher
  );

  let count = 0;

  return (
    <div>
      <div className={styles.BarChart}>
        <svg className={styles.barChart} style={{ transform: "scaleY(-1)" }}>
          {statisticData &&
            statisticData.data.map((item, i) => {
              if (item.year == 2023) {
                count++;

                let color = i % 2 === 0 ? "#CDCDCD" : "#e4e4e4";
                return (
                  <Link key={i} href={`/${item.year}/${item.month}`}>
                    <rect
                      className={
                        month == item.month ? styles.barActive : styles.bar
                      }
                      width="60"
                      height={item.sub_narrative}
                      style={{ fill: color }}
                      x={count * 70}
                    />
                    <text>{count}</text>
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
            className={styles.barNumbersCurrent}
          >
            {statisticData &&
              statisticData.data.map((item, i) => {
                if (item.year == 2023) {
                  return <p key={i}>{item.month}</p>;
                }
              })}
          </motion.div>
        </div>

        <p className={styles.subtitle}>
          <SpetialText name={"Fakes_dynamics"} />, 2023
        </p>
      </div>

      <div className={styles.BarChartMob}>
        <svg className={styles.barChartMob} style={{ transform: "scaleY(-1)" }}>
          {statisticData &&
            statisticData.data.map((item, i) => {
              if (item.year == 2023) {
                let color = i % 2 === 0 ? "#CDCDCD" : "#e4e4e4";
                return (
                  <Link key={i} href={`/${item.year}/${item.month}`}>
                    <rect
                      className={
                        month == item.month
                          ? styles.barActiveMob
                          : styles.barMob
                      }
                      width="17"
                      height={item.sub_narrative}
                      style={{ fill: color }}
                      x={i * 26}
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
