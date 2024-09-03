import React from 'react';
import Scraper from './Scraper';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
     <Switch>
        <Route exact path="/">
          <Scraper />
        </Route>
     </Switch>
     </Router>
    </div>
  );
}

export default App;
