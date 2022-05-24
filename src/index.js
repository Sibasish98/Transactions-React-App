import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import MainPage from './Mainpage'
import MainContext from './contextt'
import { createTheme, ThemeProvider} from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
    <BrowserRouter>

    <Launch/>

    </BrowserRouter>
);
function Launch()
{
      //use local storage for dark theme value



     



    const [snackBarActive,setSnackBarActive] = React.useState(false)
    const [themeLoading,setthemeLoading] = React.useState(true);

    const [snackBarTextType,setsnackBarTextType] = React.useState(0)
let darkTheme = false;
    React.useEffect(() => {
      const tempThemee = localStorage.getItem('darktheme')
    
      setDarkModeActive(tempThemee== 'true')
      setthemeLoading(false)
    },[])
    const [darkModeActive,setDarkModeActive] = React.useState(darkTheme)

    React.useEffect(() => {
      localStorage.setItem('darktheme',darkModeActive)
     
    },[darkModeActive])
    
    const theme = createTheme({
      palette: {
        /*primary: {
          main: '#42a5f5'
          //main: '#555555'
        }*/
        mode: darkModeActive?'dark':'light'
      }
    });


    if (!themeLoading)
    return (
      <ThemeProvider theme={theme}>
        <MainContext.Provider value={{snackBarActive,setSnackBarActive,darkModeActive,setDarkModeActive,snackBarTextType,setsnackBarTextType}}>
        <Routes>
           <Route  path='/' element={<MainPage/>}/>
           <Route path="/payment" element={<App/>}/>
        </Routes>
        </MainContext.Provider>
        </ThemeProvider>
      
    )
    else
    return ""
}
