import React from "react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CustomGrid = ({
  columns,
  data,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
// console.log(columns)
  const generatePaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  // Calculate automatic column width if not specified
  const getColumnStyle = (column) => {
    console.log(column.key)
    if (column.width) {
      return {
        width: column.width,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: column.width,
      };
    }

    // Auto sizing based on column type
    if (column.key === "action") {
      return {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: "150px",
      };
    }



    if (column.title && column.title.toLowerCase().includes("date")) {
      return {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: "100px",
      };
    }

    // if (
    //   column.title &&
    //   (column.title.toLowerCase().includes("id") ||
    //     column.title.toLowerCase().includes("status"))
    // ) {
    //   return {
    //     flexGrow: 0,
    //     flexShrink: 0,
    //     flexBasis: "130px",
    //   };

      // Approved ClaimsOnboarding
    // }
if (column.key === "status") {
  return {
    // width: "120px",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "100px",
    maxWidth: "130px",
    minWidth: "130px",
  };

  
}
if (column.key === "approvedClaims") {
  return {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "100px",
    fontSize: "14px",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  };
}
if (column.key === "onboardingDate") {
  return {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "100px",
    fontSize: "4px",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  };
}
// if (column.dataIndex === "onboardingDate") {
//   console.log(3333333)
//   return {
//     flexGrow: 0,
//     flexShrink: 0,
//     flexBasis: "100px",
//     fontSize: "5px",
//     whiteSpace: "normal",
//     wordBreak: "break-word",
//     overflowWrap: "anywhere",
//   };
// }
    // Default flexible width with min/max constraints
    return {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "200px",
      minWidth: "100px",
      maxWidth: "250px",
     fontSize:"12px",
       whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    };
  };

  return (
    <GridContainer>
      {/* Grid Header */}
      <div className="grid-table">
        <div className="grid-header">
          {columns.map((column, index) => (
            <div
              key={index}
              className="grid-cell"
              style={getColumnStyle(column)}
            >
              {column.title}
            </div>
          ))}
        </div>

        {/* Grid Body */}
        <div className="grid-body">
          {data?.map((item, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {columns.map((column, colIndex) => (
  <div
    key={colIndex}
    className={`grid-cell ${column.key === "status" ? "status-cell" : ""}`}
    style={getColumnStyle(column)}
  >
    {column.render
      ? column.render(item[column.dataIndex], item)
      : item[column.dataIndex]}
  </div>
))}

          
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="grid-footer">
        <div className="pagination-info">
          Showing {startIndex + 1} to {endIndex} of {totalItems} results
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Icon icon="mdi:chevron-left" width="20" height="20" />
          </button>
          {generatePaginationNumbers().map((page, index) => (
            <button
              key={index}
              className={`pagination-button ${
                page === currentPage ? "active" : ""
              }`}
              onClick={() =>
                typeof page === "number" ? onPageChange(page) : null
              }
              disabled={typeof page !== "number"}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Icon icon="mdi:chevron-right" width="20" height="20" />
          </button>
        </div>
      </div>
    </GridContainer>
  );
};
const GridContainer = styled.div`
  background-color: white;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;

  .grid-table {
    display: flex;
    flex-direction: column;
    min-width: max-content; /* Ensures table doesn't shrink */
  }

  .grid-header {
    display: flex;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
    /* width: fit-content; */
  }

  .grid-body {
    background-color: white;
  }

  .grid-row {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    /* width: fit-content; */
    /* margin-bottom: 8px; */

    &:hover {
      /* background-color: #f9f9f9; */
    }
  }

  .grid-cell {
    
    padding: 12px 16px;
    display: flex;
    align-items: center;
    /* white-space: nowrap; */
    /* overflow: hidden; */
    text-overflow: ellipsis;
    box-sizing: border-box;
    text-align: center;
    /* background: red; */
    /* width: 1rem; */
    color: #000;
    justify-content: center;
    font-size: 12.4px;
    /* width: 30rem; */
  }

  .grid-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #f9f9f9;
  }

  .pagination-info {
    font-size: 14px;
    color: #666;
  }

  .pagination-controls {
    display: flex;
    gap: 8px;
  }

  .pagination-button {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #fff;
    color: #666;
    border: 1px solid #d9d9d9;

    &.active {
      background: #0066cc;
      color: #fff;
      border: 1px solid #0066cc;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .status-cell {
  width: 130px;
  flex: 0 0 130px !important;
  max-width: 130px !important;
  min-width: 130px  !important;
  width: 20px !important;
}

`;

CustomGrid.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      render: PropTypes.func,
      width: PropTypes.string, // Optional width property for column
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomGrid;
