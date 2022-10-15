import React, {FC, useState} from 'react'
import {
  Box,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import {PageContainer} from '../components/Surfaces'
import {makeStyles, styled} from '@material-ui/core/styles'
import {centsToBRL} from '../domain/Budget'
import {CreateAsset} from '../components/CreateAsset'
import {Asset, AssetGroup} from '../domain/Assets'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const assetGroups = [
  new AssetGroup('Pós-fixado'),
  new AssetGroup('Pré-fixado'),
  new AssetGroup('Inflação'),
  new AssetGroup('Multimercado'),
  new AssetGroup('Renda Variável'),
  new AssetGroup('internacional'),

]

const defaultAssets = [
  new Asset('Poupanca', 10000, assetGroups[0]),
  new Asset('Tesouro Selic', 250000, assetGroups[0]),
  new Asset('Fundo Multimercado', 2000, assetGroups[3]),
  new Asset('Carteira de Ações', 15000, assetGroups[4]),
]

const StyledBox = styled(Box)(({theme}) => ({
  padding: theme.spacing(2, 0),
}))

export const AssetsList: FC = () => {
  const classes = useStyles()

  const [assets, setAssets] = useState(defaultAssets)

  const createAssetHandler = (newAsset: Asset) => {
    setAssets([...assets, newAsset])
  }

  return (
    <Container maxWidth='md'>
      <PageContainer elevation={3}>
        <Typography variant='h5'>Ativos Financeiros</Typography>
        <StyledBox><Divider/></StyledBox>

        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Grupo</TableCell>
                <TableCell>Valor Atual</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map(asset =>
                <TableRow key={asset.name}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.group.name}</TableCell>
                  <TableCell>{centsToBRL(asset.currentValue)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box marginTop={2} flexDirection='row-reverse' width='100%' display='flex'>
          <CreateAsset onSave={createAssetHandler} assetGroups={assetGroups}/>
        </Box>
      </PageContainer>
    </Container>
  )
}
