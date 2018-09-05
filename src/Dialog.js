import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Table from './Table'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import CardDetail from './CardDetail'
import axios from 'axios';

var apiBaseUrl = "http://localhost:8200";
const tableArr = [
    {
        value: 'Table II 4 Seats',
        label: 'Table II 4 Seats',
    },
    {
        value: 'Table I 4 Seats',
        label: 'Table I 4 Seats',
    },
    {
        value: 'Table III 4 Seats',
        label: 'Table III 4 Seats',
    }
];
const menu = [
    {
        value: 200,
        label: 'Dosa',
    },
    {
        value: 100,
        label: 'Butter Chicken',
    },
    {
        value: 202,
        label: 'Chole Bhature',
    },
    {
        value: 300,
        label: 'Nihari',
    },
];
const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 200,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    state = {
        open: false,
        tableData:[],
        total:0,
        menuList:[]
    };
    componentDidMount() {
        let self = this;
        console.log(this.props)
        axios.get(apiBaseUrl + '/viewHotel/'+this.props.data.hid)
            .then(function (response) {
              console.log('Response', response)
              self.setState({ menuList:response.data.menuList})
            })
            .catch(function (error) {
            });
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    makelist = (n,e) =>{
        let tableData = this.state.tableData;
        tableData.find(item => item.value === n.value).quantity = e.target.value;
        let total = tableData.reduce( (acc,cur) => {
            return (acc + (cur.value * cur.quantity))
        },0)
        this.setState({tableData,total})
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        let {menuList} = this.state
        if(name === 'menu'){
            let tableData = this.state.tableData;
            console.log('ItemMenuName', ...menuList.find(item => item.menuName))
            console.log('EventMenuName', event.target)
            tableData.push({quantity:0,...menuList.find(item => item.menuName === event.target.menuName)})
            this.setState({tableData})
            console.log('HandleChange', tableData)
        }
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const { classes,data,username,email} = this.props;
        const { tableData,total,table,noOfPersons,menuList} = this.state;

        console.log(this.state)
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Book</Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Book
              </Typography>
              <CardDetail email={email} username={username} noOfPersons ={noOfPersons} data={data} table={table} tableData={tableData} total={total} label={`Pay ${this.state.total}`} />
             
                        </Toolbar>
                    </AppBar>
                    <div>
                    <TextField
                            id="select-currency"
                            select
                            className={classes.textField}
                            value={this.state.table}
                            onChange={this.handleChange('table')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Select Table"
                            margin="normal"
                        >
                            {tableArr.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="search"
                            label="numberOfPersons"
                            className={classes.textField}
                            value={this.state.noOfPersons}
                            onChange={this.handleChange('noOfPersons')}
                            margin="normal"

                        />
                                  <TextField
                            id="select-currency"
                            select
                            className={classes.textField}
                            value={this.state.menu}
                            onChange={this.handleChange('menu')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Select from menu"
                            margin="normal"
                        >
                            {menuList.map(option => (
                                <MenuItem key={option.menuRate} value={option.menuRate}>
                                    {option.menuName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                   <Table makelist ={(n,e)=> this.makelist(n,e)} data={this.state.tableData}/>
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);