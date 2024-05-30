"use server"
import path, { resolve } from 'path'
import fs from 'fs/promises'
import {v4 as uuidv4} from 'uuid'
import os from 'os'
import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache'
//@ts-ignore
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
});
async function savePhotosToLocal (formData:any) {
  
  const files= formData.getAll('files')
  console.log(files)
  const multipleBuffersPromise= files.map((file:any)=>(
    file.arrayBuffer()
    .then((data:any)=>{
        const buffer = Buffer.from(data)
        const name = uuidv4()
        const ext =file.type.split('/')[1]
       console.log(name,ext)

        // const uploadDir=path.join(process.cwd(),"public",`/${name}.${ext}`)
        //  console.log(uploadDir)
        const tmpdir=os.tmpdir();
        const uploadDir=path.join(tmpdir,`/${name}.${ext}`)
        console.log(uploadDir)

         fs.writeFile(uploadDir,buffer)
         return {filepath:uploadDir,filename:file.name}
    })
  ))
  return await Promise.all(multipleBuffersPromise)
}

// async function uploadPhotosToCloudinary(newFiles:any){
//     const multiplePhotosPromise= newFiles.map((file:any)=>(
//         cloudinary.v2.uploader.upload(file.filepath,{folder:'nextjs_upload'})
//     ))
//     return await Promise.all(multiplePhotosPromise)

// }
async function uploadPhotosToCloudinary(newFiles:any,folder:any){
    const multiplePhotosPromise= newFiles.map((file:any)=>(
        cloudinary.v2.uploader.upload(file.filepath,{folder})
    ))
    return await Promise.all(multiplePhotosPromise)

}
const delay=(delayInms:any)=>{
return new Promise(resolve=>setTimeout(resolve,delayInms));
}
async function UploadPhoto(formData:any) {
  console.log(formData)

  try{
    //new l
    const folder = formData.get('folder');

    const newFiles= await savePhotosToLocal(formData)
    //console.log(newFiles)
    const photos= await uploadPhotosToCloudinary(newFiles,folder)
    //console.log(photos)
    console.log("up",photos)
    newFiles.map(file=>fs.unlink(file.filepath))
    await delay(2000)
    revalidatePath("/")
    return {msg:'Upload Success'}

  }catch(error:any){
    return {errMsg:error.message}
  }
}
export async function getAllPhotos(newFolder: string) {
  
  try{
 const {resources}=await cloudinary.v2.search.expression(
    `folder:${newFolder}/*`
 ).sort_by('created_at', 'desc').max_results(500).execute()
 
    return resources

  }catch(error:any){
    return {errMsg:error.message}
  }
}
export async function getAllFolders() {
  try {
    const { folders } = await cloudinary.v2.api.root_folders();
    return folders;
  } catch (error: any) {
    return { errMsg: error.message };
  }
}
export async function deletePhotos(public_id:any) {
  
  try{
  
 await cloudinary.v2.uploader.destroy(public_id)
 revalidatePath("/achivement")
   
    return {msg:'Delete Success'}

  }catch(error:any){
    return {errMsg:error.message}
  }
}
export async function revalidate(path:string){
revalidatePath(path)
}

export default UploadPhoto