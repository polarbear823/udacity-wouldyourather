import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
}

function answerQuestion({authedUser, qid, answer}) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAnswerQuestion(info) {
    return ((dispatch) => {
        dispatch(answerQuestion(info));
        return saveQuestionAnswer(info)
        .catch((e) => {
            console.warn(`Error in handleAnswerQuestion: ${e}`);
            dispatch(answerQuestion(info));
            alert('There was an error answer the question. Try again.');
        })
    })
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const author = getState().loginUser;
        return saveQuestion({
            optionOneText, 
            optionTwoText, 
            author}).then((question) => dispatch(addQuestion(question)));
    }
}