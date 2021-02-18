import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Loader } from "../Loader";
import { pick } from "lodash";
import { ProductRow } from "../products/ProductRow";
import { MedicineDetails } from "./MedicineDetails";
import { ProductTable } from "../products/ProductTable";

class CreateMedicine extends Component {
  state = { userInfo: {}, _products: [{ name: "", price: 0, description: "" }] };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await axios("/api/users");
    this.setState({ userInfo: response.data, loading: false });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onAdd = () => {
    const { _products } = this.state;
    this.setState({
      _products: [..._products, { name: "", price: 0, description: "" }]
    });
  };

  onDelete = index => {
    const { _products } = this.state;
    this.setState({
      _products: [..._products.slice(0, index), ..._products.slice(index + 1)]
    });
  };

  onRowDataChange = (e, field, index) => {
    const products = [...this.state._products];
    this.setState({
      _products: [
        ...products.slice(0, index),
        { ...products[index], [field]: e.target.value },
        ...products.slice(index + 1)
      ]
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      await axios.post(
        "/api/medicines",
        pick(this.state, ["name", "type", "description", "_products"])
      );
      alert(`Medicine ${this.state.name} successfully created.`);
      this.props.history.push("/medicines");
    } catch (e) {
      this.setState({ loading: false });
      alert("Medicine creation failed");
    }
  };

  render() {
    const { name, type, description, userInfo, _products, loading } = this.state;
    if (loading) return <Loader />;
    if (userInfo.role !== "manager") return "You are not authorized.";
    return (
      <div className="container">
        <div className="row">
          <form noValidate onSubmit={this.onSubmit}>
            <MedicineDetails
              onChange={this.onChange}
              name={name}
              type={type}
              description={description}
            />
            <h3>Products</h3>
            <ProductTable
              products={_products}
              render={(product, index) => {
                const { price, description: productDesc, name: productName, category: productCategory } = product;
                return (
                  <ProductRow
                    key={index}
                    onNameChange={e => this.onRowDataChange(e, "name", index)}
                    name={productName}
                    onCategoryChange= {e => this.onRowDataChange(e, "category", index)}
                    category={productCategory}
                    onPriceChange={e => this.onRowDataChange(e, "price", index)}
                    price={price}
                    onDescriptionChange={e =>
                      this.onRowDataChange(e, "description", index)
                    }
                    description={productDesc}
                    products={_products}
                    onDelete={() => this.onDelete(index)}
                  />
                );
              }}
            />
            <a
              onClick={this.onAdd}
              className="btn-floating btn-large waves-effect waves-light red"
            >
              <i className="material-icons">add</i>
            </a>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Upload Medicine
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CreateMedicine);
