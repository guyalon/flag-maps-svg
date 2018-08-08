import React, { Component } from "react";
import "./app.css";
import CountryFlag from './CountryFlag';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { username: null,svgs:props.svgs };
        console.log("constructor",this.state);
    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps",nextProps);
          this.setState(function(){
            return {svgs:nextProps.svgs}
          });
    }

  render() {
      var rows = [];

      if (this.state && this.state.svgs) {
          this.state.svgs.map(function (svg,index) {
              rows.push(<CountryFlag svg={svg} key={index}/>)
          });
      }

    return (
      <div>
        {this.state.svgs.length ? (
            [rows]
        ) : (
          <h1>Loading.. please wait!</h1>
        )}

          <div className={'clear'}></div>
      </div>
    );
  }
}




