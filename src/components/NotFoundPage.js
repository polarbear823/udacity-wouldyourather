import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Typography } from '@material-ui/core';
export default function NotFoundPage() {
    return (
        <div className='not-found-div'>
            <SentimentVeryDissatisfiedIcon fontSize='large' />
            404 NOT FOUND!
            <Typography>Not valid question</Typography>
        </div>
    )
}