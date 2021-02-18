import React, { Component } from "react";
import axios from "axios";

import { Loader } from "../Loader";
import { MedicineCard } from "./MedicineCard";

class Medicines extends Component {
  state = { medicine: [], loading: false };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const response = await axios("/api/medicines");
      this.setState({ medicine: response.data, loading: false });
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, medicine } = this.state;

    if (medicine.length === 0 && !loading)
      return <div className="center">No such medicines Found.</div>;

    return (
      <div className="container" style={{ width: "100%" }}>
        <div className="row">
          <div className="landing-copy col s12 center-align">
            {loading ? (
              <Loader />
            ) : (
              <div className="row">
                {medicine.map(rest => (
                  <MedicineCard key={rest._id} rest={rest} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Medicines;
