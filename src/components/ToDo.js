import React, {Component} from 'react';
export default class ToDo extends Component{
    render() {
        return(
            <div class="row">
                <div class="col-md-5">
                <img src="./logo.png" width="25%" />
                </div>
                <div class="col-md-5">
            <h1><font color="#0F0B2E">TODO APP</font></h1>
            <p>This application can add item to list and also can edit delete item from list. 
                Items can add complite items table.
            </p>
            </div></div>
        )
    }
}