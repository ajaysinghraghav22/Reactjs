import React from 'react';
import{useParams} from 'react-router-dom'
function User(){
    const {userid}=useParams()//mading custom hook
    return (
        <div className='bg-gray-700 text-white text-2xl p-4 text-center'>User:{userid} </div>//to fetch the user id we import useParams
    )
}
export default User;