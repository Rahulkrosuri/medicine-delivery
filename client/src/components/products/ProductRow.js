import * as PropTypes from "prop-types";
import React from "react";

export function ProductRow(props) {
  return (
    <tr>
      <td>
        <input onChange={props.onNameChange} value={props.name} type="text" />
      </td>
      <td>
        <input
          onChange={props.onPriceChange}
          value={props.price}
          type="number"
        />
      </td>
      <td>
        <input
          onChange={props.onCategoryChange}
          value={props.category}
          type="text"
        />
      </td>
      <td>
        <input
          onChange={props.onDescriptionChange}
          value={props.description}
          type="text"
        />
      </td>
      {props.products.length > 1 && (
        <td>
          <i
            style={{ color: "indianred", cursor: "pointer" }}
            className="material-icons"
            onClick={props.onDelete}
          >
            delete
          </i>
        </td>
      )}
    </tr>
  );
}

ProductRow.propTypes = {
  onNameChange: PropTypes.func,
  name: PropTypes.any,
  onPriceChange: PropTypes.func,
  price: PropTypes.any,
  onCategoryChange: PropTypes.func,
  category: PropTypes.any,
  onDescriptionChange: PropTypes.func,
  description: PropTypes.any,
  products: PropTypes.any,
  onDelete: PropTypes.func
};
