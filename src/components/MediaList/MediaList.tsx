// @ts-nocheck
import styles from "./MediaList.module.css";
import data from "../../../data/mediaLists.json";

function MediaList({
  country,
  media,
  setMedia,
}: {
  country?: string;
  media?: string;
  setMedia?: (media: string) => {};
}) {
  const mediaList = data.map((item, i) => {
    if (item.country === country) {
      let mediaName = item.name;
      return (
        <div key={i} onClick={() => setMedia(mediaName)}>
          <p
            className={
              media === item.name ? styles.listItemActive : styles.listItem
            }
          >
            {item.name}
          </p>
        </div>
      );
    }
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
      <div className={styles.MediaList}>
        <p
          className={media === "all" ? styles.listItemActive : styles.listItem}
          onClick={() => setMedia("all")}
        >
          ALL MEDIA
        </p>
        {mediaList}
      </div>
    </div>
  );
}

export default MediaList;
