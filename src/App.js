import React, { Component } from 'react'

import { BrowserRouter } from 'react-router-dom';


// import setAuthToken from './utils/setAuthToken';

// Main Routes file
     
import Routes from './Routes';

// Importing Store file (Redux)

class App extends Component {
  render() {
    return (
     
        <BrowserRouter
        // forceRefresh={false}
        // basename={process.env.PUBLIC_URL}
        >
          <Routes />
        </BrowserRouter>
    )
  }
}


export default App;