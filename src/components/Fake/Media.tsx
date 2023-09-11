import useLangSwitcher from "../../../utils/i18n/useLangSwitcher";
import styles from "./Fake.module.css";

function Media({
  fake,
  country,
  media,
}: {
  fake: string;
  country: string;
  media: string;
}) {
  const { data } = useLangSwitcher();
  
  // @ts-ignore
  const listOfMedia = data.map((item) => {
   
    if (
      item.Fake === fake &&
      item.Country === country &&
      item.Media === media
    ) {
      return (
        <div key={item.id} className={styles.mediaList}>
          <a target="_blank" rel="noreferrer" href={item.Link_archive}>
            <p className={styles.mediaName}>{item.Media}</p>
          </a>
          <p>{item.Country}</p>
          <p className={styles.mediaDate}>{item.Date}</p>
        </div>
      );
    }
  });

  return (
    <>
      <div className={styles.fakeHeadingMediaPage}>{fake}</div>
      
      {listOfMedia}
    </>
  );
}

export default Media;
