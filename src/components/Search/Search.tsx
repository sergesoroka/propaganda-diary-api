import { useRouter } from "next/router";
import styles from "./Search.module.css";
import useSearchAutoComplete from "./searchHook";

import SearchResults from "./SearchResults";

const Search = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { locale } = router;
 
  const {
    handleChange,
    handleClick,
    handleClear,
    value,
    suggestionsActive,
    suggestionIndex,
    suggestions,
  } = useSearchAutoComplete();

  const placeholdrer =
    locale == "en"
      ? "Search for fakes"
      : locale == "ru"
      ? "Поиск фейков"
      : "Пошук фейків";

  return (
    <div className={styles.searchWrap}>
      <div className={styles.searchIcon}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.8171 19.7962C16.6921 22.9225 11.6227 22.9254 8.49415 19.8028C5.36561 16.6801 5.36268 11.6143 8.48761 8.48804C11.6125 5.36176 16.682 5.35883 19.8105 8.4815C22.9391 11.6042 22.942 16.6699 19.8171 19.7962ZM20.4904 21.8817C16.5615 25.1025 10.7516 24.8818 7.08024 21.2173C3.16992 17.3143 3.16626 10.9827 7.07207 7.07516C10.9779 3.16766 17.3141 3.16399 21.2244 7.06698C24.8958 10.7314 25.1234 16.5368 21.9049 20.4667L29.0201 27.5686L27.6057 28.9836L20.4904 21.8817Z"
            fill="#676767"
          />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholdrer}
      />
      {value && (
        <>
          <SearchResults
            handleClick={handleClick}
            suggestionIndex={suggestionIndex}
            suggestions={suggestions}
          />
        </>
      )}
    </div>
  );
};

export default Search;
