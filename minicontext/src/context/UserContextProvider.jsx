import React from 'react';
import UserContext from './UserContext';
const UserContextProvider = ({children})=>{
    const[user,setUser]=React.useState(null)//creating state api calling
  return (
       /*here we use UserContext.Provider beacuse UserContext cant work without provider beacuse we want to provide the data to the variables and humko ye bhi btana h ki konse value ko access dena hai to so we used value and provide variable and object */
    <UserContext.Provider value={{user,setUser}}>
      
    {children} 
    </UserContext.Provider>

  )
}
export default UserContextProvider;