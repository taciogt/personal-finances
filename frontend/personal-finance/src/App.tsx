import React from 'react';
import './App.css';
import Menu from "./Menu";
import {Container} from "@material-ui/core";
import {SetBudgetForm} from "./SetBudgetForm";
import {makeStyles, styled} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    // height: 48,
    // padding: '0 30px',
  },
})

const StyledContainer = styled(Container)({
  // root:{
  //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  // },
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  // margin: 10,
  height: '100%',
  padding: 10
})

function App() {
  return (
    <div className="App" style={{height: '100%'}}>
      <Menu/>
      <StyledContainer>
        <SetBudgetForm/>
      </StyledContainer>
    </div>
  );
}

export default App;
