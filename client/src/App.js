import React from 'react';
import Weather from './modules/weather'

import './styles/App.scss';
import './styles/Weather.scss';
import './styles/Today.scss';
import './styles/ThisWeek.scss'
import './styles/Hourly.scss'

function App() {
  return (
    <div>
      <Weather />
    </div>
  );
}

export default App;

