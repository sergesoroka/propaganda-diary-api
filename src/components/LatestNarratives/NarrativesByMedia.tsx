// @ts-nocheck
import { motion } from "framer-motion";
import styles from "./LatestNarratives.module.css";
import SpetialText from "../../../data/SpetialText";

import useLangSwitcher from "../../../utils/i18n/useLangSwitcher";
import Narrative from "./Narrative/Narrative";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getNarrativeData from "../../../lib/getNarrativeData";
import getMediaDataByCountry from "../../../lib/getMediaDataByCountry";

const NarrativesByMedia = ({
  country,
  media,
  setMedia,
}: {
  country: string;
  media: string;
  setMedia: (media: string) => {};
}) => {
  // const { data } = useLangSwitcher();

  const router = useRouter();
  const { locale } = router;
  const [narrativeData, setNarrativeData] = useState(null);
  // const [mediaData, setMediaData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function getNarrative() {
      const dataFetched = await getNarrativeData(locale);
      if (isMounted) {
        setNarrativeData(dataFetched);
      }
    }
    getNarrative();

    // async function getMedia() {
    //   const dataFetched = await getMediaDataByCountry(locale, country, media);
    //   if (isMounted) {
    //     setMediaData(dataFetched);
    //   }
    // }
    // getMedia();
    return () => {
      isMounted = false;
    };
  }, [locale, country, media]);

  // console.log(locale, country, media);

  // @ts-ignore
  const NarrativesRender =
    narrativeData &&
    narrativeData.data.map((narrative, i) => {
      return (
        <Narrative
          key={i}
          narrativeId={narrative.id}
          narrativeTitle={narrative.title}
          media={media}
          country={country}
        />
      );
    });

  return <div className={styles.narrativeWrap}>{NarrativesRender}</div>;
};

export default NarrativesByMedia;
