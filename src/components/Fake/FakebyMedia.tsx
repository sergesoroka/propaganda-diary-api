import styles from "./Fake.module.css";
import useLangSwitcher from "../../../utils/i18n/useLangSwitcher";

const FakeByMedia = ({
  fake,
  month,
  year,
  country,
  media
}: {
  fake: string;
  month?: string;
  year?: string;
  country?: string;
  media?: string;
}) => {
  

  const { data } = useLangSwitcher();



  // @ts-ignore
  const mediaList = data.map((item) => {
    if ( fake == item.Fake) {
      return (
        <div className={styles.mediaList} key={item.id}>
          <a target="_blank" rel="noreferrer" href={item.Link_archive}>
            <p className={styles.mediaName}>{item.Media}</p>
          </a>
          <p className={styles.mediaCountry}>{item.Country}</p>
          <p className={styles.mediaDate}>{item.Date}</p>
        </div>
      );
    }
  });
  return (
    <div>
      <div
   
        className={ styles.fakeHeadingActive }
      >
        {fake}
      </div>
      { <>{mediaList}</>}
      
    </div>
  );
};

export default FakeByMedia;
