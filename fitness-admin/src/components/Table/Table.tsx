import React from 'react';

export interface Column {
  title: string;
  id?: string;
}

export interface Cell {
  value: React.ReactNode;
}

export interface Row {
  data: Cell[];
}

interface propData {
  Header: boolean;
  HeaderList: Column[];
  Checkbox: boolean;
  rows: Row[];
}

const Table = (props: propData) => {
  return (
    <table className="table table-hover align-middle mb-0 border-0">
      {props.Header && (
        <thead className="bg-light">
          <tr>
            {props.Checkbox && (
              <th scope="col" className="border-0">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="checkAll" />
                </div>
              </th>
            )}
            {props.HeaderList.map((col, i) => (
              <th scope="col" key={i} className="border-0 fw-semibold">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {props.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {props.Checkbox && (
              <td className="border-0">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`checkbox-${rowIndex}`}
                  />
                </div>
              </td>
            )}
            {row.data.map((cell, cellIndex) => (
              <td key={cellIndex} className="border-0">
                {cell.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
