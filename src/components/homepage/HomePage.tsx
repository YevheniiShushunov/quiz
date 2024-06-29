import React from 'react';
import { Route, Routes } from "react-router-dom";
import QuizletList from "../quizlets-list/QuizletList";
import Quizlet from "../quizlet/Quizlet";
import Manage from "../manage/Manage";

const HomePage = () => {

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<QuizletList/>}/>
                    <Route path="quiz/:id" element={<Quizlet />}/>
                    <Route path="manage/:id" element={<Manage />}/>
                </Routes>
            </div>
        </div>
    );
};

export default HomePage;