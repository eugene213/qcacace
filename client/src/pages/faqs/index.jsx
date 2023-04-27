// Libraries
import { Container, Grid, Stack, Typography } from '@mui/material';

// Core
import { FormPrvdr } from 'core/context/FormCntxt.func'; // Provider

// L:ayouts
import Footer from '../global/footer';

// Assets
import Faqs from 'assets/images/faqs.png';
// Custom style
const container = {
    padding: '90px 0 0 0',
    overflowY: 'scroll',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': { display: 'none' }
}

const title = {
    color: '#1B4168',
    fontFamily: 'Tommy Bolder',
    lineHeight: 1,
    transition: 'all 0.2s ease-in-out',
    fontSize: {
        xs: '300%',
        md: '350%'
    }
}

const Index = () => {
    localStorage.setItem('nav', 'faqs');

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 5 } sx= { container }>
            <Container maxWidth= "lg">
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 2 }>
                    <Grid item xs= { 12 } sm= { 5 } md= { 4 }><img src= { Faqs } alt= "fqs" style= {{ width: '100%', height: 'auto', borderRadius: '10px' }} /></Grid>
                    <Grid item xs= { 12 } sm= { 7 } md= { 8 }>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
                            <Typography sx= { title }>FAQs</Typography>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography variant= "h6" sx= {{ fontWeight: 'bold' }} gutterBottom>1. How to Adopt a Pet?</Typography>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ paddingLeft: '20px' }}>
                                        <Typography><b>Step 1:</b> Choose a pet from the pet gallery or you can also use the recommendation system to easily choose a pet that is suitable for you.</Typography>
                                        <Typography><b>Step 2:</b> Click the adopt button and input your email address. The system will then send a code for verification to your email address.</Typography>
                                        <Typography><b>Step 3:</b> Enter the code sent to your email then proceed in uploading the needed documents and filling out personal details for the adoption process.</Typography>
                                        <Typography><b>Step 4:</b> Choose a date for the interview or animal visit.</Typography>
                                        <Typography><b>Step 5:</b> The evaluator will review your application and once approved, an email will be sent to you of the application status including the date of your scheduled interview.</Typography>
                                        <Typography><b>Step 6:</b> The evaluator will proceed to the interview through phone call or google meet. Once approved, an email will be sent regarding the payment.</Typography>
                                        <Typography><b>Step 7:</b> Click the payment button and choose a payment method. Pay adoption fee of P500.00/pet online through gcash or you may visit Animal Care and Adoption Center to pay onsite.</Typography>
                                        <Typography><b>Step 8:</b> Enter the reference number if you pay through gcash. The evaluator will then verify your payment.</Typography>
                                        <Typography><b>Step 9:</b> If it is verified, an email will be sent about the successful payment.</Typography>
                                        <Typography><b>Step 10:</b> Lastly, you can now claim the pet in Animal Care and Adoption Center located at Clemente St., Lupang Pangako, Payatas, Quezon City.</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography variant= "h6" sx= {{ fontWeight: 'bold' }} gutterBottom>2. How to Surrender a Pet?</Typography>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ paddingLeft: '20px' }}>
                                        <Typography><b>Step 1:</b> Fill out the Surrender Pet Application Form.</Typography>
                                        <Typography><b>Step 2:</b> Wait for your application's approval. The system will email you once the application is approved.</Typography>
                                        <Typography><b>Step 3:</b> The pet owner will be interviewed regarding the surrendering of the pet through phone call or google meet. Once approved, an email will be sent regarding the application status and payment details.</Typography>
                                        <Typography><b>Step 4:</b> Pay surrender / Pick up fee of P500.00/pet at the Quezon City Treasurer's Office located at Annex Building, QC Hall Mayaman St., Brgy. Central, Diliman, Quezon City. Once done, enter the reference number of your receipt for verification status.</Typography>
                                        <Typography gutterBottom><b>Step 5:</b> After the payment was verified, please wait for the scheduled pick-up of the surrendered pet.</Typography>
                                        <Typography><b>DISCLAIMER: WE DON'T ENCOURAGE PET OWNERS TO SURRENDER THEIR PETS, WE WILL HAVE TO INTERVIEW YOU FIRST TO EXPLAIN ALL NEEDED DETAILS REGARDING THIS SERVICE.</b></Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                    <Typography variant= "h6" sx= {{ fontWeight: 'bold' }} gutterBottom>3. How to Report a Missing Pet?</Typography>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ paddingLeft: '20px' }} spacing= { 1 }>
                                    <Typography>You can report a missing pet through emailing us at <b>qcacac2017@gmail.com</b>.</Typography>
                                        <Typography>Email subject: Report Missing Pet</Typography>
                                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch">
                                            <Typography>Pet Category:</Typography>
                                            <Typography>Breed:</Typography>
                                            <Typography>Coat:</Typography>
                                            <Typography>Age:</Typography>
                                            <Typography>Gender:</Typography>
                                            <Typography>Color:</Typography>
                                            <Typography>Owner’s Contact No.:</Typography>
                                            <Typography>Description:</Typography>
                                        </Stack>
                                        <Typography>Please also attach a photo of your pet.</Typography>
                                        <Typography>Once verified, we will post it on the website to easily reach people who can help bring them back.</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
            <FormPrvdr><Footer /></FormPrvdr>
        </Stack>
    );
}

export default Index;