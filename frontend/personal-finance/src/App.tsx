import React from 'react';
import './App.css';
import Menu from "./Menu";
import {Container} from "@material-ui/core";
import {SetBudgetForm} from "./SetBudgetForm";

function App() {
  return (
    <div className="App">
      <Menu/>
      <Container>
        <SetBudgetForm/>
      </Container>
    </div>
  );
}

export default App;
