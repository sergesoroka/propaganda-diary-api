// @ts-nocheck

import Link from "next/link";
import { motion } from "framer-motion";

import { useRouter } from "next/router";
import useLangSwitcher from "../../../utils/i18n/useLangSwitcher";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

export const MediaCasesBarChart = () => {
  const router = useRouter();
  const { locale, pathname } = router;
  const { data } = useLangSwitcher();

  const MEDIA_BY_NARRATIVE_ID_URL = `https://vox-dashboard.ra-devs.tech/api/narratives?per_page=30&lang=${locale}`;
  const { data: dataNarrative } = useSWR(MEDIA_BY_NARRATIVE_ID_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const renderNarratives =
    dataNarrative &&
    dataNarrative.data.map((item, i) => {
      return (
        <Link key={i} href={{ pathname: `/narrative/${item.id}` }}>
          <rect
            width="30"
            height={item.dashboards_count / 6}
            fill={router.query.id == item.id ? "#ff2618" : "#ccc"}
            x={i * 35}
            style={{ cursor: "pointer" }}
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
        <svg width="950" height="400" style={{ transform: "scaleY(-1)" }}>
          {dataNarrative && renderNarratives}
        </svg>
      </div>
    </motion.div>
  );
};
