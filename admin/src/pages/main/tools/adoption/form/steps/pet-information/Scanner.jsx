// Libraries
import { Stack } from "@mui/material";
import QrReader from 'react-qr-reader';

const Scanner = ({ setPet, setIsscan }) => {

    return (
        <Stack direction= "row" justifyContent= "center" alignItems= "center" sx= {{ width: '100%', height: '100vh' }}>
            <QrReader delay={ 3000 } onError= { err => console.log(err) } style= {{ width: '100%', height: '100%' }} facingMode= "user"
                onScan={ data => { if(data !== null) { setPet(data); setIsscan(false); } } } />
        </Stack>
    );
}

export default Scanner;