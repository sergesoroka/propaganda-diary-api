// @ts-nocheck
import styles from "./MediaList.module.css";

import useSWR, { preload } from "swr";
import { fetcher } from "../../../lib/fetcher";
import { useEffect } from "react";

function MediaList({
  country,
  media,
  setMedia,
  mediaData,
}: {
  country?: string;
  media?: string;
  setMedia?: (media: string) => {};
}) {
  // const MEDIA_URL = `https://vox-dashboard.ra-devs.tech/api/dashboard-media?country=${country}&media_type=0`;

  // preload(MEDIA_URL, fetcher);

  // const { data: mediaData } = useSWR(MEDIA_URL, fetcher);

  const mediaList =
    mediaData &&
    mediaData.data.map((item, i) => {
      let mediaName = item.name;
      return (
        <div key={i} onClick={() => setMedia(mediaName)}>
          <p
            className={
              country && media && media == item.name
                ? styles.listItemActive
                : styles.listItem
            }
          >
            {item.name}
          </p>
        </div>
      );
    });
  return (
    <div>
      <hr
        style={{
          height: "2px",
          background: "#FF2618",
          border: "none",
          width: "100%",
          margin: "2rem 0",
        }}
      />
      <div className={styles.MediaList}>{mediaList}</div>
    </div>
  );
}

export default MediaList;
