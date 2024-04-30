'use client';

/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSession } from 'next-auth/react';
import { timeStringToSeconds } from '@/lib/utils';
import VideoQuestion from './VideoQuestion';

export default function VideoViewing({
    videoURL,
    thumbnailURL,
    topics,
    questions,
}: {
    videoURL: string;
    thumbnailURL: string;
    topics: { [key: string]: string };
    questions: {
        statement: string;
        options: { [key: string]: string };
        correctOption: string;
        correctOptionExplanation: string;
        popUpTime: string;
    }[];
}) {
    const { data } = useSession();
    const playerRef = useRef<ReactPlayer>(null);
    const [playing, setPlaying] = useState(true);
    const [lastPlayedTime, setLastPlayedTime] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<{
        statement: string;
        options: { [key: string]: string };
        correctOption: string;
        correctOptionExplanation: string;
    } | null>(null);

    // Convert the topics object into an array of objects
    const topicsArray = Object.entries(topics).map(([popupTime, topic]) => ({
        popupTime,
        topic,
    }));

    // Sort the topics array based on popup time
    const sortedTopics = topicsArray.sort((a, b) => {
        const popupTimeA = timeStringToSeconds(a.popupTime);
        const popupTimeB = timeStringToSeconds(b.popupTime);
        return popupTimeA - popupTimeB;
    });

    const handlePlayTopic = (popupTime: string) => {
        if (playerRef.current) {
            const sec = timeStringToSeconds(popupTime);
            playerRef.current.seekTo(sec);
        }
    };

    const handleVideoProgress = (progress: { playedSeconds: number }) => {
        const currentPlayedSeconds = progress.playedSeconds;
        // console.log('Current Played Seconds: ', currentPlayedSeconds);
        // Check if the current played time matches any popup time for questions
        const matchedQuestion = questions.find((question) => {
            console.log(
                'Question Popup Time: ',
                timeStringToSeconds(question.popUpTime),
                question.popUpTime
            );
            // console.log('current Played Seconds: ', currentPlayedSeconds);
            // console.log(
            //     'time difference: ',
            //     Math.abs(
            //         currentPlayedSeconds -
            //             timeStringToSeconds(question.popUpTime)
            //     )
            // );
            return (
                Math.abs(
                    currentPlayedSeconds -
                        timeStringToSeconds(question.popUpTime)
                ) < 1
            );
        });

        if (matchedQuestion) {
            // console.log('Matched Question: ', matchedQuestion);
            setLastPlayedTime(currentPlayedSeconds + 2);
            setPlaying(false);
            setCurrentQuestion(matchedQuestion);
        }
    };

    useEffect(() => {
        console.log('inside efffect', currentQuestion, lastPlayedTime);
        if (currentQuestion === null && lastPlayedTime !== null) {
            setPlaying(true);
            if (playerRef.current) {
                playerRef.current.seekTo(lastPlayedTime);
            }
        }
    }, [currentQuestion, lastPlayedTime]);

    const handlePlayAfterQuestion = () => {
        console.log('inside handlePlayAfterQuestion');
        if (currentQuestion === null && lastPlayedTime !== null) {
            setPlaying(true);
            if (playerRef.current) {
                playerRef.current.seekTo(lastPlayedTime);
            }
        }
    };

    return (
        <div>
            {currentQuestion ? (
                <div>
                    <VideoQuestion
                        question={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        setPlaying={setPlaying}
                        handlePlayAfterQuestion={handlePlayAfterQuestion}
                    />
                </div>
            ) : (
                <div>
                    <div className="text-lg flex justify-center">
                        <ReactPlayer
                            ref={playerRef}
                            url={videoURL}
                            width="100%"
                            height="100%"
                            controls
                            playing={playing}
                            onProgress={handleVideoProgress}
                        />
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Checkpoints
                        </h2>
                        <table className="table-auto">
                            <tbody>
                                {sortedTopics.map(
                                    ({ popupTime, topic }, index) => (
                                        <tr key={topic}>
                                            <td className="border px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {topic}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {popupTime}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handlePlayTopic(
                                                            popupTime
                                                        )
                                                    }
                                                >
                                                    Play
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
