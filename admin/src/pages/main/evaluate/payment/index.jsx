// Libraries
import { Stack, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";

// Core
import { theme } from "core/global/theme/index.style"; // Theme
import { ListPrvdr } from "core/context/ListCntxt.func"; // Provider
import { FormPrvdr } from "core/context/FormCntxt.func"; // Provider

// Layouts
import List from "./layouts/list";
import Form from "./layouts/form";

//Custom styles
const container = {
    overflow: 'scroll',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': { display: 'none' }
}

const input = {
    MuiInput: {
        styleOverrides: {
            root: {
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&.Mui-disabled:before': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
            },
            input: { textTransform: 'uppercase', fontWeight:'bold' }
        }
    }
}

const Index = () => {
    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "flex-start" sx= { container }>
            <Routes>
                <Route exact path= "/" element= { <ThemeProvider theme= { theme(input) }><ListPrvdr><List /></ListPrvdr></ThemeProvider> } />
                <Route exact path= "/form/:type/:id" element= { <FormPrvdr><Form /></FormPrvdr> } />
            </Routes>
        </Stack>
    );
}

export default Index;