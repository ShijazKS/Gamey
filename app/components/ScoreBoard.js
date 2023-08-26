import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ScoreBoard = ({open,point,handleClickOpen,handleClose}) => {
  
  return (
    <div>
      <Dialog
        
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{m:4,ml:10,p:0}}><b>{"Game End !"}</b></DialogTitle>
        <DialogContent sx={{ml:10,mr:10,p:0}}>
          <DialogContentText id="alert-dialog-slide-description">
          <p className='text-black'>{`You get`}{point > 15 ? (<span className='text-green-600 font-semibold'>{` ${point} `}</span>) : (<span className='text-red-600 font-semibold'>{` ${point} `}</span>)}{`points`} </p>
           <p className='text-green-700'> {"Play Again :) "}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Okay</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ScoreBoard;