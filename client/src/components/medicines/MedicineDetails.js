import * as PropTypes from "prop-types";
import React from "react";

export function MedicineDetails(props) {
  return (
    <>
      <div className="input-field col s12">
        <input
          onChange={props.onChange}
          value={props.name}
          id="name"
          type="text"
        />
        <label htmlFor="name">Medicine Name</label>
      </div>
      <div className="input-field col s12">
        <input
          onChange={props.onChange}
          value={props.type}
          id="type"
          type="text"
        />
        <label htmlFor="type">Medicine Type</label>
      </div>
      <div className="input-field col s12">
        <input
          onChange={props.onChange}
          value={props.description}
          id="description"
          type="text"
        />
        <label htmlFor="description">Medicine Description</label>
      </div>
    </>
  );
}

MedicineDetails.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.any,
  type: PropTypes.any,
  description: PropTypes.any
};
