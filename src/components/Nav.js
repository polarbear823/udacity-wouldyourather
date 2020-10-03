import { Paper, Tabs, Tab, StylesProvider, Avatar, Button } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { setLoginUser } from '../actions/loginUser';

class Nav extends Component {
    state = {
        value: 0
    }
    handleTabChange = (e, newValue) => {
        this.setState({
            value: newValue
        });
        switch (newValue) {
            case 0:
                this.props.history.push('/');
                break;
            case 1:
                this.props.history.push('/add');
                break;
            case 2:
                this.props.history.push('/leaderboard');
                break;       
            default:
                break;
        }     
    }

    onLogoutClicked = () => {
        const {dispatch} = this.props;
        this.props.history.push('/signin');
        dispatch(setLoginUser(null));
    }

    componentDidMount() {
        const {location} = this.props;
        let tabValue = 0;
        switch (location.pathname) {
            case '/':
                tabValue = 0
                break;
            case '/add':
                tabValue = 1;
                break;
            case '/leaderboard':
                tabValue = 2
                break;       
            default:
                break;
        }     
        this.setState({
            value: tabValue
        })
    }

    render() {
        const {value} = this.state;
        const {loginUser, loginUserInfo} = this.props;
        return (
            <StylesProvider injectFirst>
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor='primary'
                        textColor='primary'
                        onChange={this.handleTabChange}
                        className='nav-tabs'
                    >
                        <Tab label='Home' value={0}/>
                        <Tab label='New Question' value={1}/>
                        <Tab label='Leader Board' value={2}/>
                    </Tabs>
                    {loginUser !== null &&
                        <div className='user-nav-container'>
                            <span>{loginUserInfo.name}</span>
                            <Avatar alt='user avatar' src={loginUserInfo.avatarURL} className='nav-avatar'/>
                            <Button color="primary" onClick={this.onLogoutClicked}>Logout</Button>
                        </div>
                    }
                </Paper>
            </StylesProvider>
        )
    }
}
function mapStateToProps({loginUser, users}) {
    const loginUserInfo = users[loginUser];
    return {
        loginUser,
        loginUserInfo
    }
}
export default withRouter(connect(mapStateToProps)(Nav));