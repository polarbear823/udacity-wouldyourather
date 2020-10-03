import { Card, CardHeader, CardContent, Typography, Button, TextField, Divider, StylesProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

class NewQuestionPage extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    };

    handleSubmitNewQuestion = (e) => {
        e.preventDefault();
        const {optionOne, optionTwo} = this.state;
        const {dispatch} = this.props;
        dispatch(handleAddQuestion(optionOne, optionTwo));
        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toHome: true
        }))
    }

    handleTextChange = (e, option) => {
        const text = e.target.value;
        if (option === 1) {
            this.setState({
                ...this.state,
                optionOne: text
            })
        } else {
            this.setState({
                ...this.state,
                optionTwo: text
            })
        }
    }

    render() {
        const {optionOne, optionTwo, toHome} = this.state;
        if (toHome === true) {
            return <Redirect to='/' />
        }
        return (
            <StylesProvider injectFirst>
                <Card className='new-question-card'>
                    <CardHeader
                        title='Create New Question'
                        className='question-card-header'
                    />
                    <CardContent>
                        <div>
                            <Typography>Complete the question:</Typography>
                            <Typography component='h5' variant='h5'>
                                Would you rather...
                            </Typography>
                            <form onSubmit={this.handleSubmitNewQuestion}>
                                <TextField 
                                    id="option-one-text" 
                                    label="Option One" 
                                    variant="outlined" 
                                    className='option-text'
                                    onChange={(e) => this.handleTextChange(e, 1)}
                                    value={optionOne}
                                    required
                                />
                                <Divider className='divider'/>
                                <Typography>OR</Typography>
                                <TextField 
                                    id="option-two-text" 
                                    label="Option Two" 
                                    variant="outlined" 
                                    className='option-text'
                                    onChange={(e) => this.handleTextChange(e, 2)}
                                    value={optionTwo}
                                    required
                                />
                                <Button 
                                variant='contained' 
                                color='primary'
                                type='submit'
                                className='submit-question-button'>Submit</Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </StylesProvider>
        )
    }
}

export default connect()(NewQuestionPage);