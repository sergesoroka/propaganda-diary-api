// @ts-nocheck
import styles from "../../components/SubNarratives/SubNarrative.module.css";
import SubNarrativeBySearch from "../SubNarratives/SubNarrativeBySearch";

const SearchResults = ({ suggestions }: { suggestions: never[] }) => {
  const renderedSearchData =
    suggestions &&
    suggestions.map((item, i) => {
      return (
        <div key={i}>
          <SubNarrativeBySearch title={item.title} id={item.id} />
        </div>
      );
    });

  return (
    <div>
      <span className={styles.caption}>Search Results: </span>
      {renderedSearchData}
    </div>
  );
};

export default SearchResults;
