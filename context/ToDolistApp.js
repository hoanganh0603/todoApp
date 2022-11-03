import React, {useEffect, useState} from 'react';
import { ethers } from "ethers";
import Web3Modal from "web3modal"

//Internal import
import { toDoListAddress, toDoListABI } from './constants';

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);

export const ToDoListContext = React.createContext()

export const ToDoListProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [error, setError] = useState('');
    const [allToDoList, setAllToDoList] = useState([]);
    const [myList, setMyList] = useState([]);

    const [allAddress, setAllAddress] = useState([]);

    //-----CONNECTING METAMASK-----
    const checkIfWalletIsConnect = async () => {
        if(!window.ethereum) return setError("Please install metamask");

        const account = await window.ethereum.request({method: "eth_accounts"});
        console.log(account)
        
        if(account.length) {
            setCurrentAccount(account[0]);
        }else{
            setError("Please install metamask & connect, reload")
        }
    }

   // -----CONNECT WALLET------
   const connectWallet = async () => {
        if(!window.ethereum) return setError("Please install metamask");

        const account = await window.ethereum.request({method: "eth_requestAccounts"});
        setCurrentAccount(account[0]);
   }

   // INTERACTING WITH SMAST CONTRACT
   const toDoList = async (message) => {
    try {
        //Connecting with smart contract
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = await fetchContract(signer)

        const createList = await contract.createList(message)
        createList.wait();

        console.log("Create List", createList)

    } catch (error) {
        setError("Some thing wrong crating list")
    }
   }

   //---GET ALL TO DO LIST---
   const getToDoList = async () => {
    try {
        //Connecting with smart contract
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = await fetchContract(signer)

        //Get all Address
        const getAllAddress = await contract.getAddress();
        setAllAddress(getAllAddress)

        console.log("Get all address", getAllAddress)

        getAllAddress.map( async (el) => {
            const getSingleData = await contract.getCreatorData(el);
            allToDoList.push(getSingleData);

        });
       
        //Get All message
        const allMessage = await contract.getMessage()
        setMyList(allMessage)
        
    } catch (error) {
        setError("Some thing wrong geting data")
    }
   }

   // CHANGE STATE OF TODOLIST TO FALSE TO TRUE
   const change = async (address) => {
    try {
     //Connecting with smart contract
     const web3modal = new Web3Modal();
     const connection = await web3modal.connect();
     const provider = new ethers.providers.Web3Provider(connection);
     const signer = provider.getSigner();
     const contract = await fetchContract(signer)

     const state = await contract.toggle(address)
     state.wait();
     console.log("State", state)
     
    } catch (error) {
     setError("Some thing wrong change status")
    }
 }

    return (
        <ToDoListContext.Provider value=
            {{ 
                checkIfWalletIsConnect, 
                connectWallet, 
                toDoList, 
                getToDoList, 
                change,
                currentAccount,
                error,
                allToDoList,
                myList,
                allAddress
            }}>

            {children}

        </ToDoListContext.Provider>
    )
}