import React from 'react'

export default function Start(props) {
    return (
        <div className="start-screen">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-subtitle">
                Got spare times to spend?
                <br/>
                Let's have some fun!
            </p>
            <button className="btn start-btn" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}