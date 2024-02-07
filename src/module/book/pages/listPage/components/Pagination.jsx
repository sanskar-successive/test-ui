import { memo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Pagination } from "../../../../../lib/generics";



const TablePagination = ({ totalItems }) => {

  let limit = 20, skip = 0, currentPage = 1;


  const location = useLocation();
  const [queryParams, setQueryParams] = useSearchParams(location.search);

  let current = 1;
  let toLimit = 20;

  if (queryParams.has("skip")) {

    let toSkip = Number(queryParams.get("skip"));

    if (queryParams.has("limit")) {
      toLimit = Number(queryParams.get("limit"));
    }

    current = Math.floor((toSkip + toLimit) / toLimit);
  }



  const handlePageChange = (pageNumber) => {

    currentPage = pageNumber;
    skip = (currentPage - 1) * limit;

    if (currentPage !== 1) {

      queryParams.set("skip", skip);

    } else {
      queryParams.delete("skip");
    }

    if (limit !== 20) {

      queryParams.set("limit", limit);

    } else {
      queryParams.delete("limit");
    }

    setQueryParams(queryParams);
  }

  const handleLimitChange = (current, pageSize) => {

    currentPage = current;
    limit = pageSize;
    skip = (currentPage - 1) * limit;

    if (currentPage !== 1) {

      queryParams.set("skip", skip);

    } else {
      queryParams.delete("skip");
    }

    if (limit !== 20) {

      queryParams.set("limit", limit);

    } else {
      queryParams.delete("limit");
    }

    setQueryParams(queryParams);

  }

  return (
    <Pagination
      responsive
      current={current}
      total={totalItems}
      showSizeChanger
      pageSize={Number(queryParams.get("limit")) || 20}
      showQuickJumper
      pageSizeOptions={[10,20,30]}
      showTotal={(total) => `Total ${total} items`}
      onShowSizeChange={handleLimitChange}
      onChange={handlePageChange}
    />
  )

}

export default memo(TablePagination);
