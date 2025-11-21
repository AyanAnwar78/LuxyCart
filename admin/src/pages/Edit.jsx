import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

function Edit() {
  let { id } = useParams();
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();

  let [formData, setFormData] = useState({
    name: "",
    description: "",
    price: ""
  });

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/product/${id}`);
        setFormData({
          name: result.data.name,
          description: result.data.description,
          price: result.data.price
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id, serverUrl]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.put(
        `${serverUrl}/api/product/update/${id}`,
        formData,
        { withCredentials: true }
      );

      if (result.data) {
        alert("Product updated successfully!");
        navigate("/list"); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <form 
        onSubmit={handleSubmit} 
        className="lg:w-[50%] w-[95%] flex flex-col gap-6 p-8 rounded-lg shadow-md shadow-[#343434]"
      >
        <div className='inline-flex gap-2 items-center text-center mb-3 text-[35px] md:text-[40px]'>
          <p className='text-blue-100'>EDIT 
            <span className=' ml-2 text-[#a5faf7]'> PRODUCT DETAILS</span>
          </p>
        </div>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-md shadow-[#343434]"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          rows="4"
          className="w-full rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] py-2 shadow-md shadow-[#343434]"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Product Price"
          className="w-full h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-md shadow-[#343434]"
          required
        />

        <button
          type="submit"
          className="text-[18px] active:bg-slate-500 cursor-pointer 
            bg-[#3bcee848] py-[12px] px-[50px] rounded-2xl text-white 
            flex items-center justify-center gap-[10px] border border-[#80808049] hover:bg-[#3bcee8]"
        >Save Changes</button>
      </form>
    </div>
  );
}

export default Edit;
