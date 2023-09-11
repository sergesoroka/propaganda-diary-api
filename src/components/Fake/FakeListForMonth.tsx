import Fake from "./Fake";
import useLangSwitcher from "../../../utils/i18n/useLangSwitcher";
import styles from "./Fake.module.css";

const FakeListForMonth = ({
  narrative,
  month,
  year,
  tagName,
  country,
  media,
  setMedia,
}: {
  narrative?: string;
  month?: string;
  year?: string;
  tagName?: string;
  country?: string;
  media?: string;
  setMedia?: (media: string) => {};
}) => {
  const { data } = useLangSwitcher();

  const uniqueFakesByDate: string[] = [];
  const uniqueMediaByDate: string[] = [];

  // @ts-ignore
  data.map((c) => {
    if (
      !uniqueMediaByDate.includes(c.Media) &&
      c.Date >= `${year}-${month}-01` &&
      c.Date <= `${year}-${month}-31` &&
      c.Country == country
    ) {
      uniqueMediaByDate.push(c.Media);
    }
  });
  const renderMediaList = uniqueMediaByDate.map((item, i) => (
    <p
      key={i}
      className={
        media === item ? styles.mediaListNameActive : styles.mediaListName
      }
      // @ts-ignore
      onClick={() => setMedia(item)}
    >
      {item}
    </p>
  ));

  // @ts-ignore
  data.map(
    // @ts-ignore
    (c) => {
      if (
        !uniqueFakesByDate.includes(c.Fake) &&
        c.Date >= `${year}-${month}-01` &&
        c.Date <= `${year}-${month}-31` &&
        c.Country == country &&
        media === "all"
      ) {
        uniqueFakesByDate.push(c.Fake);
      }
      if (
        !uniqueFakesByDate.includes(c.Fake) &&
        c.Date >= `${year}-${month}-01` &&
        c.Date <= `${year}-${month}-31` &&
        c.Country == country &&
        c.Media === media
      ) {
        uniqueFakesByDate.push(c.Fake);
      }
      return c;
    },
    [data, year, month]
  );

  const renderedFakesByMonth = uniqueFakesByDate.map((item, i) => (
    <Fake
      fake={item}
      key={i}
      month={month}
      year={year}
      country={country}
      media={media}
    />
  ));

  return (
    <div>
      <div className={styles.mediaListWrap}>
        <div
          // @ts-ignore
          onClick={() => setMedia("all")}
          className={
            media === "all" ? styles.mediaListNameActive : styles.mediaListName
          }
        >
          All Media
        </div>
        {renderMediaList}
      </div>
      <hr />
      {renderedFakesByMonth}
    </div>
  );
};

export default FakeListForMonth;
