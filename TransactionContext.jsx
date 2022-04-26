import React,{useEffect, useState} from 'react';
import {errors, ethers} from 'ethers';

import {contractABI ,contractAddress} from '../utils/constants';

export const TransactionContext=React.createContext();

const {ethereum}=window;

const getEthereumContract=()=>{
    const provider=new ethers.providers.Web3Provider(ethereum);
    const signer=provider.getSigner();
    const transactionContract =new ethers.Contract(contractAddress,contractABI,signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
}


export const TransactionProvider=({children})=>{
    const [currentAcount,setCurrentAccount]=useState('');
    const [formData ,setFormData]=useState({addressTo:'',amount:'',keyword:'',message:''});

    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState,[name]:e.target.value}));

    }


    const checkIfWalletIsConnected=async ()=>{
        try {
            if(!ethereum) return alert("please install metamask");
        const accounts=await ethereum.request({method:'eth_accounts'});
        if(accounts.length){
            setCurrentAccount(accounts[0]);

            //getAllTransactions();
        } else{
            console.log('No accounts found');
        }

        } catch (error) {
            
            console.log(error);
            throw new error("no ethereum object...")
        }
        
    }

    //conect walet function 

    const connectWallet  =async ()=>{
        try {
            if(!ethereum) return alert("please install metamask");
            const accounts=await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (error) {

            console.log(error);
            throw new Error("no ethereum object...")
            
        }
    }


    // const sendTransaction=async()=>{
    //     try {
    //         if(!ethereum) return alert("please install metamask");

    //         const {addressTo,amount,keyword,message} = formData;
    //         getEthereumContract();

    //         //get the data from the form

    //     } catch (error) {
    //         console.log(error);
    //         throw new error("no ethereum object.")
        
    //     }
    // }
////halkaan waaye dhibaatada
    const sendTransaction =async ()=>{
        try {
            if(!ethereum) return alert("please install metamask");
            const{addressTo,amount,keyword,message}=formData;
                 //get the data from the form
            getEthereumContract();
             } catch (error) {
            console.log(error);
            throw new Error("no ethereum object...")
            
        }
    }



    useEffect(()=>{
        checkIfWalletIsConnected();
    },[]);
return(
    <TransactionContext.Provider value={{connectWallet,currentAcount,formData,setFormData,handleChange,sendTransaction}}>
        {children}
    </TransactionContext.Provider>
);
}