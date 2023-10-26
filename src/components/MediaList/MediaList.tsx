// @ts-nocheck
import styles from "./MediaList.module.css";

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
