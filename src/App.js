import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap-grid.css';
import {BrowserRouter as Router,Switch,Route, Link} from 'react-router-dom';
import './App.css';
import ToDo from './components/ToDo';
import About from './components/About';
import { v4 as uuidv4 } from 'uuid';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Item from "../src/components/Item";

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'React Assignment (Mid Term Test)',
      act: 0,
      index: '',
      //id: uuidv4,
      cindex: '',
      datas: [],
      //edit: false,
      completes: []
    }
  }


  componentDidMount(){
    this.refs.name.focus();
  }


  Submit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;

    if(this.state.act === 0){
      let data = {
        name,
        complete: false
      }
      datas.unshift(data);
      NotificationManager.success('', 'Item Added');
    }else{
      let index = this.state.index;
      datas[index].name = name;
      NotificationManager.warning('', 'Item Edited');
    }

    this.setState({
      datas: datas,
      act: 0
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
  }


  Remove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });
    NotificationManager.error('', 'Item Deleted');
    this.refs.myForm.reset();
    this.refs.name.focus();
  }


  Edit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.setState({
      act: 1,
      index: i
    });
    this.refs.name.focus();
  }


  Complete = (i) => {
    let datas = this.state.datas;
    let data = this.state.datas[i];
    
    this.refs.name.value = data.name;
    let completes = this.state.completes;

    
//      let name = data.name;
//      let newd = {
//        name : name,
//        complete: true
//      }
// console.log(newd);
   
    completes.push(data);

    datas.splice(i,1);
    this.setState({
      datas: datas
    });
    // datas.push(newd);
    NotificationManager.info('', 'Item Completed');
    this.refs.myForm.reset();

    this.refs.name.focus();
  }

  
  ComRemove = (i) => {
    let completes = this.state.completes;
    completes.splice(i,1);
    this.setState({
      completes: completes
    });
    NotificationManager.error('', 'Item Deleted');
    this.refs.myForm.reset();
    this.refs.name.focus();
  }
  

  render() {
    let datas =this.state.datas;
    let completes=this.state.completes;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <div className="container">
         <div class="card border-secondary bg- blue darken-2" >
          <div className="col bg- purple lighten-3">
            <Router>
        
              <br/>
                <div class="card bg- purple lighten-5 border-secondary">
                  <div class="card-header bg- purple lighten-1">

                    <ul class="nav nav-tabs card-header-tabs">
                      <li class="nav-item ">
                        <Link to={'/todo'} className="nav-link"><font color="white">ToDo</font></Link>
                      </li>
                      <li class="nav-item">
                        <Link to={'/about'} className="nav-link"><font color="white">About Me</font></Link>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <switch>
                      <Route exact path = '/' component = {ToDo}/>
                      <Route exact path = '/todo' component = {ToDo}/>
                      <Route exact path = '/about' component = {About}/>
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
                  <input type="text" ref="name" placeholder="Enter item name" className="formField" maxLength="15" required />
                  <p align="left">
                  <button onClick={this.Submit} class="button button2"><i class="fa fa-star fa-spin fa-lg"></i>&nbsp; submit &nbsp;</button>
                  </p>
                </form>
              </div>
            <div class="col">
              <h2 align="left">Items List</h2>
                <pre align="screenLeft">
                <table bgcolor="#EDE8F4" border = "1" width = "100%" align ="center">
          {       datas.map((data, i) => 
                  <tr key={i} className="myList">
                    {/* <td width = "5%">{i+1}</td> */}
                    <td><Item datai={data.name} /></td>
                    <td width = "30%">
                    <button onClick={()=>this.Complete(i)} className="btn btn-primary btn-sm"><i class="fa fa-check"></i></button>
                    <button onClick={()=>this.Edit(i)} className="btn btn-success btn-sm"><i class="fa fa-edit"></i></button>
                    <button onClick={()=>this.Remove(i)} className="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button></td>
                  </tr>
          )}
          
          {completes.map((data, i) => 
            <tr key={i} className="myList">
              {/* <td width = "5%">{i+1}</td> */}
              <td><strike> <Item datai={data.name} /> </strike></td>
              <td width = "30%">
              <button onClick={()=>this.ComRemove(i)} className="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button></td>
            </tr>
          )}  
</table>
</pre>
              </div>
            </div>
           </div><br></br><br></br>
         </div><br></br><br></br>
        </div>
      </div><br></br><br></br>
      <NotificationContainer/>
      </div>
    );
  }
}

export default App;