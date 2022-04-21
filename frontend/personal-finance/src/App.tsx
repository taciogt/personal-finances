import {Container} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'
import React, {useState} from 'react'
import './App.css'
import Menu, {MenuItem} from './Menu'
import {SetBudgetForm} from './SetBudgetForm'
import {AccountBalance, AccountBalanceWallet, BlurOn} from '@material-ui/icons'

const StyledContainer = styled(Container)({
  background: 'linear-gradient(30deg, #FFD49F 30%, #0074FF 90%)',
  height: '100%',
  padding: 10,
})


function App() {
  const [menuItems, setMenuItems] = useState([
    new MenuItem(<AccountBalanceWallet/>, 'Orçamento Mensal', true),
    new MenuItem(<AccountBalance/>, 'Ativos Financeiros')
  ])

  const handleMenuClick = (index: number) => {
    setMenuItems(menuItems.map((item, i) => {
      item.selected = i === index
      return item
    }))
  }

  return (
    <div className="App" style={{height: '100%'}}>
      <Menu items={menuItems} handleMenuClick={handleMenuClick}/>
      <StyledContainer maxWidth={false}>
        <SetBudgetForm/>
      </StyledContainer>
    </div>
  )
}

export default App
