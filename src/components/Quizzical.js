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
                        console.log(ans)
                        return (
                            <div 
                                key={ans.id}
                                className={`answer ${ans.isChose && "chose"}`}
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
        </div>
    )
}