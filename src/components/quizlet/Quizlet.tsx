import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/button/Button";
import { Quiz, QuizItem } from "../../api-data/database";
import { useParams } from "react-router-dom";
import { getQuizletById } from "../../api-data/database";
import { initiateStatuses, InitialStatuses } from "../../functions/initial-statuses";

const Quizlet = () => {
    const [quiz, setQuiz] = React.useState<Quiz | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = React.useState<QuizItem | null>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isAnswerStatuses, setIsAnswerStatuses] = useState<InitialStatuses>(initiateStatuses())
    const [totalScore, setTotalScore] = useState<string | number>(0)
    const {id} = useParams() || 0;
    // const totalScore = sessionStorage.getItem("score");
    const navigate = useNavigate();

    const loadQuiz = async () => {
        if (id) {
            const quizData = getQuizletById(+id);
            if (quizData) {
                setQuiz(quizData);

                if (quizData?.questions) {
                    setCurrentQuestion(quizData?.questions[currentPage])
                }
            }
        }
        return
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(+e.target.value)
    }

    const handleCheckAnswer = () => {
        console.log(currentQuestion)
        const userAnswer = currentQuestion?.answers.find(answer => answer.id === selectedOption);

        if (userAnswer?.correct) {
            localStorage.setItem("score", `${+totalScore + userAnswer.scores}`);
        }

        const result = localStorage.getItem("score")
        if (result) {
            setTotalScore(+result);
        }

        setIsAnswerStatuses({...isAnswerStatuses, isAnswerChecked: true});

        if (currentPage + 1 === quiz?.questions.length) {
            setIsAnswerStatuses({...isAnswerStatuses, isResultShowed: true})
        }
        console.log(totalScore);
    }

    const handleNextPage = async () => {
        setIsAnswerStatuses({...isAnswerStatuses, isAnswerChecked: false});
        setSelectedOption(null);
        const nextPage = currentPage + 1;
        if (quiz?.questions && nextPage < quiz.questions.length) {
            setCurrentPage(nextPage);
            setCurrentQuestion(quiz.questions[nextPage]);
        }
    }

    const handleBack = () => {
        localStorage.setItem("score", "0");
        navigate("/");
    }


    useEffect(() => {
        loadQuiz();
        const score = localStorage.getItem("score");
        if (score) {
            setTotalScore(+score);
        }

        const pageLoadTime = localStorage.getItem('page_load_time');
        const now = new Date().getTime();

        if (pageLoadTime && now - +pageLoadTime > 0) {

            localStorage.setItem("score", "0");
        }

        localStorage.setItem('page_load_time', `${now}`);

    }, [])


    return (
        <div className="flex justify-center mt-5">
            <div className="quizlet__container card flex flex-col">
                <div className="card-title w-full">
                    <h2>{quiz?.name}</h2>
                </div>

                <div className="flex flex-col">
                    <div className="flex gap-5 card-counter">
                        <div>Question</div>
                        <div>{currentPage + 1} of {quiz?.questions.length}:</div>
                        {isAnswerStatuses.isResultShowed && <div>Result: {+totalScore}</div>}
                    </div>
                    <div className="mt-6 card-text">{currentQuestion?.text}</div>

                    <div className="flex flex-col mt-5 w-full">
                        {currentQuestion?.answers.map((answer) => (
                            <div
                                className={`
                                mt-2 rounded pl-2 py-3 w-full  flex 
                                ${isAnswerStatuses.isAnswerChecked ? (!answer.correct ? "bg-del" : "bg-right-answer") : "bg-answer-bg"}`}
                                key={answer.id}>
                                <input
                                    type="radio"
                                    value={answer.id}
                                    checked={selectedOption === +answer.id}
                                    disabled={isAnswerStatuses.isAnswerChecked}
                                    onChange={handleChange}/>
                                <div className="ml-3 hover:cursor-pointer">{answer.text}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-5">
                        {isAnswerStatuses.isAnswerChecked && currentPage !== quiz?.questions.length && !isAnswerStatuses.isResultShowed &&
                            <Button name={"Next question"} onClick={handleNextPage} />
                        }

                        {!isAnswerStatuses.isAnswerChecked && currentPage !== quiz?.questions.length && !isAnswerStatuses.isResultShowed &&
                            <Button name={"Check"} onClick={handleCheckAnswer} disable={!selectedOption}/>
                        }

                        {isAnswerStatuses.isResultShowed && <Button  onClick={handleBack} name={"Back"} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quizlet;