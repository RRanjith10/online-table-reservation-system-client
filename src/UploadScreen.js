import React, { Component } from 'react';
import axios from 'axios';
import VirtualizedSelect from 'react-virtualized-select';
import HotelList from './HotelList';
import ButtonAppBar from './AppBar';
import './App.css';
var apiBaseUrl = "http://localhost:8200";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options:[],
            hotelList:[]
        }
    }
    
    componentWillMount() {
        let self = this;
        axios.get(apiBaseUrl + '/getHotels')
            .then(function (response) {
                let options = response.data.map(i => {return {name:i}});
                console.log(options)
                self.setState({options})
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    updateValue (newValue) {
		this.setState({
			selectValue: newValue
        });
        let self = this;
        axios.get(apiBaseUrl + '/searchHotels/'+newValue)
        .then(function (response) {
            console.log(response.data)
            self.setState({hotelList:response.data.hotelList})
        })
        .catch(function (error) {
            console.log(error);
        });
	}
    render() {
        const {options,hotelList} = this.state;
        return (            
            <div>
            <ButtonAppBar/>
            <div className="section">
                {options.length !== 0 ?<VirtualizedSelect ref="citySelect"
                    options={options}
                    simpleValue
                    clearable
                    name="select-city"
                    value={this.state.selectValue}
                    onChange={(newValue)=> this.updateValue(newValue)}
                    searchable
                    labelKey="name"
                    valueKey="name"
                />:null}
                <div className="hint">
            </div>
            {hotelList.length!== 0 && <HotelList email={this.props.email} username={this.props.username} hotelList={hotelList}/>}
            </div>            
            </div>
        );
    }
}

export default Login;
