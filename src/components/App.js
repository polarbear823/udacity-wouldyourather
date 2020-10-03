import React, { Component } from 'react';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import QuestionsPage from './QuestionsPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionDetailPage from './QuestionDetailPage';
import Nav from './Nav';
import NewQuestionPage from './NewQuestionPage';
import LeaderBoardPage from './LeaderBoardPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <div>
          <div>
            <Nav/>
          </div>
          {this.props.loginUser ?
              <div>
                <Route path='/' exact component={QuestionsPage} />
                <Route path='/question/:id' component={QuestionDetailPage} />
                <Route path='/signin' component={LoginPage} />
                <Route path='/new' component={NewQuestionPage}/>
                <Route path='/board' component={LeaderBoardPage}/>
              </div> :
              <LoginPage/>
          }
        </div>
      </Router>
    )
  }
}

function mapStateToProps({loginUser}) {
  return {
    loginUser
  }
}
export default connect(mapStateToProps)(App);
