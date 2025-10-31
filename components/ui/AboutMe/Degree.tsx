"use client"
import React from 'react'
import { FaGoogleScholar } from "react-icons/fa6";

const degrees =[
    {
        num: "01",
        title:"MBBS",
        college:"Usmani Medical College ,Sylhet",
        year:"2000"
    },
    {
        num: "02",
        title:"FRCS",
        college:"Usmani Medical College ,Sylhet",
  year:"2004"
    },
    {
        num: "03",
        title:"MBBS",
        college:"Usmani Medical College ,Sylhet",
          year:"2006"
    },
    {
        num: "04",
        title:"MBBS",
        college:"Usmani Medical College ,Sylhet",
          year:"2008"
    },
]

import {motion} from "framer-motion"

export default function Degree() {
  return (
   <section className='min-h-[80vh] xl:min-h-[45vh] flex flex-col xl:py-0'>
    <div className='container mx-auto'>
        <motion.div initial={{opacity: 0}} animate={{opacity:1,transition
            :{delay:1, duration:0.4, ease:"easeIn"},
     
       
       }}
       className='grid grid-col-1 md:grid-cols-2 gap-[20px]'
       >

{
    degrees.map((deg,index)=>{
        return(
            <div key={index} className='flex-1 flex flex-col justify-center 
            gap-6 group border-1 rounded-2xl p-2 pl-3'>
                
<div className='w-full flex justify-between items-center text-5xl font-extrabold 
text-outline text-transparent group-hover:text-outline-hover transition-all duration-500
 '>
{deg.title}

<div className='w-[60px] h-[60px] rounded-full bg-white group-hover:bg-accent
transition-all duration-500 flex justify-center items-center hover:rotate-45
mr-1'>
<FaGoogleScholar className='text-black text-4xl  '/>
</div>

</div>
<p className='text-[30px]  xl:text-[25px] xl:text-justify font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>{deg.college}</p>
<p className='text-2xl font-extraBold '> Year: {deg.year}</p>
            </div>
        )
    })
}

        </motion.div>
    </div>
   </section>
  )
}
