import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import check from './check.svg'

var apiBaseUrl = "http://localhost:8400";

class AlertDialog extends React.Component {
  state = {
    open: false,
    payment: false,
    message:'',
    paymentSuccess:false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose =() =>{
    this.setState({ open: false,
      payment: false,
      message:'',
      paymentSuccess:false });

  }
  Payment = () => {
    console.log(this.props);
    let self = this;
    axios.post(apiBaseUrl + '/pay', {
      hotelName: this.props.data.hname,
      mailId: this.props.email,
      userName: this.props.username,
      tableSelected: this.props.table,
      menuSelected: this.props.tableData.map(item => item.label),
      totalAmount: this.props.total,
      noOfPerson: this.props.noOfPersone,
      cardNumber: this.state.cardNumber,
      cvv: this.state.cvv,
    })
      .then(function (response) {
        console.log(self.state)
        console.log(response.data.paymentSuccess)

        self.setState({ payment: true ,paymentSuccess:response.data.paymentSuccess,message:response.data.message})
      })
      .catch(function (error) {
      });
  };

  render() {
    console.log(this.state)
    return (
      <div>
        
        <Button onClick={this.handleClickOpen}>{this.props.label}</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Make payment"}</DialogTitle>
          {
            this.state.payment ? <DialogContent>
              <p>{this.state.message}</p>
              {this.state.paymentSuccess ? <img style = {{width: '100px',position: 'relative',left: '32%'}} src={check}/>:null}
            </DialogContent>
              :
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <TextField
                    required
                    id="required"
                    label="Required"
                    defaultValue="Card Number"
                    margin="normal"
                    value={this.state.cardNumber}
                    onChange={(e) => this.setState({ cardNumber: e.target.value })}
                  />
                  <TextField
                    required
                    id="required"
                    label="Required"
                    defaultValue="cvv"
                    margin="normal"
                    value={this.state.cvv}
                    onChange={(e) => this.setState({ cvv: e.target.value })}
                  />
                </DialogContentText>
              </DialogContent>
          }

          <DialogActions>
            {
              this.state.payment ? 
              <Button onClick={this.handleClose} color="primary" autoFocus>
                  Close
              </Button>
                :
                <Button onClick={this.Payment} color="primary" autoFocus>
                  Pay
              </Button>
            }

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;