import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap-grid.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import ToDo from "./components/ToDo";
import About from "./components/About";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "React Assignment (Mid Term Test)",
      act: 0,
      index: "",
      cindex: "",
      datas: [],
      completes: [],
    };
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  Submit = (e) => {
    e.preventDefault();
    console.log("try");

    let datas = this.state.datas;
    let name = this.refs.name.value;

    if (this.state.act === 0) {
      let data = {
        name,
      };
      datas.push(data);
    } else {
      let index = this.state.index;
      datas[index].name = name;
    }

    this.setState({
      datas: datas,
      act: 0,
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  Remove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas,
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  Edit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.setState({
      act: 1,
      index: i,
    });

    this.refs.name.focus();
  };

  Complete = (i) => {
    let data = this.state.datas[i];
    let datas = this.state.datas;
    this.refs.name.value = data.name;
    let completes = this.state.completes;
    completes.push(data);

    datas.splice(i, 1);
    this.setState({
      datas: datas,
    });
    this.refs.myForm.reset();

    this.refs.name.focus();
  };

  ComRemove = (i) => {
    let completes = this.state.completes;
    completes.splice(i, 1);
    this.setState({
      completes: completes,
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  render() {
    let datas = this.state.datas;
    let completes = this.state.completes;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <div className="container">
          <div class="card border-secondary bg- blue darken-2">
            <div className="col bg- purple lighten-3">
              <Router>
                <br></br>
                <div class="card bg- purple lighten-5 border-secondary">
                  <div class="card-header bg- purple lighten-1">
                    <ul class="nav nav-tabs card-header-tabs">
                      <li class="nav-item ">
                        <Link to={"/todo"} className="nav-link">
                          <font color="white">ToDo</font>
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link to={"/about"} className="nav-link">
                          <font color="white">About Me</font>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <switch>
                      <Route exact path="/" component={ToDo} />
                      <Route exact path="/todo" component={ToDo} />
                      <Route exact path="/about" component={About} />
                    </switch>
                  </div>
                </div>
              </Router>
              <br></br>
              <div className="container">
                <div class="row">
                  <div class="col-md-5">
                    <h2 align="left">Add Item</h2>
                    <form ref="myForm" className="">
                      <input
                        type="text"
                        ref="name"
                        placeholder="Enter item name"
                        className="formField"
                        maxLength="15"
                        required
                      />
                      <p align="left">
                        <button onClick={this.Submit} class="button button2">
                          <i class="fa fa-star fa-spin fa-lg"></i>&nbsp; submit
                          &nbsp;
                        </button>
                      </p>
                    </form>
                  </div>

                  <div class="col">
                    <h2 align="left">Items List</h2>
                    <pre align="screenLeft">
                      {datas.map((data, i) => (
                        <table
                          bgcolor="#EDE8F4"
                          border="1"
                          width="100%"
                          align="center"
                        >
                          <tr key={i} className="myList">
                            <td width="5%">{i + 1}</td>
                            <td>
                              <b> {data.name}</b>
                            </td>
                            <td width="30%">
                              <button
                                onClick={() => this.Complete(i)}
                                className="btn btn-primary btn-sm"
                              >
                                <i class="fa fa-check"></i>
                              </button>
                              <button
                                onClick={() => this.Edit(i)}
                                className="btn btn-success btn-sm"
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              <button
                                onClick={() => this.Remove(i)}
                                className="btn btn-danger btn-sm"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </table>
                      ))}
                    </pre>

                    <h2 align="left">Complete Items List</h2>
                    <pre align="screenLeft">
                      {completes.map((data, i) => (
                        <table
                          bgcolor="#A7D1D6"
                          border="1"
                          width="100%"
                          align="center"
                        >
                          <tr key={i} className="myList">
                            <td width="5%">{i + 1}</td>
                            <td>
                              <b> {data.name}</b>
                            </td>
                            <td width="30%">
                              <button
                                onClick={() => this.ComRemove(i)}
                                className="btn btn-danger btn-sm"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </table>
                      ))}
                    </pre>
                  </div>
                </div>
              </div>
              <br></br>
              <br></br>
            </div>
            <br></br>
            <br></br>
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default App;
