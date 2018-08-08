import React, { Component } from "react";


export default class CountryFlag extends Component {
    constructor(props) {
        super(props);
        this.state = { svg: props.svg};
    }
    render() {
        return (
            <div className={'flag-svg'} dangerouslySetInnerHTML={{__html: this.state.svg.outerHTML}}>
            </div>);
    }
}
