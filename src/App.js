import React from 'react'
import { nanoid } from 'nanoid'
import './App.css';
import Start from './components/Start'
import Quizzical from './components/Quizzical'

function App() {

  const [start, setStart] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  const [checked, setChecked] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [attemps, setAttemps] = React.useState(0)

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => setQuizData(modifyData(data.results)))
  }, [attemps])

  function modifyData(data) {
    const neededKeys = ['question', 'correct_answer', 'incorrect_answers']
    const filteredData = data.map(obj => {
      return Object.keys(obj).filter(key => neededKeys.includes(key)).reduce((result, key) => {
        result[key] = obj[key]
        return result
      }, {})
    })

    const newData = []

    for (let i = 0; i < filteredData.length; i++) {
      const modifiedData = {
        'id': nanoid(),
        'question': filteredData[i].question,
        'answers': [
            ...filteredData[i].incorrect_answers.map((ans, index) => {
              return {
                id: index,
                answer: ans,
                correct: false, 
                isChose: false
              }
            }), 
            {
              id: filteredData[i].incorrect_answers.length,
              answer: filteredData[i].correct_answer, 
              correct: true,
              isChose: false
            }
        ]
      }
      newData.push(modifiedData)
    }
    // Shuffle answers before sending
    newData.forEach(quiz => quiz.answers = quiz.answers.sort((a, b) => 0.5 - Math.random()))
    return newData
  }

  function setChose(id, ansId) {
    setQuizData(prevData => {
      return prevData.map(oldQuiz => oldQuiz.id !== id 
        ? oldQuiz
        : {...oldQuiz, answers: oldQuiz.answers.map(ans => {
            return ans.id === ansId 
              ? {...ans, isChose: !ans.isChose}
              : {...ans, isChose: false}
            }
        )})
    })
  }

  function startQuiz() {
    setStart(true)
  }

  function checkAnswers() {
    if (!checked) {
      setChecked(true)
      quizData.forEach(quiz => quiz.answers.forEach(ans => ans.correct && ans.isChose ? setScore(prev => prev + 1) : ""))
    } else {
      restart()
    }
  }
  
  function restart() {
    setStart(false)
    setChecked(false)
    setScore(0)
    setAttemps(prev => prev + 1)
  }

  return (
    <div className="App">
      {!start 
        ? <Start startQuiz={startQuiz}/>
        : <Quizzical 
            data={quizData} 
            setChose={setChose} 
            checked={checked} 
            checkAnswers={checkAnswers}
            score={score}
          />
      }
    </div>
  );
}

export default App;
