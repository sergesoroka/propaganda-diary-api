// @ts-nocheck
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import useSWR from "swr";

import { fetcher } from "../../lib/fetcher";

export default function About() {
  const router = useRouter();
  const { locale } = router;

  const { data, error } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/about?lang=${locale}`,
    fetcher
  );

  const aboutRender =
    data &&
    data.data.map((item, i) => {
      return (
        <div key={i}>
          <h1>{item.title}</h1>
          <p
            className={styles.aboutParag}
            style={{ lineHeight: "1.6rem", marginBottom: "1rem" }}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      );
    });

  return (
    <div>
      <Head>
        <title>Propaganda Diary | About</title>
        <meta name="description" content="About Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "tween" }}
        className={styles.mainAbout}
      >
        {aboutRender}
      </motion.div>
    </div>
  );
}
