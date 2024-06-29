import React from 'react';
import { Link, NavLink } from "react-router-dom";
import {ReactComponent as Del} from "../../assets/icons/del.svg"
import {ReactComponent as Edit} from "../../assets/icons/edit.svg";
import { getQuizlets, Quiz } from "../../api-data/database";

interface Props {
    quizlets: Quiz[]
}

const QuizletList = () => {
    const quizlets: Quiz[] = getQuizlets()

    return (
        <div className="flex justify-center">
            <div className="quizlet__container flex flex-col items-center">
                <div>
                    <h1>Quizlets:</h1>
                </div>
                <div className="quiz-card flex gap-1">
                    {quizlets.map((quiz) => (
                        <div key={quiz.id}>
                            <div className="bg-card text-white flex py-2 px-3">
                                <Link to={`quiz/${quiz.id}`}>{quiz.name}</Link>
                                <Link to={`manage/${quiz.id}`} className="ml-2 flex items-center">
                                    <Edit className={`fill-answer-bg`}/>
                                </Link>

                                <button className="ml-2">
                                    <Del className={`fill-answer-bg`}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex w-full mt-2">
                <button className="btn bg-btngreen text-white hover:bg-green-700">Add quiz</button>
                </div>
            </div>
        </div>
    );
};

export default QuizletList;