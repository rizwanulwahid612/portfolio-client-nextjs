


import Image from "next/image"
import { useTransition } from "react"

const PhotoCard = ({url,onClick}:{url:any,onClick:any}) => {
  const [isPanding,startTransition]=useTransition();
  return (
    <div>
        <div style={{display:"flex",border:"2px solid red", padding:5}}>
           
            <Image src={url} alt='image' width={100} height={100} priority />
        </div>
        <button type="button" onClick={()=>startTransition(onClick)} disabled={isPanding}>
          {isPanding? 'Loading...': 'Delete'}
          </button>
    </div>
  )
}

export default PhotoCard