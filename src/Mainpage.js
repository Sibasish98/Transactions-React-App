import {Backdrop,CircularProgress,Dialog,Switch,FormControlLabel,FormGroup,AppBar,Alert, Fab,Grid,Paper,Table,Button, TableCell, TableBody,TableContainer, TableHead, TableRow, Toolbar, Typography, Skeleton, Snackbar,  DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import {useContext} from 'react'
import MainContext from './contextt'

const Mainpage = (props) => {
    const navigate=useNavigate()
    const [transactionData,setTransactionData] = React.useState([])
    const [fundBalance,setfundBalance] = React.useState('')
    const [fundBalanceLoading,setfundBalanceLoading] = React.useState(false);
    const [transactionDetailsLoading,setransactionDetailsLoading] = React.useState(false);

    const [deleteDilogOpen,setdeleteDilogOpen] = React.useState(false)
    const [deleteID,setDeleteID] = React.useState()
    const [deleteSubject,setdeleteSubject] = React.useState("")
    
    const context = useContext(MainContext);


    
    const darkModeColors = {
      textColor: '#fff',
      mainBackgroundColor: '#121212'
    }
   

    const TableSekeltonCell = () => {
      return (
        <>
          <TableRow>
               <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
               <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
               <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
               <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
               <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
          </TableRow>
                    <TableRow>
                    <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
                    <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
                    <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
                    <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
                    <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
          </TableRow>
          <TableRow>
               <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
               <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
               <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
               <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
               <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
          </TableRow>
                    <TableRow>
                    <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
                    <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
                    <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
                    <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
                    <TableCell><Skeleton  variant="rectangular"  ></Skeleton></TableCell>
          </TableRow>          
        </>
      )
    }
    
    const gettData = () => {
      setransactionDetailsLoading(true)
        //fetch("http://192.168.29.167:5000/transactions")
        fetch("https://testapp202202.herokuapp.com/transactions")
        .then((dt) => {
        
         return dt.json()
        })
        .then((content) => {
          
          setTransactionData(content.transactions);
          setransactionDetailsLoading(false);

      })

    }
    const getFundBalance = () => {
      setfundBalanceLoading(true);
      //fetch("http://192.168.29.167:5000/fundbalance")
      fetch("https://testapp202202.herokuapp.com/fundbalance")
      .then((dt) => dt.json())
      .then((content) => 
      {
        console.log(content)
        setfundBalance(content.balance)
        setfundBalanceLoading(false)
      })

      
    }

    {React.useEffect(gettData,[])}
    {React.useEffect(getFundBalance,[])}

    if (context.snackBarActive)
    {
      setTimeout(() => context.setSnackBarActive(false),3000)
    }


    const OnDarkModeToggle = (ev) => {

      context.setDarkModeActive(ev.target.checked)

    }
    




    const [currentSelectedRecord,setcurrentSelectedRecord] = React.useState(-1);

    const DeleteDilogue = () => {
      return (
        <Dialog  open={deleteDilogOpen}>
            <DialogTitle>
              Delete item  with id {deleteID} and {deleteSubject} subject?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Deleteing a record will erase the record and recalculate the fund balance
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {setdeleteDilogOpen(false);setcurrentSelectedRecord(-1)}} color="secondary">Cancel</Button>
              <Button  onClick={() => sendDeleteRequest(deleteID)} color="secondary" variant="contained">Proceed</Button>
            </DialogActions>
        </Dialog>
      )
    }

    const [isLoading,setisLoading] = React.useState(false)
    const sendDeleteRequest = (id) => {
      setdeleteDilogOpen(false)
      setisLoading(true)
      //fetch("http://192.168.29.167:5000/",{
        fetch("https://testapp202202.herokuapp.com/",{
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id})
      })
      .then((e) => 
      {
        context.setsnackBarTextType(1)
        context.setSnackBarActive(true)
        setdeleteDilogOpen(false)
        setisLoading(false)
        getFundBalance()
        gettData();
      })
    }

    return (

    <div style={{height: '100%',backgroundColor: context.darkModeActive?darkModeColors.mainBackgroundColor:''}}>
            <AppBar  color="primary" position="static">
                <Toolbar ><Typography sx={{ flexGrow: 1 }}>Special Fund</Typography>
                <FormGroup>
                    <FormControlLabel control={<Switch color="secondary" checked={context.darkModeActive} onChange={OnDarkModeToggle}  />} label="Dark Theme" />
                </FormGroup>
                </Toolbar>

            </AppBar>
            <Backdrop open={isLoading}><CircularProgress  color='secondary'></CircularProgress><Typography marginLeft={'2ch'} color={'white'} variant="h5">Deleting...</Typography></Backdrop>
            <DeleteDilogue/>
            <Fab   onClick={() => navigate("/payment")} sx={{position: 'fixed',bottom: '2ch',right: '2ch',display: 'inline'}}color="secondary" aria-label="add">
  <AddIcon />
</Fab>
            <Grid container direction='column' justifyContent="center" alignItems={"center"}>
              <Typography color={context.darkModeActive?darkModeColors.textColor:''} variant="h6">Fund Balance</Typography>
              
              <Typography color={context.darkModeActive?darkModeColors.textColor:''}  variant="h2">{fundBalanceLoading?<Skeleton></Skeleton>:`₹${fundBalance}`}</Typography>
            </Grid>
            <TableContainer component={Paper}>
      <Table  sx={{ maxWidth: '100%',maxHeight: '70vh'}} aria-label="simple table">
        <TableHead>
          <TableRow>
  
            <TableCell >Type</TableCell>
            <TableCell >Subject</TableCell>
            <TableCell >Amount</TableCell>
            <TableCell >Date {"&"} Time</TableCell>
            <TableCell>Transaction ID</TableCell>
          </TableRow>
          </TableHead>
        <TableBody>
          
            {
            transactionDetailsLoading?<TableSekeltonCell/>:
            transactionData.map((data) => 
            <TableRow sx={{backgroundColor:  currentSelectedRecord===data._id?(!context.darkModeActive?"#ef5350":"#c62828"):""}} onClick={() => {
              setcurrentSelectedRecord(data._id)
              setDeleteID(data._id)
              setdeleteSubject(data.subject)
              setdeleteDilogOpen(true)
              
            }}  key={data._id} >

                <TableCell sx={{color: data.type=="debit"?'red':'green'}}>{data.type}</TableCell>
                <TableCell>{data.subject}</TableCell>
                <TableCell>{data.amount}</TableCell>
                <TableCell>{data.datetime}</TableCell>
               
                <TableCell sx={{}} >{data._id}</TableCell>
                
            </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
        



    {context.snackBarActive?<Snackbar open autoHideDuration={2000} >
            <Alert  severity="success" sx={{ width: '100%' }}>
                  {context.snackBarTextType==0?"Payment was successfull":"Deletion was successfull"}
            </Alert>
        </Snackbar>:""}
        </div>
     
        )

}
export default Mainpage