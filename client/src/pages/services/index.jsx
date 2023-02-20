// Libraries
import { useState } from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";

// Core
import { ListPrvdr } from "core/context/ListCntxt.func"; // Provider
import { FormPrvdr } from "core/context/FormCntxt.func"; // Provider

// Layouts
import AnimalCare from "./contents/AnimalCare";
import MissingPets from "./contents/MissingPets";
import PetProgram from "./contents/PetProgram";
import Surrender from "./contents/Surrender";

// Constants
import { container, tab, tabactive } from "./index.style"; // Styles

const Index = () => {
    localStorage.setItem('nav', 'services');
    const [ content, setContent ] = useState('pet-program');

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 } divider={ <Divider orientation="horizontal" flexItem /> } sx= {{ padding: '90px 0 0 0', height: '100%' }}>
            <Container maxWidth= "lg">
                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 } sx= {{ overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
                    <Typography sx= { content === 'pet-program' ? tabactive : tab } onClick= { () => setContent('pet-program') }>Pet Program</Typography>
                    <Typography sx= { content === 'animal-care' ? tabactive : tab } onClick= { () => setContent('animal-care') }>Animal Care</Typography>
                    <Typography sx= { content === 'missing-pet' ? tabactive : tab } onClick= { () => setContent('missing-pet') }>Missing Pets</Typography>
                    <Typography sx= { content === 'surrender' ? tabactive : tab } onClick= { () => setContent('surrender') }>Surrender</Typography>
                </Stack>
            </Container>
            { content === 'pet-program' ? <ListPrvdr><PetProgram /></ListPrvdr> :
                content === 'animal-care' ? <AnimalCare /> :
                content === 'missing-pet' ? <ListPrvdr><MissingPets /></ListPrvdr> :
                content === 'surrender' ? <FormPrvdr><Surrender /></FormPrvdr> : '' }
        </Stack>
    );
}

export default Index;