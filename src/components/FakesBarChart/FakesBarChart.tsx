import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useRouter } from "next/router";
import useLangSwitcher from "../../../utils/i18n/useLangSwitcher";
import SpetialText from "../../../data/SpetialText";

let defaultFakesNumber = 5;

export const FakesBarChart = () => {
  const router = useRouter();
  const { locale } = router;
  const { data } = useLangSwitcher();

  const [dataNarrative, setDataNarrative] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let defaultNarrative = router.query.id;
  // @ts-ignore
  const [title, setTitle] = useState<string | null>(defaultNarrative);
  const [subNarrativeData, setSubNarrativeData] = useState(null);
  const [fakes, setFakes] = useState<number>(defaultFakesNumber);

  useEffect(() => {
    fetch(
      `https://vox-dashboard.ra-devs.tech/api/narratives?per_page=30&lang=${locale}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDataNarrative(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    let isMounted = true;
    // async function getSubNarrative() {
    //   // @ts-ignore
    //   const dataFetched = await getSubNarrativeData(locale);
    //   if (isMounted) {
    //     setSubNarrativeData(dataFetched);
    //   }
    // }
    // getSubNarrative();
  }, [locale]);

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
          <SpetialText name={"Fakes"} />: {fakes}
        </p>
        <svg width="950" height="200" style={{ transform: "scaleY(-1)" }}>
          {dataNarrative && renderNarratives}
        </svg>
      </div>
      {/* <div>{renderNarrativesMobie}</div> */}
    </motion.div>
  );
};
