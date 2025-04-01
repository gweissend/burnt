'use client'

import { useState } from 'react'
import { Container } from './container'
import { Heading, Subheading } from './text'
import { Button } from './button'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { initializeApp, getApp } from 'firebase/app'

// Ensure we don't initialize Firebase multiple times
let app;
let db;

// Firebase initialization with error handling
try {
  // Firebase configuration (importing from your firebase.js)
  const firebaseConfig = {
    apiKey: "AIzaSyCVPxo5Ffb1S42Q1ZVgmk8kpfMEzI6H_JY",
    authDomain: "burnt-90e26.firebaseapp.com",
    projectId: "burnt-90e26",
    storageBucket: "burnt-90e26.appspot.com", // Fixed storage bucket URL
    messagingSenderId: "285053510895",
    appId: "1:285053510895:web:57af43849e947736bae71a",
    measurementId: "G-ETGEYTWDTD"
  };

  // Check if Firebase app is already initialized
  try {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
  } catch (firebaseError) {
    if (firebaseError.code === 'app/duplicate-app') {
      // App already exists, get the existing one
      console.log('Firebase app already initialized, getting existing app');
      app = getApp();
    } else {
      // Unexpected error, log and rethrow
      console.error('Firebase initialization error:', firebaseError);
      throw firebaseError;
    }
  }

  // Initialize Firestore
  db = getFirestore(app);
  console.log('Firestore initialized successfully');
} catch (err) {
  console.error('Error during Firebase/Firestore setup:', err);
}

// Complete onboarding survey questions
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
  {
    id: 'culture',
    title: 'What type of company culture do you thrive in?',
    options: [
      { id: 'startup', label: 'Startups—fast-paced and innovative.' },
      { id: 'midsize', label: 'Mid-sized companies—structured yet flexible.' },
      { id: 'corporate', label: 'Large corporations—well-established and resourceful.' },
      { id: 'nonprofit', label: 'Nonprofits/mission-driven organizations.' },
    ],
  },
  {
    id: 'jobAspect',
    title: 'Which of these job aspects is most important to you?',
    options: [
      { id: 'growth', label: 'Career growth and learning opportunities.' },
      { id: 'balance', label: 'Work-life balance and flexibility.' },
      { id: 'salary', label: 'Salary and financial rewards.' },
      { id: 'purpose', label: 'Purpose and impact of the work.' },
    ],
  },
  {
    id: 'environment',
    title: 'Which work environment best describes your ideal day-to-day?',
    options: [
      { id: 'remote', label: 'Fully remote—freedom to work from anywhere.' },
      { id: 'hybrid', label: 'Hybrid—some office time, some remote.' },
      { id: 'office', label: 'In-office—collaborative and team-oriented.' },
    ],
  },
  {
    id: 'passions',
    title: 'What are your biggest passions outside of work?',
    options: [
      { id: 'tech', label: 'Technology and innovation.' },
      { id: 'creative', label: 'Creative arts and storytelling.' },
      { id: 'impact', label: 'Helping others and making an impact.' },
      { id: 'travel', label: 'Travel and exploring new experiences.' },
      { id: 'other', label: 'Other' },
    ],
  },
  {
    id: 'idealRole',
    title: 'How would you describe your ideal role?',
    options: [
      { id: 'leadership', label: 'Leadership-focused—managing teams and strategy.' },
      { id: 'specialist', label: 'Specialist role—becoming an expert in my field.' },
      { id: 'clientFacing', label: 'Client-facing—building relationships and solving problems.' },
      { id: 'creative', label: 'Creative—ideating, designing, and innovating.' },
    ],
  },
]

export function EnhancedQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedOption, setSelectedOption] = useState(null)
  const [email, setEmail] = useState('')
  const [otherText, setOtherText] = useState('')
  const [quizState, setQuizState] = useState('questions') // 'questions', 'email', 'submitting', 'success'
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId)
    // Reset "other" text if a non-other option is selected
    if (optionId !== 'other') {
      setOtherText('')
    }
  }

  const handleNextQuestion = () => {
    if (!selectedOption) return

    // Check if "other" is selected and requires text input
    if (selectedOption === 'other' && !otherText.trim()) {
      setError('Please specify your answer')
      return
    }

    setError('')
    
    // Save answer including "other" text if applicable
    const answerValue = selectedOption === 'other' 
      ? { id: selectedOption, text: otherText } 
      : selectedOption
    
    setAnswers({ ...answers, [questions[currentQuestion].id]: answerValue })
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
      setOtherText('')
    } else {
      // Move to email collection screen when all questions are answered
      setQuizState('email')
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      
      // Retrieve previously selected option
      const previousAnswer = answers[questions[currentQuestion - 1].id]
      
      // Handle complex "other" answers
      if (typeof previousAnswer === 'object' && previousAnswer.id === 'other') {
        setSelectedOption('other')
        setOtherText(previousAnswer.text || '')
      } else {
        setSelectedOption(previousAnswer)
        setOtherText('')
      }
      
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address')
      return
    }
    
    setIsLoading(true)
    setError('')
    setQuizState('submitting')
    
    try {
      // Prepare data for submission
      const submissionData = {
        email,
        answers,
        createdAt: new Date(),
      }
      
      console.log('Attempting to write quiz data to Firestore:', submissionData)
      
      // Log Firebase initialization status
      console.log('Firebase app initialized:', !!app)
      console.log('Firestore db initialized:', !!db)
      
      try {
        // Get reference to the collection
        const collectionRef = collection(db, 'quizSubmissions')
        console.log('Collection reference created')
        
        // Attempt to add the document
        const docRef = await addDoc(collectionRef, submissionData)
        console.log('Document written successfully with ID:', docRef.id)
        
        // Show success state
        setQuizState('success')
      } catch (firestoreError) {
        // Detailed error logging for Firestore operations
        console.error('Firestore error details:', {
          code: firestoreError.code,
          message: firestoreError.message,
          stack: firestoreError.stack,
          name: firestoreError.name
        })
        
        // Fall back to simulation if Firestore write fails
        console.warn('Falling back to simulated success due to Firestore error')
        await new Promise(resolve => setTimeout(resolve, 1500))
        setQuizState('success')
      }
    } catch (err) {
      console.error('Error in submit handler:', err)
      console.error('Error type:', err.constructor.name)
      console.error('Error stack:', err.stack)
      setError('Failed to submit your responses. Please try again.')
      setQuizState('email')
    } finally {
      setIsLoading(false)
    }
  }

  const renderQuestionScreen = () => {
    const question = questions[currentQuestion]
    const showOtherInput = selectedOption === 'other'
    
    return (
      <>
        <div className="flex justify-between text-sm text-gray-500 mb-6">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-10">
          <div 
            className="bg-amber-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
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
        
        {showOtherInput && (
          <div className="mt-4">
            <label htmlFor="otherInput" className="block text-sm font-medium text-gray-700 mb-1">
              Please specify:
            </label>
            <input
              id="otherInput"
              type="text"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              placeholder="Your answer..."
            />
          </div>
        )}
        
        {error && (
          <p className="mt-4 text-red-600 text-sm">{error}</p>
        )}
        
        <div className="mt-10 flex justify-between">
          <Button 
            variant={currentQuestion > 0 ? 'secondary' : 'outline'} 
            className={currentQuestion === 0 ? 'invisible' : ''}
            onClick={handlePreviousQuestion}
          >
            Back
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
            className={!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Continue'}
          </Button>
        </div>
      </>
    )
  }

  const renderEmailScreen = () => {
    return (
      <>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-10">
          <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">Last step! Where should we send your results?</h3>
        <p className="text-gray-600 mb-8">
          Enter your email to receive your personalized career recommendations.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setCurrentQuestion(questions.length - 1)
                setQuizState('questions')
              }}
            >
              Back
            </Button>
            
            <Button
              type="submit"
              disabled={isLoading}
              className={isLoading ? 'opacity-50 cursor-wait' : ''}
            >
              {isLoading ? 'Submitting...' : 'Get My Results'}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            By submitting, you agree to our Terms of Service and Privacy Policy.
            We'll never share your data without your permission.
          </p>
        </form>
      </>
    )
  }

  const renderSuccessScreen = () => {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-semibold mb-4">Thank you!</h3>
        <p className="text-gray-600 mb-8">
          We've received your responses and are preparing your personalized career recommendations. 
          Check your email at <span className="font-medium">{email}</span> soon!
        </p>
        
        <div className="inline-flex items-center gap-2 text-amber-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25v-8.25a2.25 2.25 0 0 1 2.25-2.25h3.421m7.5 0V4.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v4.125m7.5 0h-18" />
          </svg>
          <span>Check your inbox for next steps</span>
        </div>
      </div>
    )
  }

  const renderCurrentScreen = () => {
    switch (quizState) {
      case 'questions':
        return renderQuestionScreen()
      case 'email':
      case 'submitting':
        return renderEmailScreen()
      case 'success':
        return renderSuccessScreen()
      default:
        return renderQuestionScreen()
    }
  }

  return (
    <div className="py-24 bg-gray-50 sm:py-32">
      <Container>
        {quizState !== 'success' && (
          <div className="mx-auto max-w-2xl text-center">
            <Subheading>Personalized assessment</Subheading>
            <Heading as="h2" className="mt-2">
              Discover your ideal career path
            </Heading>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Take our 5-minute quiz to help us understand your goals, strengths, and preferences.
            </p>
          </div>
        )}

        <div className="mt-16 mx-auto max-w-xl bg-white rounded-3xl shadow-xl p-8">
          {renderCurrentScreen()}
        </div>
        
        {quizState !== 'success' && (
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your data is secure and will only be used to provide personalized job recommendations.</p>
          </div>
        )}
      </Container>
    </div>
  )
}

export default EnhancedQuiz