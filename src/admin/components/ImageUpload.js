import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from '../../firebase'; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'; // Assuming toast is available, else use alert

const ImageUpload = ({ onUploadComplete, label = "Upload Image", constraints }) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Helper: Validate Dimensions & Size
  const validateImage = (file) => {
    return new Promise((resolve, reject) => {
      // 1. Check File Size (Dynamic based on dimensions)
      let maxSizeBytes = 1024 * 1024; // Default 1MB
      if (constraints) {
         if (constraints.width >= 2000) maxSizeBytes = 2 * 1024 * 1024; // 2MB for Banners
         else if (constraints.width <= 500) maxSizeBytes = 1024 * 1024;  // 500KB for Small images
      }

      if (file.size > maxSizeBytes) {
        reject(`File is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Max allowed: ${(maxSizeBytes / 1024 / 1024).toFixed(2)}MB`);
        return;
      }

      // 2. Check Dimensions
      if (constraints) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          URL.revokeObjectURL(img.src);
          const { width, height, exact } = constraints;

          if (exact) {
             // Strict Check (e.g., HOD Image)
             if (img.width !== width || img.height !== height) {
                reject(`Image must be exactly ${width}x${height}px. (Yours: ${img.width}x${img.height}px)`);
             } else {
                resolve(true);
             }
          } else {
             // Limit Check (e.g., Banner)
             if (img.width > width || img.height > height) {
                reject(`Image exceeds limit of ${width}x${height}px. (Yours: ${img.width}x${img.height}px)`);
             } else {
                resolve(true);
             }
          }
        };
        img.onerror = () => reject("Invalid image file.");
      } else {
        resolve(true);
      }
    });
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
        // Validate before uploading
        await validateImage(file);

        setUploading(true);
        const storageRef = ref(storage, `images/content-${uuidv4()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(p);
          },
          (error) => {
            console.error("Upload error:", error);
            setUploading(false);
            alert("Image upload failed!");
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            onUploadComplete(downloadURL);
          }
        );

    } catch (error) {
        alert(error); // Show validation error
        setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: {'image/*': []},
    multiple: false
  });

  return (
    <div className="image-upload-container" style={{ margin: '10px 0' }}>
      <label style={{display:'block', marginBottom:'5px', fontWeight:'bold', fontSize:'14px'}}>
        {label} 
        {constraints && (
            <span style={{fontWeight:'normal', color:'#666', fontSize:'12px', marginLeft:'5px'}}>
               ({constraints.exact ? 'Exact' : 'Max'}: {constraints.width}x{constraints.height}px)
            </span>
        )}
      </label>
      
      <div 
        {...getRootProps()} 
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
          borderRadius: '8px'
        }}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p style={{color:'#0072C6', fontWeight:'bold'}}>Uploading... {Math.round(progress)}%</p>
        ) : (
          <p style={{fontSize:'13px', color:'#555'}}>Drag & drop or click to select</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;