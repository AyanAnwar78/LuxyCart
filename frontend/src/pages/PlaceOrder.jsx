import React, { useContext, useState } from 'react'
import Title from "../component/Title"
import CartTotal from '../component/CartTotal'
import razorpay from "../assets/razorpay.jpg"
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {

  let [method, setMethod] = useState('cod')

  let navigate = useNavigate()

  const {cartItem, setCartItem, 
    getCartAmount, delivery_fee, products} = useContext(shopDataContext)

  let {serverUrl} = useContext(authDataContext)

    
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    street: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (e)=>{
    const name= e.target.name;
    const value = e.target.value;

    setFormData(data => ({...data, [name]:value}))
  }


  const initPay = (order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        const {data} = await axios.post(serverUrl + '/api/order/verifyrazorpay',
          response, {withCredentials:true})
        
        if(data){
          navigate("/order")
          setCartItem({})
        }
      }}
    const rzp = new window.Razorpay(options)
    rzp.open()
  }


  const onSubmitHandler = async (e)=>{
      e.preventDefault()

      try {
        let orderItems = []
        for(const items in cartItem){
          for(const item in cartItem[items]){
            if(cartItem[items][item] > 0){
              const itemInfo = structuredClone(products.find(product=>
                 product._id === items))

              if(itemInfo){
                itemInfo.size = item
                itemInfo.quantity = cartItem[items][item]
                orderItems.push(itemInfo)
              }
            }
          }
        }

        let orderData = {
          address: formData,
          items: orderItems,
          amount: getCartAmount() + delivery_fee
        }

        switch(method){
          case 'cod' : 
          const result = await axios.post(serverUrl + "/api/order/placeorder",
            orderData, {withCredentials:true})
          console.log(result.data)

          if(result.data){
            setCartItem({})
            navigate("/order")
          }else{
            console.log(result.data.message)
          }
          
          break;

          case 'razorpay':
            const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", 
              orderData, {withCredentials: true})

              if(resultRazorpay.data){
                initPay(resultRazorpay.data)
              }

            break;

          default:
          break;
        }

      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='w-full min-h-screen flex flex-col lg:flex-row items-start lg:items-center
     justify-center bg-gradient-to-l from-[#141414] relative to-[#0c2025] gap-[30px] p-4 pt-10'>


      <div className='lg:w-[50%] w-full flex items-center justify-center mt-[20px] lg:mt-0'>

        <form action="" onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%] ' >
          <div className='py-[10px]'>
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input type="text" placeholder='First name' className='w-[48%] h-[50px] rounded-md
                  bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-md
                  shadow-[#343434]' required onChange={onChangeHandler}
                     name='firstName' value={formData.firstName} />

            <input type="text" placeholder='Last name' className='w-[48%] h-[50px] rounded-md
                  bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-md
                  shadow-[#343434]' required onChange={onChangeHandler}
                     name='lastName' value={formData.lastName} />

          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input type="email" placeholder='Email address' className='w-[100%] h-[50px] rounded-md
                  bg-slate-700 placeholder:text-[white] px-[20px] shadow-sm
                  shadow-[#343434] text-[18px]' required onChange={onChangeHandler}
                     name='email' value={formData.email} />
          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input type="text" placeholder='Street' className='w-[100%] h-[50px] rounded-md
                  bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-md
                  shadow-[#343434]' required onChange={onChangeHandler}
                     name='street' value={formData.street} />
          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px] gap-2'>
            
            <input type="text" placeholder='City' className='w-[48%] h-[50px] rounded-md
                  bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-md
                  shadow-[#343434]' required onChange={onChangeHandler}
                     name='city' value={formData.city} />

            <input type="text" placeholder='State' className='w-[48%] h-[50px] rounded-md
                  bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-md
                  shadow-[#343434]' required onChange={onChangeHandler}
                     name='state' value={formData.state} />

          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input type="text" placeholder='Pincode' className='w-[48%] h-[50px] rounded-md
                  bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-md
                  shadow-[#343434]' required onChange={onChangeHandler}
                     name='pinCode' value={formData.pinCode} />

            <input type="text" placeholder='Country' className='w-[48%] h-[50px] rounded-md
                  bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-md
                  shadow-[#343434]' required onChange={onChangeHandler}
                     name='country' value={formData.country} />

          </div>

          <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input type="number" placeholder='Phone' className='w-[100%] h-[50px] rounded-md
                  bg-slate-700 text-[18px] placeholder:text-[white] px-[20px] shadow-sm
                  shadow-[#343434]' required onChange={onChangeHandler}
                     name='phone' value={formData.phone} />
          </div>

          <button
            type="submit"
            className='text-[18px] active:bg-slate-500 cursor-pointer 
            bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white 
              flex items-center justify-center gap-[20px] absolute 
              right-[35%] bottom-[8%] md:bottom-[2%] lg:right-[18%] 
              border border-[#80808049] ml-[30px] mt-[30px]'>
            PLACE ORDER
          </button>


        </form>
      </div>

      <div className='lg:w-[50%] w-full flex items-center justify-center gap-[20px] mt-[30px] lg:mt-0'>

        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center
                  justify-center gap-[10px] flex-col '>
          <CartTotal />

          <div className='py-[10px]'>
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          <div className='w-[100%] h-[30vh] lg:h-[10px] flex items-start
            mt-[20px] lg:mt-[0px] justify-center gap-[50px]'>

            <button className={`w-[150px] h-[50px] rounded-sm ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}
              onClick={() => setMethod('razorpay')}>
              <img src={razorpay} alt="" className='w-[100%] h-[100%] object-fill rounded-sm' />
            </button>

            <button className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white]
              text-[14px] px-[20px] text-[#332f6f] font-bold rounded-sm ${method === 'cod' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}
              onClick={() => setMethod('cod')}>
              CASH ON DELIVERY
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder