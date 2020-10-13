import React from 'react';
import './App.css';
import Main from './Components/Site/Main/Main';
import 'fontsource-roboto';
import Footer from './Components/Site/Footer/Footer';
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
