import React, { Component } from 'react';
import { Card, CardMedia, CardHeader, CardContent, Typography, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

class QuestionCard extends Component {
    state = {
        toDetailPage: false,
    }
    handleViewPollClick = () => {    
        this.setState({
            toDetailPage: true,
        });       
    }

    render() {
        const {question, user} = this.props;
        if (this.state.toDetailPage === true) {
            return <Redirect to={`/questions/${question.id}`}/>
        } 
        return (
            <Card className='question-card'>
                <CardHeader
                    title={`${user.name} asks:`}
                    className='question-card-header'
                />
                <div className='question-card-detail'>
                    <CardMedia
                        className='card-avatar'
                        image={user.avatarURL}
                        title='User Avatar'
                    />
                    <CardContent>
                        <div>
                        <Typography component='h5' variant='h5'>
                            Would you rather
                        </Typography>
                        <Typography variant='subtitle1' color='textSecondary'>
                            {question.optionOne.text}
                        </Typography>
                        <Button variant='contained' onClick={this.handleViewPollClick}>View Poll</Button>
                        </div>
                    </CardContent>
                </div>
            </Card>
        )
    }
}

export default (QuestionCard);