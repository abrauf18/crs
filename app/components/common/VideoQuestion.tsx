'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import CharacterImage from '@/app/assets/images/character.svg';
import QuestionMarkIcon from '@/app/assets/icons/QuestionMarkIcon';
import AttempVideoQuestion from './AttempVideoQuestion';
import AnsweredOpenVideoQuestion from './AnsweredOpenVideoQuestion';
import AnsweredVideoMCQ from './AnsweredVideoMCQ';

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

    return !question.attempt ? (
        <AttempVideoQuestion
            question={question}
            continueVideo={continueVideo}
        />
    ) : Object.keys(question.options).length === 0 ? (
        <AnsweredOpenVideoQuestion
            answer={question.attempt.answer ?? ''}
            answerWasCorrect={
                (question.attempt.obtainedMarks ?? 0) > question.totalMarks / 2
            }
            continueVideo={continueVideo}
        />
    ) : (
        <AnsweredVideoMCQ question={question} continueVideo={continueVideo} />
    );
}

export default VideoQuestion;
