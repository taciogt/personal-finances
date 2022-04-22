import React, {FC, ReactElement} from 'react'
import {Card, Typography} from '@material-ui/core'
import {StyledPageCard} from '../components/Surfaces'

export const AssetsList: FC = () => {
  return (
    <StyledPageCard elevation={3}>
      <Card>
        <Typography>Ativos Financeiros</Typography>
      </Card>
    </StyledPageCard>
  )
}
