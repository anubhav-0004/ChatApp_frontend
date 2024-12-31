import React from 'react'
import { useState } from 'react';
import { IoCamera } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";


const StyledPic = () => {

    const [profileImage, setProfileImage] = useState(null);
    const handleImageChange = (e) => {
        const image = e.target.files[0];
        if(image){
            setProfileImage(URL.createObjectURL(image));
        }
    }
  return (
    <div className='w-fit h-fit my-auto mx-auto flex justify-center items-end gap-0'>
        <img className='rounded-[50%] aspect-square max-w-28 object-cover border border-black -mr-3' src={profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"} alt="" />
        <input type="file" name="" id="inpFile" accept='image/*' className='hidden' onChange={handleImageChange}/>
        <label htmlFor="inpFile" className='bg-transparent mx-auto cursor-pointer'><IoCamera className='min-w-8 min-h-8 mx-auto text-zinc-700 bg-gray-300 p-1 border rounded-[50%]'/></label>
    </div>
  )
}

export default StyledPic
