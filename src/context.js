import axios from 'axios'
import React, { useState, useContext } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestion] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  })
  const [isModalOpen, setIsModelOpen] = useState(false)

  const fetchQuentions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err) => console.log(err))
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestion(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      } else {
        setWaiting(true)
        setError(true)
      }
    } else {
      setWaiting(true)
    }
  }

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }
    })
  }
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1)
    }
    nextQuestion()
  }

  const openModal = () => {
    setIsModelOpen(true)
  }
  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModelOpen(false)
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuiz({ ...quiz, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { amount, category, difficulty } = quiz

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    fetchQuentions(url)
  }

  return (
    <AppContext.Provider
      value={{
        handleChange,
        handleSubmit,
        quiz,
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
