import { Card, StylesProvider, CardMedia, CardContent, Typography, TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoardPage extends Component {
    renderLeaderCard = (user) => {
        const totalPoints = Object.keys(user.answers).length +
            user.questions.length;
        return (
            <StylesProvider injectFirst key={user.id}>
                <Card className='question-card'>
                    <div className='question-card-detail'>
                        <CardMedia
                            className='card-avatar'
                            image={user.avatarURL}
                            title='User Avatar'
                        />
                        <CardContent className='board-table'>
                            <div>
                            <Typography component='h5' variant='h5'>
                                {user.name}
                            </Typography>
                            <div  className='board-table-div'>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow key='answeredQuestion'>
                                            <TableCell component="th" scope="row">
                                                Answered Questions
                                            </TableCell>
                                            <TableCell align="right">{Object.keys(user.answers).length}</TableCell>
                                        </TableRow>
                                        <TableRow key='createdQuestions'>
                                            <TableCell component="th" scope="row">
                                                Created Questions
                                            </TableCell>
                                            <TableCell align="right">{user.questions.length}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Paper variant="outlined" className='score-board'>
                                <Typography variant='h6' className='score-header'>Score</Typography>
                                <Typography variant='h6'>{totalPoints}</Typography>
                            </Paper>
                            </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </StylesProvider>
        )
    }

    render() {
        const {users} = this.props;
        const sortedUserIdsByPoints = Object.keys(users)
        sortedUserIdsByPoints.sort((keyA, keyB) => {
            const userAPoints = Object.keys(users[keyA].answers).length +
                users[keyA].questions.length;
            const userBPoints = Object.keys(users[keyB].answers).length +
                users[keyB].questions.length;
            return userBPoints - userAPoints;
        });
        return(
            <div className='leader-board-container'>
                {sortedUserIdsByPoints.map(id => this.renderLeaderCard(users[id]))}
            </div>
        )
    }
}
function mapStateToProps({users}){
    return {
        users
    }
}
export default connect(mapStateToProps)(LeaderBoardPage);