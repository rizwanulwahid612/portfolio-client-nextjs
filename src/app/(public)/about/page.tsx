//  "use client"

//  import { Form, Button, message, Input } from 'antd';
// import { useRef, useState } from 'react';
// import PhotoCard from '@/components/view/PhotoCard/PhotoCard';
// import UploadPhoto, { revalidate } from '@/components/view/UploadAction/UploadAction';
// import { UploadOutlined } from '@ant-design/icons';
// import FormInput from '@/components/Forms/FormInput';

// const { Item: FormItem } = Form;

// const UploadForm = () => {
//   const formRef = useRef(null) as any;
//   const [files, setFiles] = useState([]);

//   async function handleInputFile(e:any) {
//     const inputFiles = e.target.files;
//     const newFiles = [...inputFiles];

//     // Filter the files to ensure they meet your criteria
//     const filteredFiles = newFiles.filter((file) => {
//       return file.size < 2048 * 2048 && file.type.startsWith('image/');
//     });

//     // Ensure the total number of files doesn't exceed 3
//     const totalFiles = [...files, ...filteredFiles];
//     const finalFiles = totalFiles.slice(0, 6) as any;

//     setFiles(finalFiles);
//     formRef.current.reset();
//   }

//   async function handleDeleteFiles(index:any) {
//     const newFiles = files.filter((_, i) => i !== index);
//     setFiles(newFiles);
//   }

//   async function handleUpload() {
//     if (!files.length) return message.error('No image files are selected');
//     const formData = new FormData();
//     files.forEach((file) => {
//       formData.append('files', file);
      
//     });
//     const res = await UploadPhoto(formData);
//     console.log(res)
//     if (res?.msg) message.success(`Success: ${res.msg}`);
//     if (res?.errMsg) message.warning(`Error: ${res.errMsg}`);
//     setFiles([]);
//     formRef.current.reset();
//     revalidate('/');
//   }

//   return (
//     <Form onFinish={handleUpload} ref={formRef}>
//       <FormItem>
//         <Input type="file" accept="image/*" multiple onChange={handleInputFile} />
        
//         <h5 style={{ color: 'red' }}>
//           (* Only accept image files less than 1mb in size. up to 6 images)
//         </h5>
//       </FormItem>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
//         {files.map((file, index) => (
//           <PhotoCard key={index} url={URL.createObjectURL(file)} onClick={() => handleDeleteFiles(index)} />
//         ))}
//       </div>
//       <FormItem>
//         <Button icon={<UploadOutlined />} type="primary" htmlType="submit">
//           Upload to Cloudinary
//         </Button>
//       </FormItem>
//     </Form>
//   );
// };

// export default UploadForm;
// // 

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page







