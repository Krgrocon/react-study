// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';







function App() {
  const texts = [
    '失敗は成功のもと','明日は明日の風が吹く','七転び八起き','努力は必ず報われる','夢は逃げない、逃げるのはいつも自分だ','心配するよりも、まずやってみよう'
    ,'笑う門には福来る','石の上にも三年','時間は待ってくれない','今日という日は、二度と戻ってこない'
  ]; //타자 배열 저장 
  const hiragana = [
    'しっぱいはせいこうのもと' , 'あしたはあしたのかぜがふく', 'ななころびやおき' , 'どりょくはかならずむくわれる' , 'ゆめはにげない、にげるのはいつもじぶんだ'
    ,'しんぱいするよりも、まずやってみよう','わらうかどにはふくきたる','いしのうえにもさんねん','わらうかどにはふくきたる','いしのうえにもさんねん','じかんはまってくれない','きょうというひは、にどともどってこない'
  ];

  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    setCurrentText(texts[currentIndex]);
    setUserInput('');
    setStartTime(null);
    setTimerRunning(false);
    setWpm(0);
  }, [currentIndex]); // texts 제거
  
  

  const handleInputChange = (e) => {
    if (!timerRunning) {
      setTimerRunning(true);
      setStartTime(new Date());
    }
    setUserInput(e.target.value);

    if (e.target.value === currentText) {
      // 타이핑 완료 시
      const timeTaken = (new Date() - startTime) / 1000 / 60; // 분 단위
      const wordsTyped = currentText.length / 5; // 평균 단어 길이 5자로 계산
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
    setCurrentIndex((currentIndex + 1) % texts.length);
  };


  //onChnage로 인해서 값이 변경될때마다 함수호출
  return (
    <div className="App">
      <h1>타자 연습기</h1>
      <p className="text-display">
        {currentText.split('').map((char, index) => {
          const className = getCharacterClass(char, index);
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
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
