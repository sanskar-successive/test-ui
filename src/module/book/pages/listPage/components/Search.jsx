import React from 'react'
import { Search } from '../../../../../lib/generics'
import { useSearchParams } from "react-router-dom";
import { memo } from 'react';

const SearchBar = () => {

  const [queryParams, setQueryParams] = useSearchParams();

  let initialValue = "";

  if (queryParams.has("search")) {
    initialValue = queryParams.get("search");
  }

  const queryKeys = [];
  queryParams.forEach((value, key, parent) => {
    queryKeys.push(key);
  });

  const handleSearch = (value) => {
    if (value.trim().length) {

      for (let i = 0; i < queryKeys.length; i++) {
        queryParams.delete(queryKeys[i]);
      }
      queryParams.set("search", value.trim().toLowerCase());
      setQueryParams(queryParams);
    }
  };

  return (
    <Search style={{
      width: 400,
    }}
      defaultValue={initialValue} maxLength={50} placeholder="Search books" onSearch={handleSearch} enterButton />
  )
}

export default memo(SearchBar);
// export default SearchBar;