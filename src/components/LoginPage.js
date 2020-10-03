import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import { CardHeader, CardMedia, CardContent, Typography, FormControl, InputLabel, Select, StylesProvider, MenuItem, Button } from '@material-ui/core';
import logo from '../resources/logo192.png';
import { setLoginUser } from '../actions/loginUser';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {
    state = {
        selectedUser: ''
    }

    handleChange = (event) => {
        this.setState({
            selectedUser: event.target.value
        });
    }

    handleSignInClick = () => {
        const {dispatch, location} = this.props;
        const path = location.pathname === '/signin' ? '/' : location.pathname;
        dispatch(setLoginUser(this.state.selectedUser));
        this.props.history.push(path);
    }
    render() {
        const {users} = this.props;
        return (
            <StylesProvider injectFirst>
            <Card className='login-card' variant="outlined">
                <CardHeader
                    title='Welcome to the Would You Rather App!'
                    subheader='Please sign in to continue'
                    align='center'
                />
                <CardMedia
                    component="img"
                    image={logo}
                    title='Would You Rather'
                    align='center'
                    style={{height: '50%', width: '50%', margin: 'auto'}}
                />
                <CardContent>
                    <div>
                        <Typography variant='h4' align='center'>
                            Sign in
                        </Typography>
                        <FormControl variant='outlined' className='form-control'>
                            <InputLabel id='login-user-label'>Login User</InputLabel>
                            <Select
                                labelId='login-user-label'
                                id='login-user-select'
                                value={this.state.selectedUser}
                                onChange={this.handleChange}
                                label='Age'
                            >
                            {Object.keys(users).length !== 0 &&
                                Object.keys(users).map((key) => (
                                    <MenuItem key={key} value={users[key].id}>{users[key].name}</MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>
                        <Button 
                            variant='contained' 
                            color='primary' 
                            className='sign-in-button'
                            onClick={this.handleSignInClick }>
                            Sign In
                        </Button>
                    </div>
                </CardContent>
            </Card>
            </StylesProvider>
        )
    }
}

function mapStateToProps ({users}) {
    return {
        users
    }
}
export default withRouter(connect(mapStateToProps)(LoginPage))