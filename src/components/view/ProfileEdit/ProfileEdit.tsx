"use client"
import { USER_ROLE } from '@/constants/role';
import { useUpdateUserMutation, useUserQuery } from '@/redux/api/userApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { message,Form as Forms, Button, Col, Row,Input, Select } from 'antd';
import { redirect } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import UploadPhoto, { getAllPhotos, revalidate } from '../UploadAction/UploadAction';
import EMBreadCrumb from '@/components/ui/EMBreadCrumb/EMBreadCumb';
import PhotoList from '../PhotoList/PhotoList';
import PhotoCard from '../PhotoCard/PhotoCard';
import { UploadOutlined } from '@ant-design/icons';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormTextArea from '@/components/Forms/FormTextArea';
import FormDatePicker from '@/components/Forms/FormDatePicker';
import FormSelectField from '@/components/Forms/FormSelectField';
import { selectBloodGroupOptions } from '@/constants/selectConstantOptions';
import { Option } from 'antd/es/mentions';

const ProfileEdit = ({params,photos,folders,initialFolder}:{params: any, photos: any, folders: any[], initialFolder: string}) => {
      useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.USER){
         redirect('/login')
    }
  },[])
   const { data, isLoading: loading } = useUserQuery(params?.id);
 
console.log(data)

const [updateUser] = useUpdateUserMutation();
 const [selectedFolder, setSelectedFolder] = useState(initialFolder);
 const [folderPhotos, setFolderPhotos] = useState(photos);
 console.log(folderPhotos)

 const formRef = useRef<any>(null);
 useEffect(() => {
    setFolderPhotos(photos);
  }, [photos]);
const handleFolderChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFolder = event.target.value;
    setSelectedFolder(newFolder);
    const updatedPhotos = await getAllPhotos(newFolder);
    setFolderPhotos(updatedPhotos);
    // Update the photos state here if you use a state for photos
  };
 
// .................................................................
 const { Item: FormItem } = Forms;

  const [files, setFiles] = useState([]);

  async function handleInputFile(e:any) {
    const inputFiles = e.target.files;
    const newFiles = [...inputFiles];

    // Filter the files to ensure they meet your criteria
    const filteredFiles = newFiles.filter((file) => {
      return file.size < 2048 * 2048 && file.type.startsWith('image/');
    });

    // Ensure the total number of files doesn't exceed 3
    const totalFiles = [...files, ...filteredFiles];
    const finalFiles = totalFiles.slice(0, 6) as any;

    setFiles(finalFiles);
    formRef?.current?.reset();
  }

  async function handleDeleteFiles(index:any) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  async function handleUpload() {
    if (!files.length) return message.error('No image files are selected');
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
      
    });
     formData.append('folder', selectedFolder);
     
    const res = await UploadPhoto(formData);
    console.log(res)
    
    if (res?.errMsg) message.warning(`Error: ${res.errMsg}`);
    //if (res?.msg) message.success(`Success: ${res.msg}`);
    if (res?.msg){
     message.success(`Success: ${res.msg}`);
      const updatedPhotos = await getAllPhotos(selectedFolder);
      setFolderPhotos(updatedPhotos);

    } 
    setFiles([]);
    formRef.current.reset();
    //revalidate('/');
  }
// .........................................................................


  const onSubmit = async (values: any) => {
    try {
      const res = await updateUser({ id: params?.id, body: values }).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success("Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
 const defaultValues = { 
  name: data?.name,
  email: data?.email,
  //image: data?.image,
   imagess: folderPhotos?.map((photo:any) => ({
    public_id: photo?.public_id,
    secure_url: photo?.secure_url
  })),
  back: data?.back,
  cv: data?.cv,
  features:data?.features,
  framework: data?.framework,
  front: data?.front,
  resume: data?.resume,
  technologyFor: data?.technologyFor,
  tool: data?.tool,
  trainningcenter: data?.trainningcenter,
  facebook:data?.facebook,
  youtube:data?.youtube,
  instagram:data?.instagram,
  tools:data?.tools,
  discord:data?.discord,
  language: data?.language,
  gender: data?.gender,
  contact: data?.contact,
  
  title: data?.title,
  skills: data?.skills,
  aboutme: data?.aboutme,
  fathersname: data?.fathersname,
  mothersname: data?.mothersname,
  marriedstatus: data?.marriedstatus,
  nid: data?.nid,
  birth:data?.birth,
  blood: data?.blood,
  height: data?.height,
  weigth: data?.weigth,
  ssc: data?.ssc,
  hsc: data?.hsc,
  institute:data?.institute,
  degree:data?.degree,
  passingyear: data?.passingyear,
  masters:data?.masters,
  phd: data?.phd,
  presentaddress: data?.presentaddress,
  parmanentaddress: data?.parmanentaddress,
  frontend: data?.frontend,
  backend: data?.backend,
  linkedin: data?.linkedin,
  whatsapp: data?.whatsapp,
  github: data?.github,
  website: data?.website,
  twitter:data?.twitter,
  experience1: data?.experience1,
  experience2: data?.experience2,
  experience3: data?.experience3,
  experience4:data?.experience4,
  experience5: data?.experience5,
  experience6: data?.experience6,
  experience7: data?.experience7,
  experience8:data?.experience8,
  experience9: data?.experience9,
  experience10: data?.experience10,
  extracurriculam: data?.extracurriculam,
  achivement:data?.achivement,
  
  };
  console.log(defaultValues)
  return (
    <div>
     <div style={{display:"flex",justifyContent:"center",margin:"20px"}}>
<h1>User Update Form</h1>
      </div>
      

      <div>
         <EMBreadCrumb
        items={[
          {
            label: "User",
            link: "/user/my-profile",
          },

        ]}
      />

{/* ............... */}
 {/* <Forms onFinish={handleUpload} ref={formRef}>
      <FormItem>
        <Input type="file" accept="image/*" multiple onChange={handleInputFile} />
        
        <h5 style={{ color: 'red' }}>
          (* Only accept image files less than 1mb in size. up to 6 images)
        </h5>
      </FormItem>
    
    
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {files.map((file, index) => (
          <PhotoCard key={index} url={URL.createObjectURL(file)} onClick={() => handleDeleteFiles(index)} />
        ))}
      </div>
     

    
        <Button icon={<UploadOutlined />} type="primary" htmlType="submit">
          Upload to Cloudinary
        </Button>
     
    </Forms>
 <div>
      <h1>All photos</h1>
      <PhotoList photos={photos || []}/>
    </div> */}
 <div>
      <Forms onFinish={handleUpload} ref={formRef}>
        <FormItem name="folder" label="Select Folder" rules={[{ required: true, message: 'Please select a folder!' }]}>
          <select value={selectedFolder} onChange={handleFolderChange}>
            {folders.map((folder:any) => (
              <option key={folder.name} value={folder.name}>
                {folder.name}
              </option>
            ))}
          </select>
        </FormItem>
        <FormItem>
          <Input type="file" accept="image/*" multiple onChange={handleInputFile} />
          <h5 style={{ color: 'red' }}>
            (* Only accept image files less than 1mb in size. up to 6 images)
          </h5>
        </FormItem>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {files.map((file, index) => (
            <PhotoCard key={index} url={URL.createObjectURL(file)} onClick={() => handleDeleteFiles(index)} />
          ))}
        </div>
        <div>
          <h1>All photos</h1>
          <PhotoList photos={folderPhotos || []} />
        </div>
        <Button icon={<UploadOutlined />} type="primary" htmlType="submit">
          Upload photos
        </Button>
      </Forms>
    </div>
 
{/* ................ */}


        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              User Information
            </p>
                {defaultValues?.imagess?.map((image:any, index:any) => (
    <div style={{margin:"10px"}} key={index}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          
          <FormInput
            type="text"
            name={`imagess[${index}].public_id`}
            size="large"
            label={`Public ID ${index + 1}`}
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            type="text"
            name={`imagess[${index}].secure_url`}
            size="large"
            label={`Secure URL ${index + 1}`}
          />
        </Col>
      </Row>
    </div>
  ))}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
           
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="name"
                  size="large"
                  label="Name"
                />
              </Col>
               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="email"
                  name="email"
                  size="large"
                  label="Email address"
                />
              </Col>
              
          <br/>
          
            {/* <PhotoList photos={data?.imagess || []}/> */}
         
     
   
                      <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="front"
                  size="large"
                  label="Front"
                />
              </Col>
                <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="back"
                  size="large"
                  label="Back"
                />
              </Col>
               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="cv"
                  size="large"
                  label="CV"
                />
              </Col>
               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="resume"
                  size="large"
                  label="Resume"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="features"
                  size="large"
                  label="Features"
                />
              </Col>
               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="framework"
                  size="large"
                  label="Framework"
                />
              </Col>

             <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="technologyFor"
                  size="large"
                  label="TechnologyFor"
                />
              </Col>
  

             <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="tool"
                  size="large"
                  label="Tool"
                />
              </Col>
 
             <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="trainningcenter"
                  size="large"
                  label="Trainningcenter"
                />
              </Col>
                  <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="facebook"
                  size="large"
                  label="Facebook"
                />
              </Col>
                  <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="youtube"
                  size="large"
                  label="YouTube"
                />
              </Col>
                <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="discord"
                  size="large"
                  label="Discord"
                />
              </Col>
                  <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="twitter"
                  size="large"
                  label="Twitter"
                />
              </Col>
                 <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="instagram"
                  size="large"
                  label="Instagram"
                />
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                 <FormTextArea
                  name="tools"
                  label="Tools"
                  rows={4}
                />
              </Col>
                 <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="language"
                  size="large"
                  label="Language"
                />
              </Col>
               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="contact"
                  size="large"
                  label="Contact No."
                />
              </Col>
  
                 <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Title"
                />
              </Col>
           
                  <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                 <FormTextArea
                  name="skills"
                  label="Skills"
                  rows={4}
                />
              </Col>
                <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="gender"
                  size="large"
                  label="gender"
                />
              </Col>
             
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
              </Col>
          
            </Row>
          </div>

          {/* basic info */}
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Basic Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
             
            
             <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  name="aboutme"
                  label="About Me"
                  rows={4}
                />
              </Col>
             <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  name="fathersname"
                  label="Father's Name"
                  rows={4}
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  name="mothersname"
                  label="Mother's Name"
                  rows={4}
                />
              </Col>
               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  name="marriedstatus"
                  label="Married Status"
                  rows={4}
                />
              </Col>
               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  name="nid"
                  label="NID"
                 rows={1}
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  name="birth"
                  label="Date of birth"
                  size="large"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="blood"
                  options={selectBloodGroupOptions}
                  label="Blood group"
                  placeholder="Select"
                />
              </Col>
               <Col  className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormTextArea
                  name="height"
                  label="Height"
                  rows={1}
                />
              </Col>
               <Col  className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormTextArea
                  name="weight"
                  label="Weight"
                  rows={1}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="ssc"
                  label="SSC"
                 rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="hsc"
                  label="HSC"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="institute"
                  label="University Name"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="degree"
                  label="Degree"
                  rows={4}
                />
              </Col>
              <Col className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }} >
                <FormDatePicker
                  name="passingyear"
                  label="Passing Year"
                  size="large"
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="masters"
                  label="Masters"
                  rows={4}
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="phd"
                  label="PHD"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="presentaddress"
                  label="Present address"
                  rows={4}
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="parmanentaddress"
                  label="Permanent address"
                  rows={4}
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="frontend"
                  label="Frontend"
                  rows={4}
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="backend"
                  label="Backend"
                  rows={4}
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="linkedin"
                  label="LinkedIn"
                  
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="whatsapp"
                  label="Whatsapp"
            
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="github"
                  label="Github"
                  
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="website"
                  label="Website"
                
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience1"
                  label="Experience:1"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience2"
                  label="Experience:2"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience3"
                  label="Experience:3"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience4"
                  label="Experience:4"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience5"
                  label="Experience:5"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience6"
                  label="Experience:6"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience7"
                  label="Experience:7"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience8"
                  label="Experience:8"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience9"
                  label="Experience:9"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience10"
                  label="Experience:10"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="extracurriculam"
                  label="Extra curriculam"
                  rows={4}
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="achivement"
                  label="Achivement"
                  rows={4}
                />
              </Col>
            </Row>
          </div>
          <Button type="primary" htmlType="submit">
          Update
        </Button>
        </Form>
      </div>
    
    
    </div>
  )
}

export default ProfileEdit