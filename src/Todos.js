import React, { Component } from "react";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      complete: false,
      title: "",
      todos: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:4000/api/get/todos")
      .then(res => res.json())
      .then(data =>
        this.setState({
          todos: data
        })
      );
  }
  saveTodo(x) {
    console.log("XXXX", x);
    fetch("http://localhost:4000/api/add/todo", {
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
          // _id: Math.floor(Math.random() * 100),
          todos: [...this.state.todos, { ...data }],
          todo: "",
          complete: false
        })
      );
  }
  deleteTodo(id) {
    console.log("ID", id);
    fetch(`http://localhost:4000/api/delete/${id}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: id })
    })
      .then(res => res.json())
      .then(
        data =>
          this.setState({
            todos: this.state.todos.filter(item => item._id !== data.post._id)
          })
        // console.log("DATA AFTER DELETE", this.state.todos, data.post._id)
      )
      .catch(err => console.log(`cant delete error`, err));
  }

  handleChange = e => {
    const name = e.target.name;
    // console.log(e.target.value);
    this.setState({
      [name]: e.target.value
    });
  };

  handleSubmit = e => {
    this.saveTodo({ todo: this.state.todo, complete: this.state.complete });
    // this.setState({
    //   todos: [...this.state.todos, this.state.todo],
    //   todo: ""
    // });
  };
  handeEdit = (e, todo) => {
    this.deleteTodo(todo._id);
    this.setState({ todo: todo.todo, complete: true });
  };
  render() {
    console.log("AddedProduct", this.state.todos);
    return (
      <div style={{ margin: 30 }}>
        <div class="input-group max-auto">
          <input
            type="text"
            name="todo"
            value={this.state.todo}
            onChange={this.handleChange}
            class="form-control"
            placeholder="Enter a todo item"
            style={{ width: 400 }}
            //   aria-label="Username"
            //   aria-describedby="basic-addon1"
          />
          <button
            class={this.state.complete ? "btn btn-success" : "btn btn-primary"}
            type="button"
            onClick={this.handleSubmit}
            //   id="basic-addon1"
          >
            {this.state.complete ? "Edit Todo" : "Add Todo"}
          </button>
        </div>
        <div
          style={{
            color: "orange",
            fontFamily: "cursive",
            fontSize: 40,
            fontWeight: "bold",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          Saved TodoList
        </div>
        <div>
          {this.state.todos.map(todo => (
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-start">
                {todo.todo}
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={e => this.handeEdit(e, todo)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => this.deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}
