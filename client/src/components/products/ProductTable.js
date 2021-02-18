import * as PropTypes from "prop-types";
import React from "react";

export function ProductTable(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>{props.products.map(props.render)}</tbody>
    </table>
  );
}

ProductTable.propTypes = {
  products: PropTypes.any,
  render: PropTypes.func
};
