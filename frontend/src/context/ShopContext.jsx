import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext'
import axios from 'axios'
import {userDataContext} from "./UserContext"
import { toast } from 'react-toastify';

export const shopDataContext = createContext()

function ShopContext({ children }) {
    let [products, setProducts] = useState([])

    let [search, setSearch] = useState("")

    let [showSearch, setShowSearch] = useState(false)

    let { serverUrl} = useContext(authDataContext)

    let {userData} = useContext(userDataContext)

    let [cartItem, setCartItem] = useState({})

    let currency = '₹'

    let delivery_fee = 40;

    const getProducts = async () => {
        try {
            let result = await axios.get(serverUrl + '/api/product/list')
            console.log(result.data)
            setProducts(result.data)
        } catch (error) {
            console.log(error)
        }
    }


    const addtoCart = async (itemId, size) => {
        if (!size) {
            console.log("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItem(cartData);

        // Only call backend if logged in
        if (userData) {
            try {
                let result = await axios.post(
                    serverUrl + '/api/cart/add',
                    { itemId, size },
                    { withCredentials: true }
                );
                console.log(result.data)
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getUserCart = async () =>{
        try {
            const result = await axios.post(
                serverUrl + "/api/cart/get",{},{withCredentials:true})
            setCartItem(result.data)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const updateQuantity = async (itemId, size, quantity) =>{
        let cartData = structuredClone(cartItem)
        cartData[itemId][size] = quantity
        setCartItem(cartData)

        if (userData) {
            try {
                let result = await axios.post(
                    serverUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    { withCredentials: true }
                );
                console.log(result.data)
            } catch (error) {
                console.log(error);
            }
        }
    }


    const getCartCount = () => {
        let totalCount = 0;

        for (const productId in cartItem) {
            for (const size in cartItem[productId]) {
                totalCount += cartItem[productId][size];
            }
        }

        return totalCount;
    };


    useEffect(() => {
        getProducts()
    }, [])


    useEffect(() => {
        getUserCart()
    }, [])


    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItem){
            let itemInfo = products.find((product) => product._id === items)

            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item]>0){
                        totalAmount += itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }

        return totalAmount
    }



    let value = {
        products, currency, delivery_fee, getProducts, showSearch,
        setShowSearch, search, setSearch, cartItem, addtoCart,
        getCartCount, setCartItem, updateQuantity, getCartAmount
    }

    return (
        <div>
            <shopDataContext.Provider value={value}>
                {children}
            </shopDataContext.Provider>
        </div>
    )
}

export default ShopContext