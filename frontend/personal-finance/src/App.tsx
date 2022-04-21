import React from 'react'
import './App.css'
import Menu from './Menu'
import {SetBudgetForm} from './SetBudgetForm'
import {Container} from "@mui/material";
import {styled} from '@mui/material/styles'

// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   },
// })

const StyledContainer = styled(Container)({
  background: 'linear-gradient(30deg, #FFD49F 30%, #0074FF 90%)',
  height: '100%',
  padding: 10,
})

// const StyledContainer = styled(Container)`
//  background: 'linear-gradient(30deg, #FFD49F 30%, #0074FF 90%)',
//   height: '100%',
//   padding: 10,
//   `


function App() {
  return (
    <div className="App" style={{height: '100%'}}>
      <Menu/>
      <StyledContainer maxWidth={false}>
        <SetBudgetForm/>
      </StyledContainer>
    </div>
  )
}

export default App
