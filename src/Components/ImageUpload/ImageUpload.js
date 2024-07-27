import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import './uploadImage.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Config/Firebase';

const ImageUploadComponent = ({ id, onImageUpload }) => {
    const [pictures, setPictures] = useState([]);

    const onDrop = async (pictureFiles) => {
        const file = pictureFiles[0];
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        try {
            await new Promise((resolve, reject) => {
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
                        reject(error);
                    },
                    () => {
                        // Hoàn thành upload
                        resolve();
                    }
                );
            });

            // Lấy URL sau khi upload thành công
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            setPictures([downloadURL]);
            onImageUpload([downloadURL]); // Gọi callback để truyền URL lên component cha
        } catch (error) {
            console.error('Error during upload:', error);
        }
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
