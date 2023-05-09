// Libraries
import { createContext, useState } from "react";

// Core
import { recommend } from "core/api/index.func"; // API
import { usePost } from "core/global/function/index.func"; // Function

export const RecommendationCntxt = createContext();

export const RecommendationPrvdr = (props) => {
    const { children } = props;
    const [ open, setOpen ] = useState(localStorage.getItem('recommend') === null);
    const { data: recommended, mutate: recommendation, isLoading: recommending } = usePost({ fetch: recommend });
    
    return <RecommendationCntxt.Provider value= {{ open, setOpen, recommended, recommendation, recommending }}>{ children }</RecommendationCntxt.Provider>
}