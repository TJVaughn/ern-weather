import React from 'react';
import Weather from './modules/weather';
import Footer from './modules/Footer'

import './styles/App.scss';
import './styles/Weather.scss'

function App() {
  return (
    <div className="App">
      <h1>Whether App</h1>
      <hr />
      <Weather />
      <Footer />
    </div>
  );
}

export default App;
