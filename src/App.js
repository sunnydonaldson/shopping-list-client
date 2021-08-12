import './styles.css';
import Login from "./components/Login";
import List from "./components/List";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  

  return (
    <div class="background">
    <h1>Shopping List</h1>
    {/* using react router to navigate to the /shoppint route, or root route. */}
    <Router>
      <Switch>
        <Route path="/shopping">
          {/* displays the custom List component I made */}
          <List/>
        </Route>
        <Route path="/">
          {/* displays the custom Login component I made */}
          <Login/>
        </Route>
        
        
      </Switch>
    </Router>
      
        
        
        
        



      </div>
  );
}

export default App;
