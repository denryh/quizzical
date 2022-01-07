import React from 'react'

export default function Quizzes(props) {

    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const quizzes = props.data.map(quiz => {

        return (
            <div className="quiz" key={quiz.id}>
                <h3 className='quiz-title'>{decodeHtml(quiz.question)}</h3>
                <div className='quiz-answers'>
                    {quiz.answers.map(ans => {
                        const findAnsBg = () => {
                            let bg = "transparent"
                            let opacity = 1
                            if (props.checked) {
                                if (ans.correct) bg = "#94D7A2"
                                else {
                                    opacity = 0.5
                                    if (ans.isChose) bg = "#F8BCBC"
                                }
                            } else {
                                if (ans.isChose) bg = "#D6DBF5"
                            }
                            return {
                                backgroundColor: bg,
                                opacity: opacity
                            }
                        }
                        const bg = findAnsBg()
                        return (
                            <div 
                                key={ans.id}
                                className='answer'
                                style={bg}
                                onClick={() => props.setChose(quiz.id, ans.id)}>
                                    {decodeHtml(ans.answer)}
                            </div>
                        )
                        })
                    }
                </div>
                <hr />
            </div>
        )
    })

    return(
        <div className="quiz-screen">
            {quizzes}
            <div className='result'>
                {props.checked && <p>You scored {props.score}/5 correct answers</p>}
                <button className='btn check-answer-btn' onClick={props.checkAnswers}>{props.checked ? 'Play again' : 'Checks answers'}</button>
            </div>
        </div>
    )
}