import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./LatestNarratives.module.css";

import narrLast from "../../../data/lastedNarratives.json";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LatestNarratives = () => {
  const [dataNarratives, setDataNarratives] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    fetch(`https://vox-dashboard.ra-devs.tech/api/narratives?lang=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        setDataNarratives(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [locale]);

  // @ts-ignore
  const lastNarratives = dataNarratives.map((narrative, i) => {
    return (
      <Link key={i} href={{ pathname: `/narrative/${narrative.id}` }}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.narrativeHeading}
          style={{ marginTop: "1.4rem" }}
        >
          {narrative.title}
        </motion.h1>
        <hr
          style={{
            height: "1px",
            background: "rgb(204, 204, 204)",
            border: "none",
          }}
        />
      </Link>
    );
  });

  return (
    <div className={styles.narrativeWrap}>
      {/* @ts-ignore */}
      {lastNarratives}
    </div>
  );
};

export default LatestNarratives;
