import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StylesProvider, AppBar, Tabs, Tab } from '@material-ui/core';
import QuestionCard from './QuestionCard';

class Questions extends Component {
    state = {
        value: 0
    }

    handleTabChange = (event, newValue) => {
        this.setState({
            value: newValue
        });
    }

    TabPanel = (props) => {
        const {value, index, questionKeys} = props;
        return (
            <div
              role='tabpanel'
              hidden={value !== index}
              id={`tabpanel-${index}`}
              aria-labelledby={`tab-${index}`}
              >
                {value === index && questionKeys.length !== 0 && (
                    questionKeys.map((questionKey) => {
                        const question = this.props.questions[questionKey];
                        const user = this.props.users[question.author];
                        return (
                            <QuestionCard 
                                question={question} 
                                user={user} 
                                key={question.id}
                            />
                        )
                    })
                )}
            </div>
        )
    }

    a11yProps = (index) => {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    }

    render() {
        const {value} = this.state;
        const {questions, loginUser, users} = this.props;
        const answeredQuestionKeys = loginUser === null ?
        [] : Object.keys(users[loginUser].answers);
        answeredQuestionKeys.sort((keyA, keyB) => {
            return questions[keyB].timestamp - questions[keyA].timestamp;
        });
        const unAnsweredQuestionKeys = loginUser === null ?
        [] : Object.keys(questions).filter(key => !answeredQuestionKeys.includes(key));
        unAnsweredQuestionKeys.sort((keyA, keyB) => {
            return questions[keyB].timestamp - questions[keyA].timestamp;
        })
        return(
            <StylesProvider injectFirst>
                <div className='questions-tabs-box'>
                    <AppBar position='static'>
                        <Tabs value={value} onChange={this.handleTabChange}>
                            <Tab label='Unanswered Questions' className='question-tab' {...this.a11yProps(0)}/>
                            <Tab label='Answered Questions' className='question-tab' {...this.a11yProps(1)}/>
                        </Tabs>
                    </AppBar>
                    <this.TabPanel 
                        value={value} 
                        index={0} 
                        questionKeys={unAnsweredQuestionKeys}
                    />
                    <this.TabPanel 
                        value={value} 
                        index={1} 
                        questionKeys={answeredQuestionKeys}
                    />
                </div>
            </StylesProvider>
        )
    }
}

function mapStateToProps({loginUser, questions, users}) {
    return {
        loginUser,
        questions,
        users
    }
}
export default connect(mapStateToProps)(Questions);