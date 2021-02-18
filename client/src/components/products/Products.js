import React, { Component } from "react";
import get from "lodash/get";
import axios from "axios";

import { Loader } from "../Loader";
import { ProductCard } from "./ProductCard";
import { OrderFooter } from "./OrderFooter";

class Products extends Component {
  state = { products: [], loading: false, submitting: false };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const response = await axios(`/api/medicines/${this.medicineId}`);
      this.setState({ products: response.data._products, loading: false });
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  }

  onIncrement = index => {
    const { products } = this.state;
    const { total } = products[index];
    this.setState({
      products: [
        ...products.slice(0, index),
        { ...products[index], total: (total || 0) + 1 },
        ...products.slice(index + 1)
      ]
    });
  };

  onDecrement = index => {
    const { products } = this.state;
    const { total } = products[index];
    if (!total) return;
    this.setState({
      products: [
        ...products.slice(0, index),
        { ...products[index], total: total - 1 },
        ...products.slice(index + 1)
      ]
    });
  };

  handleSubmit = async () => {
    const payload = {
      total_amount: this.orderTotal,
      _medicine: this.medicineId,
      _products: []
    };
    this.state.products.forEach(product => {
      if (product.total) payload._products.push(product._id);
    });
    this.setState({ submitting: true });
    try {
      await axios.post("/api/orders", payload);
      const { push } = this.props.history;
      push("/orders");
    } catch (e) {
      this.setState({ submitting: false });
      console.error(e);
    }
  };

  get medicineId() {
    return get(this.props.match, "params.id");
  }

  get orderTotal() {
    return this.state.products.reduce((total, product) => {
      return total + product.price * (product.total || 0);
    }, 0);
  }

  render() {
    const { loading, products, submitting } = this.state;

    if (products.length === 0 && !loading)
      return <div className="center">No such products Found.</div>;

    return (
      <div className="container">
        <div className="row">
          {loading ? (
            <Loader />
          ) : (
            <footer className="page-footer">
              <div className="container">
                <div className="row">
                  {(products || []).map((product, index) => (
                    <ProductCard
                      key={get(product, "name")}
                      product={product}
                      onItemAdd={() => this.onIncrement(index)}
                      onItemRemove={() => this.onDecrement(index)}
                    />
                  ))}
                </div>
                <OrderFooter
                  orderTotal={this.orderTotal}
                  disabled={submitting}
                  onSubmit={this.handleSubmit}
                />
              </div>
            </footer>
          )}
        </div>
      </div>
    );
  }
}

export default Products;
