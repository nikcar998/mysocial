import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from './Routes';
function App() {

    return (
        <Router>
        <div>
            <Routes />
        </div>
        </Router>
              
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

