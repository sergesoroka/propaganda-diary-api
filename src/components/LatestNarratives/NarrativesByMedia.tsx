// @ts-nocheck
import styles from "./LatestNarratives.module.css";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getNarrativeData from "../../../lib/getNarrativeData";
import Narrative from "./Narrative/Narrative";

const NarrativesByMedia = ({
  country,
  media,
  setMedia,
}: {
  country: string;
  media: string;
  setMedia: (media: string) => {};
}) => {
  const router = useRouter();
  const { locale } = router;
  const [narrativeData, setNarrativeData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function getNarrative() {
      const dataFetched = await getNarrativeData(locale);
      if (isMounted) {
        setNarrativeData(dataFetched);
      }
    }
    getNarrative();

    return () => {
      isMounted = false;
    };
  }, [locale, country, media]);

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
