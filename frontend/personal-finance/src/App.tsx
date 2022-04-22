import {Container, createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'
import React, {ReactElement, useState} from 'react'
import './App.css'
import Menu, {MenuItem} from './Menu'
import {SetBudgetForm} from './SetBudgetForm'
import {AccountBalance, AccountBalanceWallet} from '@material-ui/icons'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0074FF'
    },
    secondary: {
      main: '#FFD49F'
    },

  }
}, {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
})


const StyledContainer = styled(Container)(({theme}) =>
  ({
    background: `linear-gradient(30deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
    height: '100%',
    padding: 10,
  })
)


class MenuPageItem extends MenuItem {
  public page: ReactElement = <></>

  setPage(page: ReactElement): MenuPageItem {
    this.page = page
    return this
  }
}

function App(): ReactElement {
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
      <MuiThemeProvider theme={theme}>
        <Menu items={menuItems} handleMenuClick={handleMenuClick}>
          <StyledContainer>
            {menuItems.find(item => item.selected)?.page || <></>}
          </StyledContainer>
        </Menu>
      </MuiThemeProvider>
    </div>
  )
}

export default App
