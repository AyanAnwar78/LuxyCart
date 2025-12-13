import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Lists() {
  let [list, setList] = useState([])
  let { serverUrl } = useContext(authDataContext)

  let navigate = useNavigate();

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) {
        fetchList()
      }
      else {
        console.log("Failed to remove Product")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />

      <div className='w-[100%] h-[100%] flex items-center justify-center'>
        <Sidebar />

        <div className='w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] 
          overflow-x-hidden py-[50px] ml-[100px]'>

          <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white'>
            All Lists Products
          </div>

          {list && list.length > 0 ? (
            list.map((item, index) => (
              <div key={index} className='w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex 
                items-center justify-start gap-[5px] ms:gap-[30px] p-[10px] md:px-[30px]'>

                <img src={item.image1} className='w-[305] md:w-[120px] h-[90%] rounded-lg ' alt="" />

                <div className='w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px] '>
                  <div className='w-[100%] md:text-[20px] text-[15px] text-[#befof3]'>{item.name}</div>
                  <div className='md:text-[17px] text-[15px] text-[#bef3da]'>{item.category}</div>
                  <div className='md:text-[17px] text-[15px] text-[#bef3da]'>₹{item.price}</div>
                </div>


                <div className='w-[10%] h-[100%] bg-transparent flex items-center justify-center gap-2'>
                  <span
                    className='w-[35px] h-[35px] flex items-center justify-center rounded-md md:hover:bg-yellow-300
                    md:hover:text-black cursor-pointer'
                    onClick={() => navigate(`/edit/${item._id}`)} // navigate to edit page
                  >✎</span>

                  <span
                    className='w-[35px] h-[35px] flex items-center justify-center rounded-md md:hover:bg-red-300
                    md:hover:text-black cursor-pointer'
                    onClick={() => removeList(item._id)}
                  >✕</span>
                </div>
              </div>
            ))
          ) : (
            <div className='text-white text-lg'>No product available.</div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Lists
