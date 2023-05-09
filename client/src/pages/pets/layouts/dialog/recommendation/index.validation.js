import * as Yup from 'yup';

export const validation = () => (
    Yup.object({
        // age: Yup.string().required('This field is required!'),
        // size: Yup.string().required('This field is required!'),
        // color: Yup.string().required('This field is required!'),
        // tags: Yup.string().required('This field is required!')
    })
)