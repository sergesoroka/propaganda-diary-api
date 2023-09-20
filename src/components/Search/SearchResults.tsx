// @ts-nocheck
import styles from "../../components/SubNarratives/SubNarrative.module.css";
import SubNarrativeBySearch from "../SubNarratives/SubNarrativeBySearch";

const SearchResults = ({ suggestions }: { suggestions: never[] }) => {
  const renderedSearchData = suggestions.map((title, i) => {
    return (
      <div key={i}>
        <SubNarrativeBySearch title={title} />
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
