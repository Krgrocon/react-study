import React from 'react';
import ReactDOM from 'react-dom/client'; // 최신 버전 React에서는 이렇게 import합니다.
import './index.css'; // 스타일을 적용할 CSS 파일
import ShoppingList from './ShoppingList'; // ShoppingList 컴포넌트 import

const root = ReactDOM.createRoot(document.getElementById('root')); // React 18부터는 createRoot 사용
root.render(
  <ShoppingList name="Mark" /> // ShoppingList 컴포넌트 렌더링
);
