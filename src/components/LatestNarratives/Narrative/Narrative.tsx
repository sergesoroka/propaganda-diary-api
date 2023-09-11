import { motion } from "framer-motion";
import { useState } from "react";
import SpetialText from "../../../../data/SpetialText";
import FakeListForMedia from "@/components/Fake/FakeListForMedia";
import styles from "../LatestNarratives.module.css";
import useLangSwitcher from "../../../../utils/i18n/useLangSwitcher";

function Narrative({
  narrativeId,
  narrativeTitle,
  media,
  country,
}: {
  narrativeId?: string;
  narrativeTitle: string;
  media: string;
  country: string;
}) {
  const [openNarrative, setOpenNarrative] = useState(false);
  const { data } = useLangSwitcher();

  const uniqueFakesByMedia: string[] = [];

  // @ts-ignore
  data.map((c) => {
    if (
      !uniqueFakesByMedia.includes(c.Fake) &&
      c.Narrative === narrativeTitle &&
      c.Country === country &&
      c.Media === media
    ) {
      uniqueFakesByMedia.push(c.Fake);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "tween", delay: 0.4 }}
    >
      <div className={styles.narrativeItem}>
        <p className={styles.fakesNumber}>
          <SpetialText name={"Fakes"} />: {uniqueFakesByMedia.length}
        </p>

        <h1
          className={styles.narrativeHeading}
          onClick={() => setOpenNarrative(!openNarrative)}
        >
          {narrativeTitle}
        </h1>
      </div>
      {openNarrative && (
        <FakeListForMedia
          narrativeId={narrativeId}
          media={media}
          country={country}
        />
      )}
      <hr
        style={{
          height: "1px",
          background: "rgb(204, 204, 204)",
          border: "none",
        }}
      />
    </motion.div>
  );
}

export default Narrative;
