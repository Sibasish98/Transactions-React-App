import {AppBar,InputAdornment ,Backdrop, Button, CircularProgress, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Toolbar, Typography} from '@mui/material'
import React,{useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import MainContext from './contextt'


function App(props) {
 const [subject,setSubject] = React.useState("")
 const [amount,setTransactionAmount] = React.useState('')
 const [type,setType] = React.useState('credit')
 const [subjectEmptyError,setsubjectEmptyError] = React.useState(false);
 const [amountEmptyError,setAmountEmptyError] = React.useState(false);


  const context = useContext(MainContext)

  const [isLoading,setisLoading] = React.useState(false)

  const navigate = useNavigate();

 
  const darkModeColors = {
    textColor: '#fff',
    mainBackgroundColor: '#121212'
  }

 
  return (
    <div style={{height: '100%',backgroundColor: context.darkModeActive?darkModeColors.mainBackgroundColor:''}}>
            
      <AppBar color="primary" position='static' >
        <Toolbar sx={{justifyContent: 'center'}}>
          <Typography >Payment</Typography>
        </Toolbar>
      </AppBar>
     <Grid container 
 spacing={2} direction={'column'} sx={{height: '100%'}} justifyContent='center'
 alignItems={'center'}
 >
          <Grid container item justifyContent={'center'} spacing={2}>
        <Grid item>
          <div style={{maxWidth: '60vw'}}>
          <TextField error={subjectEmptyError} helperText={subjectEmptyError?"Must have a subject of transaction":""} value={subject} onChange={(ne) => setSubject(ne.target.value)} sx={{}} label="Subject"></TextField></div></Grid>
    
        </Grid>

        <Grid  item>
        <div style={{maxWidth: '60vw'}}>
        <TextField error={amountEmptyError} 
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
        helperText={amountEmptyError?"Amount of transaction cannot be empty or zero":""} type="number" value={amount} onChange={(ne) => setTransactionAmount(ne.target.value)} label="Amount"></TextField>
        </div>
        </Grid>
        
        


        <Grid item>
          <FormLabel sx={{color: context.darkModeActive?darkModeColors.textColor:''}}>Transaction Type</FormLabel>
          <RadioGroup name="transaction-type" row value={type} onChange={(nt) => setType(nt.target.value)}>
            <FormControlLabel sx={{color: context.darkModeActive?darkModeColors.textColor:''}} value="credit" control={<Radio color="secondary"/>} label="Credit"></FormControlLabel>
            <FormControlLabel sx={{color: context.darkModeActive?darkModeColors.textColor:''}}value="debit" control={<Radio color="secondary"/>} label="Debit"></FormControlLabel>
          </RadioGroup>
        </Grid>
       

        <Grid item>
        <Button color="secondary" onClick={onPayButtonClicked} sx={{marginTop: '20px',width: '20ch'}} variant='contained'>PAY</Button>
        </Grid>
        <Grid item>
        <Button color="secondary" onClick={() => navigate("/")} sx={{marginTop: '10px',width: '20ch'}} fullWidth variant='outlined'>CANCEL</Button>
        </Grid>
        </Grid>
        <Backdrop open={isLoading}><CircularProgress  color='secondary'></CircularProgress><Typography marginLeft={'2ch'} color={'white'} variant="h5">Payment Processing...</Typography></Backdrop>
    </div>
  );
  function onPayButtonClicked()
  {
    //setisLoading((prev) => !prev)
    //setTimeout(() => setisLoading((prev) => !prev),3000)

    //Some validation code
    let proceed = true;
    if (subject.length == 0 )
    {
      proceed = false;
      setsubjectEmptyError(true)
    }
    else{
      setsubjectEmptyError(false)
    }
    if (parseInt(amount) == 0 || amount=="")
    {
      proceed = false;
      setAmountEmptyError(true)
    }
    else {
      setAmountEmptyError(false)
    }
    if (!proceed) return
    

    setisLoading(true)
    //fetch("http://192.168.29.167:5000/transactions",{
    fetch("https://testapp202202.herokuapp.com/transactions",{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        type: type,
        subject: subject,
        amount: amount,
        //datetime: new Date().toString(),
      })
    }
      ).then((dt) => {
        setisLoading(false)
        context.setSnackBarActive(true)
        context.setsnackBarTextType = 0
       navigate("/")
      })


    /*******Updating the balance shifted from client side to server side*********/
      //update the fund balance
      ///get fund balance
     /* let balancee = 0
      fetch("http://192.168.29.167:3500/fundbalance")
      .then((dt) => dt.json())
      .then((content) => 
      {return content.balance})
      .then((bal) => {
        if (type == "credit"){
          return parseInt(bal)+parseInt(amount);
        }
        else
        return bal-amount;
      })
      .then((newBalance) => {
        fetch("http://192.168.29.167:3500/fundbalance",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({balance: newBalance})
      });
      setisLoading(false)
      context.setSnackBarActive(true)
      navigate("/")
    }
      )*/
  }
}

export default App;
