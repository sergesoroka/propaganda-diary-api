import { useState } from "react";
import { useRouter } from "next/router";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

const useSearchAutoComplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const router = useRouter();
  const { locale } = router;

  const SEARCH_URL = `https://vox-dashboard.ra-devs.tech/api/dashboards-by-fakes?search=${value}&lang=${locale}`;
  const { data: searchData, error } = useSWR(SEARCH_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 1 && searchData) {
      const arrayFromObjectData = Object.keys(searchData);

      const filterSuggestions =
        arrayFromObjectData &&
        arrayFromObjectData.map((item) => {
          setSearchResult((prev) => [...prev, searchData[item]]);
          // searchResult.push(searchData.data[item]);
          return item;
        });
      // .filter((suggestion) => suggestion.toLowerCase().indexOf(query) > -1);

      setSuggestions([...filterSuggestions]);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setSuggestionsActive(false);
  };

  const handleClear = () => {
    setValue("");
    setSuggestions([]);
  };

  return {
    suggestionsActive,
    suggestionIndex,
    value,
    handleChange,
    handleClick,
    handleClear,
    suggestions,
    searchResult,
  };
};

export default useSearchAutoComplete;
