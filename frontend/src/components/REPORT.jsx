import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import instance from '../api/axios'
import EDIT from './EDIT'


function REPORT() {
  const[users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await instance.get('api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
   
  const deleteUser = async (id) => {
    try {
      await instance.delete(`api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  } , []);

  return (
    <div>
      <h1 className='underline text-center text-2xl'>Report</h1>   
      <table className='table-auto w-full mt-4'>
        <thead>
          <tr>
            <th className='border px-4 py-2'>ID</th>
            <th className='border px-4 py-2'>Fname</th>
            <th className='border px-4 py-2'>Lname</th>
            <th className='border px-4 py-2'>Age</th>
            <th className='border px-4 py-2'>Location</th>
            <th className='border px-4 py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='border px-4 py-2'>{user.id}</td>
              <td className='border px-4 py-2'>{user.fname}</td>
              <td className='border px-4 py-2'>{user.lname}</td>
              <td className='border px-4 py-2'>{user.age}</td>
              <td className='border px-4 py-2'>{user.location}</td>
              <td className='border px-4 py-2'>
                <Link to={`/EDIT/${user.id}`} className='text-blue-500 hover:text-blue-700'>
                  Edit
                </Link>
                <button onClick={() => deleteUser(user.id)} className='ml-2 text-red-500 hover:text-red-700'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default REPORT
