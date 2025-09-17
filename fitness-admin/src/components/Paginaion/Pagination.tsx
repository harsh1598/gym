import React from "react";
import {limit} from "../../components/common/list";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="col-12">
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination pagination-primary justify-content-center flex-wrap">
            {/* Previous Button */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                type="button"
                className="page-link"
                style={{ backgroundColor: "#8392AB" }}
                onClick={() => handlePageChange(currentPage - 1)}
                rel="prev"
              >
                <i className="bi bi-arrow-left" style={{ color: "white" }}></i>
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  type="button"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                type="button"
                style={{ backgroundColor: "#8392AB" }}
                onClick={() => handlePageChange(currentPage + 1)}
                rel="next"
              >
                <i className="bi bi-arrow-right" style={{ color: "white" }}></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
