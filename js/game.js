const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Որ թիվը կստանանք, եթե 16-ը մեծացնենք 25%-ով',
        choice1: '20',
        choice2: '12',
        choice3: '24',
        choice4: '30',
        answer: 1,
    },
    {
        question: 'Գտնել այն թիվը, որի 2/3 մասը հավասար է 18-ի',
        choice1: '12',
        choice2: '21',
        choice3: '27',
        choice4: '36',
        answer: 3,
    },
    {
        question: '12-ի բազմապատիկ քանի երկնիշ թիվ կա։',
        choice1: '5',
        choice2: '6',
        choice3: '7',
        choice4: '8',
        answer: 4,
    },
    {
        question: 'Ինչ մնացորդ կստացվի 45-ը 7-ի բաժանելիս',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '6',
        answer: 2,
    },
    {
        question: 'Լուծել հավաարումը 2x(x-1) = 3(x-1)',
        choice1: '1,5',
        choice2: '1',
        choice3: '1 և 3,5',
        choice4: '1 և 1,5',
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()