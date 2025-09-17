import React, { useEffect, useState } from "react";

interface PaginationProps {
  totalItems?: number;
  itemsCountPerPage?: number;
  className?: string;
  changePage: any;
  changeCurrentPage?: any;
}

const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [pages, setPages] = useState<Number[]>([]);

  useEffect(() => {
    setCurrentPage(props.changeCurrentPage);
  }, [props.changeCurrentPage]);

  useEffect(() => {
    var totalItems: number = props.totalItems ? props.totalItems : Number(10);
    var itemsCountPerPage: number = props.itemsCountPerPage
      ? props.itemsCountPerPage
      : Number(10);
    const totalPage = Math.ceil(totalItems / itemsCountPerPage);
    setLastPage(totalPage);
    var temp = [];
    temp.push(currentPage);
    setPages(temp);
  }, [currentPage, props.totalItems]);

  const changepage = (page: number) => {
    setCurrentPage(page);
    props.changePage(page);
  };

  const nextchangepage = () => {
    setCurrentPage(currentPage==lastPage ? lastPage : currentPage + 1);
    props.changePage(currentPage==lastPage ? lastPage : currentPage + 1);
  };
  const previouschangepage = () => {
    setCurrentPage(currentPage==1 ? currentPage : currentPage - 1);
    props.changePage(currentPage==1 ? currentPage : currentPage - 1);
  };

  return (
    <>
      <div className="pagination d-flex  align-items-center justify-content-between">
        <div className="gridjs-summary" title="Total Count">
          Total Count : {props.totalItems}
        </div>
        <div className="gridjs-pages">
          <nav className="" aria-label="pagination">
            <ul className="pagination">
              <li className="arrow-box paginatin-btn pagination-item">
                <a href="#" className="page-link" aria-label="First">
                  <span aria-hidden="true">«</span>
                  <span className="visually-hidden">First</span>
                </a>
              </li>
              <li
                className="arrow-box paginatin-btn pagination-item"
                onClick={() => previouschangepage()}
              >
                <a href="#" className="page-link" aria-label="Previous">
                  <span aria-hidden="true">‹</span>
                  <span className="visually-hidden">Previous</span>
                </a>
              </li>
              {pages.map((page: any, index: number) => {
                return (
                  <li
                    key={"pagable_" + index}
                    className={
                      page==currentPage
                        ? "page-item pagination-item active"
                        : "page-item pagination-item"
                    }
                    onClick={() => changepage(page)}
                  >
                    <a href="#" className="active page-link">
                      {page}
                    </a>
                  </li>
                );
              })}
              <li
                onClick={() => nextchangepage()}
                className="arrow-box paginatin-btn pagination-item"
              >
                <a href="#" className="page-link" aria-label="Next">
                  <span aria-hidden="true">›</span>
                  <span className="visually-hidden">Next</span>
                </a>
              </li>
              <li className="arrow-box paginatin-btn pagination-item">
                <a href="#" className="page-link" aria-label="Last">
                  <span aria-hidden="true">»</span>
                  <span className="visually-hidden">Last</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination;
