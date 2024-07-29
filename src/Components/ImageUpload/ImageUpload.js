import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import './UploadImage.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Config/Firebase';

const ImageUploadComponent = ({ id, onImageUpload }) => {
    const [pictures, setPictures] = useState([]);

    const onDrop = (pictureFiles) => {
        const file = pictureFiles[0];
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Theo dõi tiến trình upload
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Xử lý lỗi
                console.error('Upload failed:', error);
            },
            () => {
                // Xử lý thành công
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setPictures([downloadURL]);
                    onImageUpload([downloadURL]); // Gọi callback để truyền URL lên component cha
                });
            }
        );
    };
    return (
        <ImageUploader
            withIcon={true}
            buttonText='Chọn ảnh'
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
            singleImage={true}
            fileContainerStyle={{ backgroundColor: '#f8f9fa' }}  // Áp dụng style tùy chỉnh trực tiếp
            id={id}
        />
    );
};


export default ImageUploadComponent;
