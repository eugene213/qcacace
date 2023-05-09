// Libraries
import { createContext, useState } from "react";

export const ReminderCntxt = createContext();

export const ReminderPrvdr = (props) => {
    const { children } = props;
    const [ open, setOpen ] = useState(false);
    const [ link, setLink ] = useState('');

    return <ReminderCntxt.Provider value= {{ open, setOpen, link, setLink }}>{ children }</ReminderCntxt.Provider>
}