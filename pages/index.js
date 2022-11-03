import React, {useEffect, useState, useContext} from 'react';
import { MdVerified } from 'react-icons/md';
import { RiSendPlaneFill, RiCloseFill } from 'react-icons/ri';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';

import { ToDoListContext } from '../context/toDoListApp';
import Data from '../components/Data';

export default function Home() {
  const [message, setMessage] = useState()
  const {   
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
    } = useContext(ToDoListContext);

  useEffect(() => {
        checkIfWalletIsConnect();
        getToDoList();
    },[]);

  return (
    <div className='p-10 font-[sora] bg-gradient-to-t from-slate-400 to-slate-900'>
      {/* //header here */}
      <div className='flex flex-row items-center border bg-white rounded-lg z-50 pl-5'>
        <div className='flex-grow p-2'>
          <img className='h-10 w10' src="/img/Loading_2.gif"/>
        </div>
        <div className='border-none cursor-pointer text-16 p-2 pr-10 md:pr-30 text-black hover:text-red-700 transition duration-200'>
          { currentAccount ? (
            <button>...{currentAccount.slice(currentAccount.length - 6, currentAccount.length)}</button>
          ): (
            <button className='bg-white p-1 font-bold rounded-lg' onClick={connectWallet}>Connect Walet</button>
          )}
        </div>
      </div>

      <div className='p-5 pl-10 border bg-purple-900 rounded-lg mt-10 text-white gap-5 md:grid md:grid-cols-3'>
        <div className='mt-5 mb-5'>
          <h2 className='text-20 font-semibold'> To Do History List</h2>
          <div className='text-16 pl-5'>
            { myList.map((el, i) => (
              <div key={i} className="flex gap-2">
                <MdVerified className='h-5 w-5'/>
                <p>{el.slice(0,30)}..</p>
              </div>
            ))}
          </div>
        </div>
     
        <div className='col-span-2'>
            <h2 className='text-20 font-semibold md:mt-5'>Create BlockChain To Do List</h2>
            <div className='flex pl-2 mt-3 mb-5 gap-2'>
              <input 
                type='text' 
                placeholder='Ether your todo' 
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-lg p-2 text-black"
                />
                { currentAccount ? (
                  <RiSendPlaneFill className=' cursor-pointer h-10 w-10' onClick={() => toDoList(message)}/>
                ) : (
                  <RiSendPlaneFill className=' cursor-pointer h-10 w-10' onClick={() => connectWallet()}/>
                )}
            </div>

            <Data 
              allToDoList={allToDoList}
              allAddress={allAddress}
              myList={myList}
              change={change}
            />
        </div>

     </div>
    </div>
  )
}

