// Libraries
import { Container, Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// Core
import { ListCntxt } from "core/context/ListCntxt.func"; // Provider
import { FormPrvdr } from "core/context/FormCntxt.func"; // Provider
import { ReminderPrvdr } from "core/context/ReminderCntxt.func"; // Provider
import { GlobalCntxt } from "core/context/GlobalCntxt.func"; // Context
import { useGet, usePost } from "core/global/function/index.func"; // Function
import { look, records } from "core/api/index.func"; // API
import { RecommendationPrvdr } from "core/context/Recommendation"; // Provider

// Layouts
import List from "./layouts/list";
import Form from "./layouts/form";
import Footer from "pages/global/footer";

// Constants
import { container } from "./index.style"; // Styles

const Index = () => {
    localStorage.setItem('nav', 'pets');
    const { setList } = useContext(ListCntxt);
    const { setIsActive } = useContext(GlobalCntxt);
    const { isFetching: fetching } = 
        useGet({ key: ['pet_list'], fetch: records({ table: 'tbl_pets', data: { is_adopt: 0 } }), options: { refetchOnWindowFocus: false }, onSuccess: (data) => setList(data) });
    const { mutate: find, isLoading: finding } = usePost({ fetch: look, onSuccess: (data) => setList(data) });

    useEffect(() => { setIsActive(localStorage.getItem('nav')); }, [ setIsActive ]);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= { container }>
            <Routes>
                <Route exact path= "/*" element= {
                    <Container maxWidth= "lg">
                        <FormPrvdr>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                <FormPrvdr>
                                    <RecommendationPrvdr>
                                        <ReminderPrvdr>
                                            <List fetching= { fetching } find= { find } finding= { finding } />
                                        </ReminderPrvdr>
                                    </RecommendationPrvdr>
                                </FormPrvdr>
                            </Stack>
                        </FormPrvdr>
                    </Container>
                } />
                <Route exacth path= "/:id/adopt/*" element= { <FormPrvdr><Form /></FormPrvdr> } />
            </Routes>
            <FormPrvdr><Footer /></FormPrvdr>
        </Stack>
    );
}

export default Index;