import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useRouter } from "next/router";
import useLangSwitcher from "../../../utils/i18n/useLangSwitcher";
import SpetialText from "../../../data/SpetialText";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

export const FakesBarChart = () => {
  const router = useRouter();
  const { locale, pathname } = router;
  const { data } = useLangSwitcher();

  let defaultNarrative = router.query.id;
  // @ts-ignore
  const [title, setTitle] = useState<string | null>(defaultNarrative);
  const [fakes, setFakes] = useState(240);

  const MEDIA_BY_NARRATIVE_ID_URL = `https://vox-dashboard.ra-devs.tech/api/narratives?per_page=30&lang=${locale}`;
  const { data: dataNarrative } = useSWR(MEDIA_BY_NARRATIVE_ID_URL, fetcher);

  const renderNarratives =
    dataNarrative &&
    // @ts-ignore
    dataNarrative.data.map((item, i) => {
      const uniqueFakes: string[] = [];

      // @ts-ignore
      data.map((fake) => {
        if (!uniqueFakes.includes(fake.Fake) && fake.Narrative === item.title) {
          uniqueFakes.push(fake.Fake);
        }
      });
      return (
        <Link key={i} href={{ pathname: `/narrative/${item.id}` }}>
          <rect
            width="30"
            height={uniqueFakes.length * 4}
            fill={router.query.id == item.id ? "#ff2618" : "#ccc"}
            x={i * 35}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setTitle(item.title);
              // @ts-ignore
              setFakes(uniqueFakes.length);
            }}
          />
        </Link>
      );
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "tween" }}
    >
      <div>
        <p className={styles.fakesNumber}>
          <SpetialText name={"Fakes"} />:{" "}
          {pathname === "/narratives"
            ? dataNarrative && dataNarrative.data.length
            : fakes}
        </p>
        <svg width="950" height="200" style={{ transform: "scaleY(-1)" }}>
          {dataNarrative && renderNarratives}
        </svg>
      </div>
    </motion.div>
  );
};
