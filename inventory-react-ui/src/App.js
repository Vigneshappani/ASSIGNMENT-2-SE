import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import NotFoundPage from "./pages/NotFound";
import CustomerRootPage from "./pages/customer/RootPage";
import 'react-dropzone-uploader/dist/styles.css'


function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/app/dashboard" />
            </Route>
            <Route path="/app" component={CustomerRootPage}></Route>
            <Route exact path="" component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
}

export default App;
