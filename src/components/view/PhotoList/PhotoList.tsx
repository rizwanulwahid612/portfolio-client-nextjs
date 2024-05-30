"use client"
import React from 'react'
import { deletePhotos, getAllPhotos } from '../UploadAction/UploadAction'
import UploadForm from '@/app/(public)/about/page'
import PhotoCard from '../PhotoCard/PhotoCard'

const PhotoList =({photos}:{photos:any}) => {
    //  console.log("photos:",photos?.map((ph:any)=>ph?.secure_url))
async function handleDeletePhoto(public_id:any) {
    console.log(public_id)
    await deletePhotos(public_id)
}
  return (
   <div style={{display:"flex",flexWrap:"wrap",margin:"10 0",gap:"10px"}}>
    {
        photos?.map((photo:any)=>(
            <PhotoCard key={photo?.public_id} url={photo?.secure_url} onClick={()=>handleDeletePhoto(photo?.public_id)}/>
        ))
    }
   </div>
  )
  
      }

export default PhotoList