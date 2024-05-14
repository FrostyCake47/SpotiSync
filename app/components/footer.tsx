import React from 'react'
import {Roboto_Slab} from "next/font/google";
import "../globals.css";

import { FaGooglePlus } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaDiscord } from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";

import { IconContext } from "react-icons";

const RobotoSlab = Roboto_Slab({weight: "400", subsets: ["latin"]});

const Footer = () => {
  return (
    <div className='bg-neutral-950 min-h-[200px] py-10 sm:py-4 flex flex-col items-center'>
            <div className={RobotoSlab.className}>
                <h1 className='text-[25px] sm:text-[30px] text-center mx-5 sm:px-10 text-neutral-200'>SpotiSync</h1>
            </div>
            <p className='text-[14px] sm:text-[15px] px-2 text-center py-3 text-neutral-300'>Crafted with passion by Akash, music enthusiast and developer.</p>
            <div className='sm-flex justify-evenly py-4 hidden'>
            <a href="mailto:akashp4769@gmail.com">
                    <IconContext.Provider value={{className: "gmailicon"}}>
                        <FaGooglePlusG size={36} className='mx-3'></FaGooglePlusG>
                    </IconContext.Provider>
                </a>
                
                <IconContext.Provider value={{className: "instaicon"}}>
                    <FaInstagram size={36} className='mx-3'/>
                </IconContext.Provider>

                <a href="https://github.com/FrostyCake47">
                    <IconContext.Provider value={{className: "githubicon"}}>
                        <FaGithub size={36} className='mx-3'/>
                    </IconContext.Provider>
                </a>
                
                <a href="https://www.linkedin.com/in/akash-p-a9164a294/">
                    <IconContext.Provider value={{className: "linkedinicon"}}>
                        <CiLinkedin size={36} className='mx-3'/>
                    </IconContext.Provider>
                </a>
                
                <a href="https://discordapp.com/users/422220140499697675">
                    <IconContext.Provider value={{className: "discordicon"}}>
                        <FaDiscord size={36} className='mx-3' />
                    </IconContext.Provider>
                </a>
            </div>

            <div className='sm-hidden justify-evenly py-4 flex'>
                <a href="mailto:akashp4769@gmail.com">
                    <IconContext.Provider value={{className: "gmailicon"}}>
                        <FaGooglePlusG size={26} className='mx-3'></FaGooglePlusG>
                    </IconContext.Provider>
                </a>
                
                <IconContext.Provider value={{className: "instaicon"}}>
                    <FaInstagram size={26} className='mx-3'/>
                </IconContext.Provider>

                <a href="https://github.com/FrostyCake47">
                    <IconContext.Provider value={{className: "githubicon"}}>
                        <FaGithub size={26} className='mx-3'/>
                    </IconContext.Provider>
                </a>
                
                <a href="https://www.linkedin.com/in/akash-p-a9164a294/">
                    <IconContext.Provider value={{className: "linkedinicon"}}>
                        <CiLinkedin size={26} className='mx-3'/>
                    </IconContext.Provider>
                </a>
                
                <a href="https://discordapp.com/users/422220140499697675">
                    <IconContext.Provider value={{className: "discordicon"}}>
                        <FaDiscord size={26} className='mx-3' />
                    </IconContext.Provider>
                </a>
                
            </div>
    </div>
  )
}

export default Footer