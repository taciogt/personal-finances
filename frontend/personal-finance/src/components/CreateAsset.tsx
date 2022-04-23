import Button from '@material-ui/core/Button'
import React, {FC, useState} from 'react'
import {Box, Card, Container, Modal, Paper, TextField, Typography} from '@material-ui/core'
import {styled} from '@material-ui/core/styles'

const StyledModal = styled(Modal)(({theme}) => ({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  // width: 600,
  // height: 600,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  // padding: theme.spacing(2, 4, 3),
}))

const StyledCard = styled(Paper)(({theme}) => ({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  // width: 600,
  // height: 600,
  // backgroundColor: theme.palette.background.paper,
  // border: '2px solid #000',
  // boxShadow: theme.shadows[5],
  padding: theme.spacing(2),
  // alignContent: 'center'
}))


export const CreateAsset: FC = () => {
  const [open, setOpen] = useState(false)

  return <>
    <Button color='primary' variant='contained' onClick={() => setOpen(true)}>
      <Typography variant='button'>+ Novo Ativo</Typography>
    </Button>
    <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
      open={open}
      onClose={() => setOpen(false)}>
      <StyledCard elevation={4}>
        <Typography variant='h6'>Novo Ativo</Typography>
        <form>
          <TextField required label='Nome do ativo'/>
        </form>
        <Box marginTop={1} display='flex' flexDirection='column' alignItems='center'>
          <Button color='primary' variant='contained' >
            <Typography variant='button'>Salvar</Typography>
          </Button>
        </Box>
      </StyledCard>
    </Modal>
  </>
}
