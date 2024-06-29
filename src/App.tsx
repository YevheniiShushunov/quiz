import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import HomePage from "./components/homepage/HomePage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <HomePage/>
            </BrowserRouter>
        </div>
    );
}

export default App;
