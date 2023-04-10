// Libraries
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

// Core
import { ListPrvdr } from "core/context/ListCntxt.func"; // Provider

// Layouts
import Navbar from './global/navbar';
import Sidebar from './global/sidebar';
import Main from './main';
import Pets from './pets';
import Services from './services';
import FAQs from './faqs';

// Custom styles
const content = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start,',
    alignItems: 'stretch',
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden'
}

const Index = () => {

    return (
        <Box display= "flex">
            <Navbar />
            <Sidebar />
            <Box sx= { content }>
                <Routes>
                    <Route exact path= "/*" element= { <Main /> } />
                    <Route exact path= "/pets/*" element= { <ListPrvdr><Pets /></ListPrvdr> } />
                    <Route exact path= "/services/:srvc/*" element= { <Services /> } />
                    <Route exact path= "/faqs/*" element= { <FAQs /> } />
                </Routes>
            </Box>
        </Box>
    );
}

export default Index;