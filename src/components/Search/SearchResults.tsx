import Fake from "../Fake/Fake";

import styles from '../../styles/Home.module.css'

const SearchResults = ({
  handleClick,
  suggestionIndex,
  suggestions,
}: {
  handleClick: () => void;
  suggestionIndex: number;
  suggestions: never[];
}) => {
  /* @ts-ignore */
  const uniqueSearch: string[] = [];
  /* @ts-ignore */
  const renderedSearchData = suggestions.map((item, i) => {
    /* @ts-ignore */
    if (!uniqueSearch.includes(item)) {
      uniqueSearch.push(item);

      return  <Fake fake={item} key={item} />;
    }
  });



  return <div><span  className={styles.caption}>Search Results: </span>{renderedSearchData}</div>;
};

export default SearchResults;
