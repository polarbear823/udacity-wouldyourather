import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
export default function NotFoundPage() {
    return (
        <div className='not-found-div'>
            <SentimentVeryDissatisfiedIcon fontSize='large' />
            404 NOT FOUND!
        </div>
    )
}