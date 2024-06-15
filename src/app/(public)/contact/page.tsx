"use client"
import ContactPage from '@/components/view/contactPage/ContactPage'
import React from 'react'
import Carouseluser from "@/components/view/Carouseluser/Carouseluser";
import styletext from '../../../../src/components/styles/textcolor.module.css'
const Contact = () => {
  return (
    <div className= {styletext.gradienbg} style={{marginTop:"50px"}}>
      <ContactPage/>
      
    </div>
  )
}

export default Contact