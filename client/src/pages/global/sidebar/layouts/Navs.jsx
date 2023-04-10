// Libraries
import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";

// Core
import { GlobalCntxt } from "core/context/GlobalCntxt.func"; // Context

// Constants
import { activeLink, link, navcontainer } from "../index.style"; // Styles

const Navs = () => {
    const{ setOpen, setIsActive, isActive } = useContext(GlobalCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { navcontainer } spacing= { 2 }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                <Typography variant= "body2" sx= {{ fontWeight: 'bold', color: '#204c6f', fontSize: '20px' }}>Hello Furr, Looking for pet?</Typography><br></br>
                <Typography variant= "body2" sx= {{ fontWeight: 'bold', color: '#64a93e' }}>Menu</Typography>
                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                    <Typography variant= "body1" component= { Link } to= "/" color= "text.secondary" 
                        onClick= { () => { setOpen({ left: false }); localStorage.setItem('nav', 'home'); setIsActive('home'); } } sx= { isActive === 'home' ? activeLink : link }>Home</Typography>
                    <Typography variant= "body1" component= { Link } to= "/pets" color= "text.secondary" 
                        onClick= { () => { setOpen({ left: false }); localStorage.setItem('nav', 'pets'); setIsActive('pets'); } } sx= { isActive === 'pets' ? activeLink : link }>Pets</Typography>
                    <Typography variant= "body1" component= { Link } to= "/services/pet-program" color= "text.secondary" 
                        onClick= { () => { setOpen({ left: false }); localStorage.setItem('nav', 'services'); setIsActive('services'); } } sx= { isActive === 'services' ? activeLink : link }>Services</Typography>
                    <Typography variant= "body1" component= { Link } to= "/faqs" color= "text.secondary" 
                        onClick= { () => { setOpen({ left: false }); localStorage.setItem('nav', 'faqs'); setIsActive('faqs'); } } sx= { isActive === 'faqs' ? activeLink : link }>FAQs</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Navs;