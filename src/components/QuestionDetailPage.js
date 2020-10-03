import React,  { Component } from 'react';
import { 
    Card, 
    CardMedia, 
    CardHeader, 
    CardContent, 
    Button, 
    StylesProvider, 
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel, 
    Typography,
    LinearProgress, Badge
} from '@material-ui/core';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/questions';
import NotFoundPage from './NotFoundPage';

class QuestionDetailPage extends Component {
    state = {
        value: ''    
    }

    handleSelectChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    handleSubmitAnswerClick = () => {
        const {dispatch, loginUser, id} = this.props;
        const {value} = this.state;
        dispatch(handleAnswerQuestion({
            authedUser: loginUser,
            qid: id,
            answer: value
        }));
    }

    renderUnAnsweredQuestion = () => {
        const {question, questionAuthor} = this.props;
        return (
            <StylesProvider injectFirst>
                <Card className='question-detail-card'>
                    <CardHeader
                        title={`${questionAuthor.name} asks:`}
                        className='question-card-header'
                    />
                    <div className='question-card-detail'>
                        <CardMedia
                            className='card-avatar'
                            image={questionAuthor.avatarURL}
                            title='User Avatar'
                        />
                        <CardContent>
                            <div>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Would You Rather...</FormLabel>
                                    <RadioGroup aria-label="wouldYouRather" name="wouldYouRather" value={this.state.value} onChange={this.handleSelectChange}>
                                        <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
                                        <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
                                    </RadioGroup>
                                </FormControl>
                                <Button 
                                    variant='contained'  
                                    color='primary' 
                                    onClick={this.handleSubmitAnswerClick}
                                    className='submit-answer-button'>
                                    Submit
                                </Button>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </StylesProvider> 
        )
    }

    renderAnsweredQuestion = () => {
        const {question, questionAuthor, loginUser} = this.props;
        return (
            <StylesProvider injectFirst>
                <Card className='question-detail-card'>
                    <CardHeader
                        title={`${questionAuthor.name} asks:`}
                        className='question-card-header'
                    />
                    <div className='question-card-detail'>
                        <CardMedia
                            className='card-avatar'
                            image={questionAuthor.avatarURL}
                            title='User Avatar'
                        />
                        <CardContent>
                        <Typography variant="h5" component="h2">
                            Results:
                        </Typography>
                        {this.renderAnsweredQuestionCards(question, loginUser)}
                        </CardContent>
                    </div>
                </Card>
            </StylesProvider> 
        )
    }

    renderAnsweredQuestionCards = (question, loginUser) => {
        const optionOneVotesNum = question.optionOne.votes.length;
        const optionTwoVotesNum = question.optionTwo.votes.length;
        const votesSum = optionOneVotesNum + optionTwoVotesNum;
        const optionOneValue = Math.round(optionOneVotesNum/votesSum*100);
        const optionTwoValue = 100-optionOneValue;
        const hasUserChoseOptionOne = question.optionOne.votes.includes(loginUser);
        return (
            <div>
                <Badge color='primary' badgeContent={hasUserChoseOptionOne ? 'Your vote' : 0} className='card-badge'>
                <div className='answered-question-card'>
                    <Typography variant='h6'>
                        {`Would you rather ${question.optionOne.text}`}
                    </Typography>
                    <div className='progress-container'>
                        <LinearProgress variant='determinate' value={optionOneValue} className='progress-bar'/>
                        <Typography>{`${optionOneValue}%`}</Typography>
                    </div>
                    <Typography>
                        {`${optionOneVotesNum} out of ${votesSum} votes`}
                    </Typography>
                </div>
                </Badge>
                <Badge color='primary' badgeContent={hasUserChoseOptionOne ? 0 : 'Your vote'} className='card-badge'>
                <div className='answered-question-card'>
                    <Typography variant='h6'>
                        {`Would you rather ${question.optionTwo.text}`}
                    </Typography>
                    <div className='progress-container'>
                        <LinearProgress variant='determinate' value={optionTwoValue} className='progress-bar'/>
                        <Typography>{`${optionTwoValue}%`}</Typography>
                    </div>
                    <Typography>
                        {`${optionTwoVotesNum} out of ${votesSum} votes`}
                    </Typography>
                </div>
                </Badge>
            </div>
        );
    }

    render() {
        const {isAnswered, question} = this.props;
        if (!question) {
            return (
                <NotFoundPage/>
            )
        }
        console.log(isAnswered);
        return (
            <div>
                {isAnswered ? this.renderAnsweredQuestion() : this.renderUnAnsweredQuestion()}
            </div>
        )
    }
}
function mapStateToProps({loginUser, users, questions}, props) {
    const {id} = props.match.params;
    const question = questions[id];
    const questionAuthor = question ? users[question.author] : null;
    const isAnswered = Object.keys(users[loginUser].answers).includes(id);
    return {
        id,
        loginUser,
        question,
        questionAuthor,
        isAnswered
    }
}
export default connect(mapStateToProps)(QuestionDetailPage);