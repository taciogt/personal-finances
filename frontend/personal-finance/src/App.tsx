import {Container} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'
import React, {ReactElement, useState} from 'react'
import './App.css'
import Menu, {MenuItem} from './Menu'
import {SetBudgetForm} from './SetBudgetForm'
import {AccountBalance, AccountBalanceWallet, BlurOn, SvgIconComponent} from '@material-ui/icons'

const StyledContainer = styled(Container)({
  background: 'linear-gradient(30deg, #FFD49F 30%, #0074FF 90%)',
  height: '100%',
  padding: 10,
})

class MenuPageItem extends MenuItem {
  public page: ReactElement = <></>

  setPage(page: ReactElement): MenuPageItem {
    this.page = page
    return this
  }
}

function App() {
  const [menuItems, setMenuItems] = useState([
    new MenuPageItem(<AccountBalanceWallet/>, 'Orçamento Mensal', true).setPage(<SetBudgetForm/>),
    new MenuPageItem(<AccountBalance/>, 'Ativos Financeiros')
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
        {menuItems.find(item => item.selected)?.page || <></>}
      </StyledContainer>
    </div>
  )
}

export default App
