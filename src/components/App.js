import React, { Component } from "react";

import "../styles/App.css";

class App extends Component {
  state = {
    products: [],
    product: { name: "some_product", price: 20 }
  };

  componentDidMount() {
    setInterval(() => {
      this.getProducts();
    }, 5000);
  }
  getProducts = _ => {
    fetch("http://localhost:4000/products")
      .then(response => response.json())
      .then(response => this.setState({ products: response.data }))
      .catch(err => console.error(err));
  };

  renderProduct = product => (
    <div key={product.productCode} className="tableRow">
      <div className="tableColumn">{product.productName}</div>
      <div className="tableColumn">{product.buyPrice}</div>
    </div>
  );

  addProduct = _ => {
    const { product } = this.state;
    fetch(
      `http://localhost:4000/products/add?name=${product.name}&price=${
        product.price
      }`
    )
      .then(this.getProducts)
      .catch(err => console.error(err));
  };

  render() {
    const { products, product } = this.state;
    return (
      <div>
        <h1>My React App!</h1>
        {products.map(this.renderProduct)}
        <div>
          <input
            value={product.name}
            onChange={e =>
              this.setState({ product: { ...product, name: e.target.value } })
            }
          />
          <input
            value={product.price}
            onChange={e =>
              this.setState({ product: { ...product, price: e.target.value } })
            }
          />
          <button onClick={this.addProduct}>Add Product</button>
        </div>
      </div>
    );
  }
}

export default App;
