import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Objkt } from "../types/objkt"

export interface Objkts {
    results: Objkt[];
};

const url = "https://api.hicdex.com/v1/graphql";

const ObjktList = (userAddress: string) => {
    const [result, setResult] = useState<Service<Objkts>>({
        status: 'loading'
    });

    useEffect(() => {
        const itemsQuery = `
            query MyQuery {
                hic_et_nunc_token(where: {creator: {address: {_eq: "${userAddress}"}}}) {
                    title
                    thumbnail_uri
                    id
                }
            }  
        `;

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: itemsQuery })
        };  

        fetch(url, opts)
            .then(response => response.json())
            .then(response => setResult({ status: 'loaded', payload: response.hic_et_nunc_token }))
            .catch(error => setResult({ status: 'error', error }));
    }, [userAddress]);

    return result;
};

export default ObjktList;