import { RECEIVE_USERS } from '../actions/users';
import { ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ANSWER_QUESTION:
            const answers = {
                ...state[action.authedUser].answers,
                [action.qid]: action.answer
            }
            return {
                ...state,
               [action.authedUser]: {
                   ...state[action.authedUser],
                   answers: answers
               } 
            }
        case ADD_QUESTION:
            const userId = action.question.author;
            const qid = action.question.id;
            return {
                ...state,
                [userId]: {
                    ...state[userId],
                    questions: state[userId].questions.concat(qid)
                }
            }     
        default:
            return state;
    }
}