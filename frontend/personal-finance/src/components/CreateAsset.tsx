import Button from '@material-ui/core/Button'
import React, {ChangeEvent, FC, useState} from 'react'
import {Box, FormControl, MenuItem, Modal, Paper, Select, TextField, Typography} from '@material-ui/core'
import {createStyles, makeStyles, styled, Theme} from '@material-ui/core/styles'
import {Asset, AssetGroup} from '../domain/Assets'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      // minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
)

const StyledModal = styled(Modal)(({theme}) => ({
  top: '50%',
  left: '50%',
  // transform: 'translate(-50%, -50%)',
  // position: 'absolute',
  // width: 600,
  // // height: 600,
  // backgroundColor: theme.palette.background.paper,
  // border: '2px solid #000',
  // boxShadow: theme.shadows[5],
  // // padding: theme.spacing(2, 4, 3),
}))

const StyledCard = styled(Paper)(({theme}) => ({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  minWidth: 400,
  // height: 600,
  // backgroundColor: theme.palette.background.paper,
  // border: '2px solid #000',
  // boxShadow: theme.shadows[5],
  padding: theme.spacing(2),
  // alignContent: 'center'
}))


interface CreateAssetProps {
  assetGroups: AssetGroup[]
  onSave: (asset: Asset) => void
}


export const CreateAsset: FC<CreateAssetProps> = ({assetGroups, onSave}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [assetName, setAssetName] = useState('')
  const [assetValue, setAssetValue] = useState(0)

  const [assetGroup, setAssetGroup] = useState<AssetGroup | undefined>(undefined)
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setAssetGroup(assetGroups.find(group => group.id === event.target.value))
  }

  const saveButtonHandler = () => {
    if (assetGroup === undefined) {
      console.log('failed to set asset group')
      return
    }
    onSave(new Asset(assetName, assetValue, assetGroup))
    setOpen(false)
  }


  return <>
    <Button color='primary' variant='contained' onClick={() => setOpen(true)}>
      <Typography variant='button'>+ Novo Ativo</Typography>
    </Button>
    <StyledModal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
      open={open}
      onClose={() => setOpen(false)}>
      <StyledCard elevation={4}>
        <Box>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography variant='h6'>
              Novo Ativo
            </Typography>
          </Box>
          <FormControl className={classes.formControl} onSubmit={event => console.log('on submit callback')}>
            <Box width="40%">
              <TextField required label='Nome do ativo' onChange={event => setAssetName(event.target.value)}/>
              <TextField required label='Valor do ativo' onChange={event => setAssetValue(+event.target.value)}/>
            </Box>
            <Box marginTop={2}>
              <Select label='Classe de Ativo' value={assetGroup?.id} onChange={handleChange}>
                {assetGroups.map(assetGroup =>
                  <MenuItem key={assetGroup.id} value={assetGroup.id}>{assetGroup.name}</MenuItem>
                )}
              </Select>
            </Box>
            <Box marginTop={1} display='flex' flexDirection='column' alignItems='center'>
              <Button color='primary' variant='contained' onClick={saveButtonHandler} type="submit">
                <Typography variant='button'>Salvar</Typography>
              </Button>
            </Box>
          </FormControl>
        </Box>
      </StyledCard>
    </StyledModal>
  </>
}
