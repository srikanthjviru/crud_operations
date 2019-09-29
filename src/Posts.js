import React, { Component } from "react";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "",
      subtitle: "",
      description: "",
      price: "",
      age: "",
      keywords: "",
      addedProduct: []
    };
  }
  getS(x) {
    fetch("http://localhost:4000/api/posts/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(x)
    })
      .then(res => res.json())
      .then(data =>
        this.setState({
          _id: Math.floor(Math.random() * 100),
          addedProduct: [...this.state.addedProduct, data]
        })
      );
  }

  handleChange = e => {
    const name = e.target.name;
    // console.log(e.target.value);
    this.setState({
      [name]: e.target.value
    });
  };

  handleSubmit = e => {
    // e.preventDefault();
    // console.log(this.state);
    this.getS(this.state);
  };
  render() {
    console.log("AddedProduct", this.state.addedProduct);
    return (
      <div>
        <form className="container" onSubmit={this.handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="text"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>SubTitle</label>
            <input
              type="text"
              name="subtitle"
              value={this.state.subtitle}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>KeyWords</label>
            <input
              type="text"
              name="keywords"
              value={this.state.keywords}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="button"
            onClick={this.handleSubmit}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
        {this.state.addedProduct ? (
          <div>{this.state.addedProduct.title}</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
