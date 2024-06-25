import React, {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    userChoice: null,
    opponentChoice: null,
    result: '',
    gameState: 'PLAYING',
  }

  getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choicesList.length)
    return choicesList[randomIndex]
  }

  determineResult = (user, opponent) => {
    if (user === opponent) return 'IT IS DRAW'
    if (
      (user === 'ROCK' && opponent === 'SCISSORS') ||
      (user === 'PAPER' && opponent === 'ROCK') ||
      (user === 'SCISSORS' && opponent === 'PAPER')
    ) {
      return 'YOU WON'
    }
    return 'YOU LOSE'
  }

  handleChoiceClick = choiceId => {
    const {score} = this.state
    const user = choiceId
    const opponent = this.getRandomChoice().id
    const gameResult = this.determineResult(user, opponent)

    this.setState(prevState => ({
      userChoice: choicesList.find(choice => choice.id === user),
      opponentChoice: choicesList.find(choice => choice.id === opponent),
      result: gameResult,
      gameState: 'RESULT',
      score:
        gameResult === 'YOU WON'
          ? score + 1
          : gameResult === 'YOU LOSE'
          ? score - 1
          : score,
    }))
  }

  handlePlayAgain = () => {
    this.setState({
      gameState: 'PLAYING',
      userChoice: null,
      opponentChoice: null,
      result: '',
    })
  }

  render() {
    const {score, gameState, userChoice, opponentChoice, result} = this.state

    return (
      <div className="app-container">
        <h1>Rock Paper Scissors</h1>
        <p>Score</p>
        <p className="score">{score}</p>
        {gameState === 'PLAYING' ? (
          <div className="choices-container">
            {choicesList.map(choice => (
              <button
                key={choice.id}
                onClick={() => this.handleChoiceClick(choice.id)}
                data-testid={`${choice.id.toLowerCase()}Button`}
              >
                <img src={choice.imageUrl} alt={choice.id} />
              </button>
            ))}
          </div>
        ) : (
          <div className="result-container">
            <p>{result}</p>
            <div className="choices-result">
              <img
                src={userChoice.imageUrl}
                alt="your choice"
                data-testid="yourChoice"
              />
              <img
                src={opponentChoice.imageUrl}
                alt="opponent choice"
                data-testid="opponentChoice"
              />
            </div>
            <button onClick={this.handlePlayAgain}>PLAY AGAIN</button>
          </div>
        )}

        <Popup
          modal
          trigger={<button type="button">Rules</button>}
          className="popup-content"
        >
          {close => (
            <>
              <div className="rules-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </div>
              <button
                type="button"
                className="close-button"
                data-testid="closeButton"
                onClick={close}
              >
                <RiCloseLine />
              </button>
            </>
          )}
        </Popup>
      </div>
    )
  }
}

export default App
