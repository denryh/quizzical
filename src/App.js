import React from 'react'
import { nanoid } from 'nanoid'
import './App.css';
import Start from './components/Start'
import Quizzical from './components/Quizzical'

function App() {

  const [start, setStart] = React.useState(false)
  const [checked, setChecked] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => setQuizData(modifyData(data.results)))
  }, [])

  function modifyData(data) {
    const neededKeys = ['question', 'correct_answer', 'incorrect_answers']
    const filteredData = data.map(obj => {
      return Object.keys(obj).filter(key => neededKeys.includes(key)).reduce((result, key) => {
        result[key] = obj[key]
        return result
      }, {})
    })

    const finalData = []

    for (let i = 0; i < filteredData.length; i++) {
      const newData = {
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
      finalData.push(newData)
    }
    return finalData
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
    console.log(quizData[0].answers[ansId])
  }

  function startQuiz() {
    setStart(true)
  }

  function checkAnswers() {
    setChecked(prev => !prev)
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
          />
      }
    </div>
  );
}

export default App;
