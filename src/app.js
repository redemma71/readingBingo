import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BingoSheet from './components/BingoSheet/BingoSheet';
import BingoKey from './components/BingoKey/BingoKey';
import LoginForm from './components/LoginForm/LoginForm';
import ReadingBingo from './components/ReadingBingo/ReadingBingo';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LoginForm buttonText="Log In" />} />
            <Route exact path="/sheet" element={<BingoSheet />} />
            <Route exact path="/key" element={<BingoKey />} />
        </Routes>
    </BrowserRouter>, document.getElementById('readingBingo'));
