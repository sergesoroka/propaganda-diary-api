// @ts-nocheck
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./LatestNarratives.module.css";
import SpetialText from "../../../data/SpetialText";

import useLangSwitcher from "../../../utils/i18n/useLangSwitcher";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/router";

import useSWR, { preload } from "swr";
import { fetcher } from "../../../lib/fetcher";

const AllNarratives = () => {
  // const [dataNarratives, setDataNarratives] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [fakesNumber, setFakesNumber] = useState(0);

  const router = useRouter();
  const { locale } = router;

  const { data } = useLangSwitcher();

  preload(
    `https://vox-dashboard.ra-devs.tech/api/narratives?lang=${locale}&per_page=30`,
    fetcher
  );

  const { data: dataNarratives, error } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/narratives?lang=${locale}&per_page=30`,
    fetcher
  );

  const { data: dataSubNarratives } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/sub-narratives?lang=${locale}&per_page=300`,
    fetcher
  );

  const lastNarratives =
    dataNarratives &&
    dataNarratives.data.map((narrative, i) => {
      const uniqueFakes: string[] = [];

      // dataSubNarratives &&
      //   dataSubNarratives.data.map((fake) => {
      //     if (narrative.id == fake.narrative_id) {
      //       uniqueFakes.push(fake.narrative_id);
      //     }
      //   });

      return (
        <Suspense fallback="Loading..." key={i}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: "tween", delay: 0.4 }}
          >
            <div className={styles.narrativeItem}>
              <p className={styles.fakesNumber}>
                <SpetialText name={"Fakes"} />:{" "}
                {/* {uniqueFakes.length > 0 && uniqueFakes.length} */}
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

  return (
    <div className={styles.narrativeWrap}>
      {/* @ts-ignore */}
      {lastNarratives}
    </div>
  );
};

export default AllNarratives;
