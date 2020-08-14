import React, { Component } from "react";

export default class Item extends Component {
  render() {
    const { datai } = this.props;
    return <b> {this.props.datai} </b>;
  }
}
