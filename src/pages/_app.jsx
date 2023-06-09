import 'styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from '@nextui-org/react';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}


function InitiateWeb(props) {
  const queryClient = new QueryClient();
  return ( 
      <QueryClientProvider client={queryClient}>
            <NextUIProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ToastContainer/>
                <MyApp {...props} />
              </LocalizationProvider>
            </NextUIProvider>
      </QueryClientProvider>
  )
}

export default InitiateWeb
