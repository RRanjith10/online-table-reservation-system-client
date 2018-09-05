import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import UploadScreen from './UploadScreen'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    handleClick(event) {
        var apiBaseUrl = "http://localhost:8100/login";
        var self = this;
        var payload = {
            "emailId": this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl , payload)
            .then(function (response) {
                console.log(response);
                if (response.data.loginSuccessful) {
                    console.log("Login successfull");
                    var uploadScreen = [];
                    uploadScreen.push(<UploadScreen username={response.data.username} email={response.data.email} appContext={self.props.appContext} />)
                    self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
                }
                else {
                    console.log("Username password do not match");
                    alert(response.data.message)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                    </div>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Login;