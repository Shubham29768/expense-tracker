import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilerPhotoSalactor = ({image,setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange =(event) =>{
        const file = event.target.file[0];
        if(file){
            //update the image state
            setImage(file);

            //Genrte Preview Url from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl (preview);
        }
    };
    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () =>{
        inputRef.current.click();
    };
  return (
    <div>
      ProfilerPhotoSalactor 
    </div>
  )
}

export default ProfilerPhotoSalactor
