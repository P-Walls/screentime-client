import React from 'react';
import './App.css';
import Main from './Components/Site/Main/Main';
import 'fontsource-roboto';
import Header from './Components/Site/Header/Header';
import Footer from './Components/Site/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
