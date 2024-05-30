'use client';

/* eslint-disable import/no-extraneous-dependencies */
import { Session } from 'next-auth';
import ReactPlayer from 'react-player';
// import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@/app/components/ui/table';
import {
    UpdateStudentVideoCompletedAPI,
    UpdateStudentVideoLastSeenTime,
    createVideoQuestionAnswerAPI,
} from '@/app/api/student';
import action from '@/app/action';
import MovieIcon from '@/app/assets/icons/MovieIcon';
import { secondsToString, timeStringToSeconds } from '@/lib/utils';
import VideoQuestion from './VideoQuestion';
import DialogBox from './DialogBox';
// import PageLoader from './PageLoader';

function getVideoIdFromPathname(path: string) {
    const parts = path.split('/');
    return parts[parts.length - 1];
}

export default function VideoViewing({
    videoURL,
    thumbnailURL,
    topics,
    questions,
    studentLastPlayedTime,
    lastSeenTime,
    data,
}: {
    videoURL: string;
    thumbnailURL: string;
    topics: { [key: string]: string };
    questions: {
        id: string;
        statement: string;
        options: { [key: string]: string };
        correctOption: string;
        correctOptionExplanation: string;
        popUpTime: string;
        totalMarks: number;
        attempt?: {
            id: string;
            answer: string;
            obtainedMarks: number;
        };
    }[];
    studentLastPlayedTime?: React.MutableRefObject<number>;
    lastSeenTime?: string;
    data?: Session;
}) {
    const pathname = usePathname();
    const isMountedRef = useRef(true);
    const playerRef = useRef<ReactPlayer>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState(
        questions.map((question) => question.attempt !== undefined)
    );
    const [playing, setPlaying] = useState(true);
    const videoId = getVideoIdFromPathname(pathname);
    const [videoReady, setVideoReady] = useState(false);
    // const [isMounted, setIsMounted] = useState(false);
    const [lastPlayedTime, setLastPlayedTime] = useState<number>(
        lastSeenTime ? timeStringToSeconds(lastSeenTime) : 0
    );
    const [currentQuestion, setCurrentQuestion] = useState<{
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
    } | null>(null);

    const topicsArray = Object.entries(topics).map(([popupTime, topic]) => ({
        popupTime,
        topic,
    }));

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
        const matchedQuestion = questions.find(
            (question) =>
                Math.abs(
                    currentPlayedSeconds -
                        timeStringToSeconds(question.popUpTime)
                ) < 1
        );

        if (studentLastPlayedTime) {
            studentLastPlayedTime.current = currentPlayedSeconds;
        }

        if (matchedQuestion) {
            setLastPlayedTime(currentPlayedSeconds + 2);
            setPlaying(false);
            setCurrentQuestion(matchedQuestion);
        }
    };

    const handlePlayAfterQuestion = () => {
        if (currentQuestion === null && lastPlayedTime !== null) {
            setPlaying(true);
            if (playerRef.current) {
                playerRef.current.seekTo(lastPlayedTime);
            }
        }
    };

    const handleConfirmLeavingQuestions = async () => {
        setIsDialogOpen(false);
        if (!data || !videoId || data?.user?.role !== 'student') {
            return;
        }
        answeredQuestions.forEach(async (isAnswered, i) => {
            if (!isAnswered) {
                try {
                    const question = questions[i];
                    const APIresponse = await createVideoQuestionAnswerAPI({
                        accessToken: data?.user?.accessToken,
                        userId: data?.user?.id,
                        questionId: question.id,
                        answer: '',
                    });
                    if (APIresponse.status !== 200) {
                        throw new Error(
                            APIresponse?.data?.message ||
                                'An error occured while submitting your answer'
                        );
                    }
                    // toast.success('Answer submitted successfully');
                } catch (error: any) {
                    // toast.error(
                    //     error?.response?.data?.message ||
                    //         'An error occured while submitting your answer'
                    // );
                }
            }
        });
        action('getStudentVideo');
        try {
            const APIresponse = await UpdateStudentVideoCompletedAPI({
                accessToken: data?.user?.accessToken,
                studentId: data?.user?.id,
                videoId,
                lastSeenTime: secondsToString(
                    studentLastPlayedTime?.current ?? 0
                ),
                watchedCompletely: false,
            });

            if (APIresponse.status !== 200) {
                throw new Error('Error updating video last seen time');
            }

            action('getStudentStandardAPI');
        } catch (error: any) {
            // toast.error(error.message || 'Error updating video last seen time');
        }
    };

    const handleCancelLeavingQuestions = () => {
        setIsDialogOpen(false);
    };

    const handleVideoEnd = async () => {
        if (!data || !videoId || data?.user?.role !== 'student') {
            return;
        }
        if (answeredQuestions.some((answered) => answered === false)) {
            setIsDialogOpen(true);
        } else {
            try {
                const APIresponse = await UpdateStudentVideoCompletedAPI({
                    accessToken: data?.user?.accessToken,
                    studentId: data?.user?.id,
                    videoId,
                    lastSeenTime: secondsToString(
                        studentLastPlayedTime?.current ?? 0
                    ),
                    watchedCompletely: true,
                });

                if (APIresponse.status !== 200) {
                    throw new Error('Error updating video last seen time');
                }

                action('getStudentStandardAPI');
            } catch (error: any) {
                // toast.error(error.message || 'Error updating video last seen time');
            }
        }
        // toast.success('Video last seen time updated successfully');
    };

    useEffect(() => {
        if (currentQuestion === null && lastPlayedTime !== null && videoReady) {
            setPlaying(true);
            if (playerRef.current) {
                playerRef.current.seekTo(lastPlayedTime);
            }
        }
    }, [videoReady, currentQuestion, lastPlayedTime]);

    useEffect(() => {
        const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
            try {
                if (!data || !videoId || data?.user?.role !== 'student') {
                    return;
                }
                const APIresponse = await UpdateStudentVideoLastSeenTime({
                    accessToken: data?.user?.accessToken,
                    studentId: data?.user?.id,
                    videoId,
                    lastSeenTime: secondsToString(
                        studentLastPlayedTime?.current ?? 0
                    ),
                });

                if (APIresponse.status !== 200) {
                    throw new Error('Error updating video last seen time');
                }

                action('getStudentStandardAPI');
                // toast.success('Video last seen time updated successfully');
            } catch (error: any) {
                // toast.error(
                //     error.message || 'Error updating video last seen time'
                // );
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            isMountedRef.current = false;
            if (!isMountedRef.current) {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const updateLastSeenTime = async () => {
            try {
                if (!data || !videoId || data?.user?.role !== 'student') {
                    return;
                }

                const APIresponse = await UpdateStudentVideoLastSeenTime({
                    accessToken: data?.user?.accessToken,
                    studentId: data?.user?.id,
                    videoId,
                    lastSeenTime: secondsToString(
                        studentLastPlayedTime?.current ?? 0
                    ),
                });

                if (APIresponse.status !== 200) {
                    throw new Error('Error updating video last seen time');
                }

                action('getStudentStandardAPI');
                // toast.success('Video last seen time updated successfully');
            } catch (error: any) {
                // toast.error(
                //     error.message || 'Error updating video last seen time'
                // );
            }
        };

        return () => {
            isMountedRef.current = false;
            if (!isMountedRef.current) {
                updateLastSeenTime();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    // if (!isMounted) {
    //     return <PageLoader />;
    // }
    console.log(isDialogOpen);
    return (
        <>
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
                                width="800px"
                                height="450px"
                                controls
                                playing={playing}
                                onProgress={handleVideoProgress}
                                className="mb-4"
                                onEnded={handleVideoEnd}
                                onReady={() => setVideoReady(true)}
                            />
                        </div>
                        {topicsArray.length > 0 && (
                            <div className="mt-4 border-2 border-light-gray p-2">
                                <h2 className="text-xl font-semibold mb-2 border-b py-2 pl-3">
                                    Checkpoints
                                </h2>
                                <Table className="text-center">
                                    <TableBody>
                                        {sortedTopics.map(
                                            ({ popupTime, topic }, index) => (
                                                <TableRow key={topic}>
                                                    <TableCell>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="rounded flex gap-x-2 items-center justify-center">
                                                            <MovieIcon />
                                                            {topic}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {popupTime}
                                                    </TableCell>
                                                    <TableCell>
                                                        <button
                                                            type="button"
                                                            className="bg-primary-color text-white px-5 py-2 rounded-lg hover:bg-orange-400"
                                                            onClick={() =>
                                                                handlePlayTopic(
                                                                    popupTime
                                                                )
                                                            }
                                                        >
                                                            Play
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {isDialogOpen && (
                <DialogBox
                    isOpen={isDialogOpen}
                    message={`There ${
                        answeredQuestions.filter((answered) => !answered)
                            .length > 1
                            ? 'are'
                            : 'is'
                    } still ${
                        answeredQuestions.filter((answered) => !answered).length
                    } ${
                        answeredQuestions.filter((answered) => !answered)
                            .length > 1
                            ? 'questions'
                            : 'question'
                    } remaining to be answered. Are you sure you want submit them empty ?`}
                    onYes={handleConfirmLeavingQuestions}
                    onNo={handleCancelLeavingQuestions}
                />
            )}
        </>
    );
}
