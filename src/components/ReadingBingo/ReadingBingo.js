import React from 'react';
import { BrowserRouter, Link, Routes, Route, Switch } from 'react-router-dom';
import BingoSheet from '../BingoSheet/BingoSheet';
import BingoKey from '../BingoKey/BingoKey';
import LoginForm from '../LoginForm/LoginForm';

const ReadingBingo = () => { 
    return (
        <div id="readingBingo">
            <nav
                style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
                }}
                >
                <Link to="/">Login</Link> |{" "}
                <Link to="/sheet">Bingo Sheet</Link>
                <Link to="/key">Key</Link>
            </nav>
        </div>
    );
}

export default ReadingBingo;