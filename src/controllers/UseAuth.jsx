// import { useEffect, useState } from 'react';
//import BackRoutes from '../RoutesInterface' 

//const jsC = require('js-cookie');


// const UseAuth = () => {
//     const [userInfo, setUser] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(false);
    
//     const Signup = (data) =>{
//         setIsLoading(true)
//         fetch(BackRoutes.Signup ,{
//             method : "POST",
//             headers : {
//                 "Content-Type": "application/json",
//             },
//             body : JSON.stringify(data)
//         })
//         .then((res) => res.json)
//         .then((data) => {
            
//             setIsLoading(false)
//             console.log(data);
//             return data;
//         })
//         .catch(err => {
//             setError(true)
//             console.log(err)
//         })
//     } 

//     const Signin = () => {
//         let tets;
//     }

//     return {
//         userInfo,
//         Signup,
//         Signin
//     }
// }


// const useFetch = (url, dataSent) => {
//     const [data, setData] = useState();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         if(!url) return;

//         const fetchData = () => {

//             fetch(url ,{
//                 method : "POST",
//                 headers : {
//                     "Content-Type": "application/json",
//                 },
//             body : JSON.stringify(dataSent)
//         })
//         .then((res) => res.json())
//         .then((datares) => {
            
//             setIsLoading(false)
//             console.log(datares);
//             setData(datares);
//         })
//         .catch(err => {
//             setError(true)
//             console.log(err)
//         })
//         }
//         fetchData();

//     }, [url, dataSent])

//     return {data, isLoading, error};
// } 

// //, dataSent, usedMethod
// function useFetch(url) {
//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         if (!url) return;

//         // let options = {
//         //         method: usedMethod,
//         //         headers: {
//         //             "Content-Type": "application/json",
//         //         },
//         //         body: JSON.stringify(dataSent),
//         // }
//         const fetchData = () => {
//             fetch(url)
//                 .then((res) => res.json())
//                 .then((responseData) => {
//                     setData(responseData);
//                 })
//                 .catch((err) => {
//                     setError(true);
//                     console.log(err);
//                 })
//                 .finally(() => {
//                     setIsLoading(false);
//                 })
//         };
//         setIsLoading(true);
//         fetchData();

//     }, [url]);

//     return { data, isLoading, error };
// }

// export default useFetch;

//export default { useFetch};