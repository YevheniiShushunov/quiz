import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../shared/components/button/Button";
import { addQuizlets, getQuizletById, Quiz, QuizItem } from "../../api-data/database";
import { initialQuizManageData, initialQuestionData  } from "../../functions/initial-data";
import { updateQuizletById } from "../../api-data/database";
import {ReactComponent as Del} from "../../assets/icons/del.svg";


const Manage = () => {
    const [quiz, setQuiz] = React.useState<Quiz>(initialQuizManageData());
    const {id} = useParams() || 0;
    const navigate = useNavigate();

    const loadQuiz = async () => {
        if (id) {
            const quizData = getQuizletById(+id);
            if (quizData) {
                setQuiz(quizData);
                console.log(quizData)
            }
        }
        return
    }

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>, qIndex: number) => {
        const newQuiz = quiz?.questions.map((question, idx) => {
            if (qIndex === idx) {
                return {...question, [e.target.name]: e.target.value};
            }
            return question;
        });
        setQuiz({
            ...quiz,
            questions: newQuiz
        });
    }

    const handleAddQuestion = () => {
        const newId = quiz.questions[quiz.questions.length - 1].id;

        setQuiz({
            ...quiz,
            questions: [
                ...quiz.questions,
                initialQuestionData(newId ? newId + 1 : 1)
            ]
        });
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, qIndex: number, aIndex: number) => {
        const newQuiz= quiz?.questions.map((question, qIdx) => {
            if (qIndex === qIdx) {
                const newAnswers = question.answers.map((answer, aIdx) => {
                    if (aIndex === aIdx) {
                        if(e.target.name === "correct") {
                            return {...answer, [e.target.name]: e.target.checked};
                        }

                        return {...answer, [e.target.name]: e.target.value};
                    }
                    return answer;
                });
                return {...question, answers: newAnswers};
            }
            return question;
        });


        setQuiz({
            ...quiz,
            questions: newQuiz
        });
    }

    const deleteAnswer = (qIndex: number, aIndex: number) => {
        const newQuiz = quiz?.questions.map((question, qIdx) => {
            if (qIndex === qIdx) {
                const newAnswers = question.answers.filter((_, aIdx) => aIdx !== aIndex);
                return {...question, answers: newAnswers};
            }
            return question;
        });

        setQuiz({
            ...quiz,
            questions: newQuiz
        });
    }

    const answerAdd = (qIndex: number) => {
        const initialAnswer = {
                id: 1,
                text: "",
                scores: 0,
                correct: false,
            }

        const newQuiz = quiz?.questions.map((question, qIdx) => {
            if (qIndex === qIdx) {
                const newAnswers = [...question.answers, initialAnswer];
                return {...question, answers: newAnswers};
            }
            return question;
        });

        setQuiz({
            ...quiz,
            questions: newQuiz
        });
    };

    const handleSubmit = () => {
        if (id) {
            updateQuizletById(+id, quiz)
        }
    }

    const changePageToHome = () => {
        navigate("/")
    }

    useEffect(() => {
        loadQuiz();
    }, [])

    return (
        <div>
            <div className="flex justify-center mt-5 py-10">
                <div className="quizlet__container card flex flex-col">
                    <div className="card-title w-full flex">
                        <h2>{quiz?.name}</h2>
                        <div className="ml-3">
                            <Button name={"Back"} onClick={changePageToHome}/>
                        </div>

                    </div>

                    <div className="flex flex-col">

                        <div className="flex gap-5 card-counter">
                            <div>Questions</div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {quiz?.questions.map((question, qIndex) => (
                                <div key={qIndex}>
                                    <div className="flex flex-col w-full mt-4">
                                        <div className="flex flex-col">
                                            <label htmlFor="questionText" className="flex">Question text:</label>
                                            <input
                                                type="text"
                                                name="text"
                                                id="questionText"
                                                value={question?.text}
                                                onChange={(e) => handleQuestionChange(e, qIndex)}
                                                className="input ml-3 my-2"/>
                                        </div>

                                        <div className="flex flex-col mt-2">
                                            {question.answers.map((answer, aIndex: number) => (
                                                <div key={aIndex} className="flex w-full px-5 items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="correct"
                                                        className="mr-2"
                                                        onChange={(e) => handleAnswerChange(e, qIndex, aIndex)}
                                                        checked={answer.correct}/>
                                                    <input
                                                        value={answer.text}
                                                        name="text"
                                                        className="input w-full mt-2"
                                                        onChange={(e) => handleAnswerChange(e, qIndex, aIndex)}/>

                                                    <label htmlFor="scores"
                                                           className="flex items-center ml-2">Scores:</label>
                                                    <input
                                                        type="text"
                                                        name="scores"
                                                        id="questionText"
                                                        value={answer?.scores}
                                                        onChange={(e) => handleQuestionChange(e, qIndex)}
                                                        className="input ml-3 my-2"/>
                                                    <Button name={"Del"} bcolor={"del"} onClick={() => deleteAnswer(qIndex, aIndex)}/>
                                                </div>
                                            ))}
                                            <Button name={"Add question"} bcolor={"card"} onClick={() => answerAdd(qIndex)}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex">
                                <Button name={"Add question"} onClick={handleAddQuestion}/>
                                <Button name={"Save changes"} buttonType={"submit"}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manage;