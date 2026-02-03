import homeService from "@/api/Home";
import { useState,useEffect } from "react";

const useHome = () => {
    const [countRegister, setCountRegister] = useState<number>(0);
    const getCountRegister = async () => {
        const response = await homeService.getCountRegister({ types: ['LEAVE', 'OVERTIME','LATE_EARLY','TIME_EXPLAINATION'] });
        console.log(response);
    }
    useEffect(() => {
        // getCountRegister();
    }, []);


    return { countRegister, getCountRegister };
}
export default useHome;