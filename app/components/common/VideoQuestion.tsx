'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import CharacterImage from '@/app/assets/images/character.svg';
import QuestionMarkIcon from '@/app/assets/icons/QuestionMarkIcon';
import AttempVideoQuestion from './AttempVideoQuestion';
import AnsweredOpenVideoQuestion from './AnsweredOpenVideoQuestion';

function VideoQuestion({
    question,
    setCurrentQuestion,
    setPlaying,
    handlePlayAfterQuestion,
}: {
    question: {
        id: string;
        statement: string;
        options: { [key: string]: string };
        correctOption: string;
        correctOptionExplanation: string;
        totalMarks: number;
        attempt?: {
            id: string;
            answer: string;
            obtainedMarks: number;
        };
    };
    setCurrentQuestion: (question: null) => void;
    setPlaying: (isPlaying: boolean) => void;
    handlePlayAfterQuestion: () => void;
}) {
    const continueVideo = () => {
        setCurrentQuestion(null);
        setPlaying(true);
        handlePlayAfterQuestion();
    };

    return (
        <AttempVideoQuestion
            question={question}
            continueVideo={continueVideo}
        />

        // <AnsweredOpenVideoQuestion
        //     answer={question?.attempt?.answer ?? ''}
        //     answerWasCorrect={
        //         (question?.attempt?.obtainedMarks ?? 0) >
        //         question.totalMarks / 2
        //     }
        //     continueVideo={continueVideo}
        // />
    );
}

export default VideoQuestion;
