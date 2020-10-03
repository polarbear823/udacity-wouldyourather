import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION:
            const question = state[action.qid];
            const votes = question[action.answer].votes.concat(action.authedUser);
            const answerText = question[action.answer].text;
            const answer = {
                text: answerText,
                votes: votes
            }          
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: answer
                }
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            }
        default:
            return state;
    }
}