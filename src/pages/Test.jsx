import React, { useState } from 'react';
import { useEffect } from 'react';
import auth from '../services/auth';
import axiosClient from '../services/AxiosClient';

function Test(props) {
    const [filters, setFilters] =  useState({
        _page: 1,
        _limit:5,
       
    })

    const [paginartion, setPaginartion] = useState({
        total: 0,
        page: 1,
    })
    

    useEffect(()=>{
        
        (async()=>{
            const isAdmin =JSON.parse(localStorage.getItem("token")) 

            if(isAdmin){
                const  res = await axiosClient.create({
                    name: "test",
                    description:"123"
                },isAdmin)
                
                console.log(res);

                const { totalPAge, page } = res;

                setPaginartion(prevState => ({
                    ...prevState,
                    total:  totalPAge,
                    page
                }))
            }
        })()
    },[filters])
    return (
        <div>
            
        </div>
    );
}

export default Test;