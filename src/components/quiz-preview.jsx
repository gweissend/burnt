'use client'

import { useState } from 'react'
import { Container } from './container'
import { Heading, Subheading } from './text'
import { Button } from './button'

// Sample questions from the onboarding survey
const questions = [
  {
    id: 'timeline',
    title: 'What is your timeline for leaving your current job?',
    options: [
      { id: 'immediately', label: "Immediately—I'm ready to transition now." },
      { id: '3months', label: "Within 3 months—I'm preparing for a change soon." },
      { id: '6months', label: "Within 6 months—I'm planning ahead." },
      { id: 'exploring', label: "Just exploring—I'm open but not in a rush." },
    ],
  },
  {
    id: 'stage',
    title: 'What stage are you at in your current job?',
    options: [
      { id: 'active', label: "I'm actively looking for a new role." },
      { id: 'passive', label: "I'm passively considering opportunities." },
      { id: 'stuck', label: "I feel stuck but unsure of my next step." },
      { id: 'exploring', label: "I'm exploring industries or roles I've never considered before." },
    ],
  },
  {
    id: 'industry',
    title: "What's your dream industry or field?",
    options: [
      { id: 'tech', label: 'Technology (e.g., Software, AI, FinTech)' },
      { id: 'finance', label: 'Finance (e.g., Investment Banking, Asset Management)' },
      { id: 'creative', label: 'Creative/Media (e.g., Marketing, Design, Film)' },
      { id: 'healthcare', label: 'Healthcare/Pharma (e.g., Medical Research, Health Tech)' },
      { id: 'other', label: 'Other' },
    ],
  },
]

export function QuizPreview() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId)
  }

  const handleNextQuestion = () => {
    if (selectedOption) {
      setAnswers({ ...answers, [questions[currentQuestion].id]: selectedOption })
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        // Quiz completed
        console.log('Quiz completed!', { ...answers, [questions[currentQuestion].id]: selectedOption })
      }
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="py-24 bg-gray-50 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
        <Subheading>Personalized assessment</Subheading>
          <Heading as="h2" className="mt-2">
            Discover your ideal career path
          </Heading>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Take our 5-minute quiz to help us understand your goals, strengths, and preferences.
          </p>
        </div>

        <div className="mt-16 mx-auto max-w-xl bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-between text-sm text-gray-500 mb-6">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-10">
            <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>
          
          <h3 className="text-xl font-semibold mb-8">{question.title}</h3>
          
          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full text-left p-4 border rounded-xl transition-all ${
                  selectedOption === option.id
                    ? 'border-amber-600 bg-amber-50 ring-2 ring-amber-600'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <div className="mt-10 flex justify-between">
            <Button 
              variant={currentQuestion > 0 ? 'secondary' : 'outline'} 
              className={currentQuestion === 0 ? 'invisible' : ''}
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1)
                  setSelectedOption(answers[questions[currentQuestion - 1].id])
                }
              }}
            >
              Back
            </Button>
            
            <Button
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              className={!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}
            >
              {currentQuestion < questions.length - 1 ? 'Next' : 'See Results'}
            </Button>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your data is secure and will only be used to provide personalized job recommendations.</p>
        </div>
      </Container>
    </div>
  )
}

export default QuizPreview;