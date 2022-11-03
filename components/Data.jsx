import React, { useContext } from 'react'
import { RiSendPlaneFill, RiCloseFill } from 'react-icons/ri';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';

//INTERNAL IMPORT
// import { ToDoListContext } from '../context/toDoListApp';
// const { change } = useContext(ToDoListContext)

export default function Data ({ allToDoList, allAddress, myList, change }) {
  console.log(allToDoList)

  return (
    <div>
 
        {allToDoList.length === 0 ? (
          <div>No Data</div>
        ) : (
          <div className='pr-40'>
            {
                allToDoList.map((el, i) => (
                  <div key={i+1} className="flex flex-row mt-5 items-center border-b border-gray-100">
                    <div className="flex flex-grow gap-2 mt-2">
                      <AiFillLock className='h-6 w-6'/>
                      <p>{el[2]}</p>
                    </div>
                    {el[3] === false ? (
                      <RiCloseFill 
                        className='mt-2 h-5 w-5 cursor-pointer hover:text-red-800' 
                        onClick={() => change(el[0])}
                      />
                    ) : (
                      <p className='mt-1 border bg-green-700 text-13'>Done</p>
                    )}
                  </div>
                ))
            }
          </div>
        )}
     
    </div>
  )
}
