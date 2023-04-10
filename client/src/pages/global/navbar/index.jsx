// Libraries
import { AppBar, Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext } from "react";
// import { useContext } from "react";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func";

// Constants
import { activeLink, appbar, burger, link } from "./index.style"; // Design

// Assets
import Logo from 'assets/images/logo.png';

const Index = () => {
    const { drawerToggle, open, setIsActive, isActive } = useContext(GlobalCntxt);

    return (
        <AppBar position= "fixed" sx= { appbar }>
            <Container maxWidth= "lg">
                <Stack direction= "row" justifyContent= "space-between" alignItems= "center" spacing= { 1 }>
                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } component= { Link } to= "/" 
                        onClick= { () => { localStorage.setItem('nav', 'home'); setIsActive('home'); } } sx= {{ textDecoration: 'none' }}>
                        <Avatar alt= "QCACAC" src= { Logo } sx= {{ width: 40, height: 40 }} />
                        <Typography sx= {{ color: '#FFFFFF', fontFamily: 'Gilroy Bold', display: { xs: 'none', md: 'block' } }}>Quezon City Animal Care & Adoption Center E - Services</Typography>
                        <Typography sx= {{ color: '#FFFFFF', fontFamily: 'Gilroy Bold', display: { xs: 'block', md: 'none' } }}>QCACAC E - Services</Typography>
                    </Stack>
                    <Box sx= { burger } onClick= { drawerToggle(!open.left) }><FontAwesomeIcon icon= { solid('bars') } /></Box>
                    <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 4 } sx= {{ display: { xs: 'none', md: 'flex' } }}>
                        <Typography variant= "body2" sx= { isActive === 'home' ? activeLink : link } component= { Link } to= "/" 
                            onClick= { () => { localStorage.setItem('nav', 'home'); setIsActive('home'); } }>Home</Typography>
                        <Typography variant= "body2" sx= { isActive === 'pets' ? activeLink : link } component= { Link } to= "/pets" 
                            onClick= { () => { localStorage.setItem('nav', 'pets'); setIsActive('pets'); } }>Pet Gallery</Typography>
                        <Typography variant= "body2" sx= { isActive === 'services' ? activeLink : link } component= { Link } to= "/services/pet-program" 
                            onClick= { () => { localStorage.setItem('nav', 'services'); setIsActive('services'); } }>Services</Typography>
                        <Typography variant= "body2" sx= { isActive === 'faqs' ? activeLink : link } component= { Link } to= "/faqs" 
                            onClick= { () => { localStorage.setItem('nav', 'faqs'); setIsActive('faqs'); } }>FAQs</Typography>
                    </Stack>
                </Stack>
            </Container>
        </AppBar>
    );
}

export default Index;