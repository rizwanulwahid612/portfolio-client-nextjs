"use client"

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input } from "antd";
import { useFormContext,Controller } from "react-hook-form";

interface IInput{
    name:string;
    type?:string;
    size?:"large"|"small";
    value?:string|string[]|undefined;
    id?:string;
    placeholder?:string;
    validation?:object;
    label?:string;
    required?:boolean,
    disabled?:boolean,
    multiple?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    accept?:string;
  }

const FormInput = ({name,type,size,value,id,placeholder,validation,label,required,disabled, multiple,
  onChange,accept}:IInput) => {
 const {control ,formState:{errors}}=useFormContext()

 const errorMessage=getErrorMessageByPropertyName(errors,name)

  return (
   <>
   {required?<span style={{color:"red"}}>*</span>:null}{label? label:null}
    <Controller
        control={control}
        name={name}
        //render={({ field: { onChange, onBlur, value, ref } }) => (
        render={({field}) => (
          type==="password"?(
        <Input.Password 
          type={type} 
          size={size} 
          placeholder={placeholder}
          {...field}
          value={value?value:field.value}
          onChange={(e) => {
                field.onChange(e);
                if (onChange) onChange(e);
              }}
          disabled={disabled}    
          />
          ):(
        <Input
          type={type} 
          size={size} 
          placeholder={placeholder}
          {...field}
          value={value?value:field.value}
           onChange={(e) => {
                field.onChange(e);
                if (onChange) onChange(e);
              }}
              multiple={multiple}
              disabled={disabled}
              accept={accept}
              />    
          )
        )}
      />
      <small style={{color:"red"}}>{errorMessage}</small>
   </>
  )
}

export default FormInput
