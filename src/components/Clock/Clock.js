import React from 'react';

const Clock = (props) => {

    return (
        <div>
            <h1>{props.greeting}</h1>
            <h3>it is {new Date().toLocaleTimeString()}.</h3>
        </div>
    )
}

export default Clock;

