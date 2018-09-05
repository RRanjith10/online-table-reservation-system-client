import React, { Component } from 'react';
import axios from 'axios';
import VirtualizedSelect from 'react-virtualized-select';
import Hotel from './Hotel'
var apiBaseUrl = "http://localhost:8200";



class HotelList  extends Component {

    componentWillMount() {
       
    }
    updateValue (newValue) {
		
	}
    render() {
        let {hotelList,username,email} = this.props;
        let hotel = hotelList.map((item, i) => <Hotel key={i} email={email} username={username} data = {item}/>)
        return (
            <div>
                {hotel}
            </div>
        );
    }
}

export default HotelList;
