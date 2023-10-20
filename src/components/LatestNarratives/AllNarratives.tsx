// @ts-nocheck
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./LatestNarratives.module.css";
import SpetialText from "../../../data/SpetialText";

import { Suspense } from "react";
import { useRouter } from "next/router";

import useSWR, { preload } from "swr";
import { fetcher } from "../../../lib/fetcher";

const AllNarratives = () => {
  const router = useRouter();
  const { locale } = router;

  preload(
    `https://vox-dashboard.ra-devs.tech/api/narratives?lang=${locale}&per_page=30`,
    fetcher
  );

  const { data: dataNarratives, error } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/narratives?lang=${locale}&per_page=30`,
    fetcher
  );

  const lastNarratives =
    dataNarratives &&
    dataNarratives.data.map((narrative, i) => {
      return (
        <Suspense fallback="Loading..." key={i}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: "tween", delay: 0.4 }}
          >
            <div className={styles.narrativeItem}>
              <p className={styles.fakesNumber}>
                <SpetialText name={"Fakes"} />: {narrative.fake_count}
              </p>
              <Link href={{ pathname: `/narrative/${narrative.id}` }}>
                <h1 className={styles.narrativeHeading}>{narrative.title}</h1>
              </Link>
            </div>
            <hr
              style={{
                height: "1px",
                background: "rgb(204, 204, 204)",
                border: "none",
              }}
            />
          </motion.div>
        </Suspense>
      );
    });

  return <div className={styles.narrativeWrap}>{lastNarratives}</div>;
};

export default AllNarratives;
