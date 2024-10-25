import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [texts, setTexts] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    fetch('http://localhost:9000/api/typing/load')
      .then(response => response.json())
      .then(data => {
        setTexts(data);
        console.log(data);
      })
      .catch(error => console.error('데이터를 불러오는 중 오류 발생:', error));
  }, []);

  useEffect(() => {
    if (texts.length > 0) {
      setCurrentText(texts[currentIndex].Content);
    }
    setUserInput('');
    setStartTime(null);
    setTimerRunning(false);
    setWpm(0);
  }, [currentIndex, texts]);

  const handleInputChange = (e) => {
    if (!timerRunning) {
      setTimerRunning(true);
      setStartTime(new Date());
    }
    setUserInput(e.target.value);

    if (e.target.value === currentText) {
      const timeTaken = (new Date() - startTime) / 1000 / 60;
      const wordsTyped = currentText.length / 5;
      setWpm((wordsTyped / timeTaken).toFixed(2));
      setTimerRunning(false);
    }
  };

  const getCharacterClass = (char, index) => {
    if (!userInput[index]) {
      return '';
    }
    return char === userInput[index] ? 'correct' : 'incorrect';
  };

  const handleRestart = () => {
    setUserInput('');
    setStartTime(null);
    setTimerRunning(false);
    setWpm(0);
  };

  const handleNextText = () => {
    if (texts.length > 0) {
      setCurrentIndex((currentIndex + 1) % texts.length);
    }
  };

  return (
    <div className="App">
      <h1>타자 연습기</h1>
      <p className="text-display">
        {currentText ? (
          currentText.split('').map((char, index) => {
            const className = getCharacterClass(char, index);
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })
        ) : (
          <span>로딩 중...</span>
        )}
      </p>
      <textarea
        value={userInput}
        onChange={handleInputChange}
        placeholder="여기에 입력하세요"
        rows="5"
        cols="50"
      ></textarea>
      <div>
        {wpm > 0 && <p>당신의 타자 속도는 {wpm} WPM 입니다.</p>}
        <button onClick={handleRestart}>다시 시작</button>
        <button onClick={handleNextText}>다음 문장</button>
      </div>
    </div>
  );
}

export default App;
