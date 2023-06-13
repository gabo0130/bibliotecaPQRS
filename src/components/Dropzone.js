import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/Dropzone.css'

const Dropzone = ({ onDrop, archivos }) => {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (onDrop) {
        acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
        onDrop(acceptedFiles);
      }
    },
    [onDrop]
  );
  
  const getImageByFileType = (file) => {
    if (file.type.startsWith('image/')) {
      return file.preview;
    } else if (file.type.startsWith('text/plain')) {
      return require('../data/txt.png');
    } else if (file.type.startsWith('application/pdf')) {
      return require('../data/pdf.png');
    } else {
      return require('../data/file.png');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  const thumbs = archivos.map((file) => (
    <div className='container' key={file.name}>
      <div>
        <img src={getImageByFileType(file)} alt={file.name} onLoad={() => URL.revokeObjectURL(file.preview)} />
        <span >{file.name}</span>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => archivos.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);
  const dropzoneStyles = {
    width: '50%',
    margin: '40px auto',
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: isDragActive ? '#f2f2f2' : '#fff',
    color: isDragActive ? '#000' : '#777',
    cursor: 'pointer',
    outline: 'none',
    transition: 'border .24s ease-in-out, color .24s ease-in-out, background-color .24s ease-in-out'
  };

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta los archivos aquí...</p>
      ) : (
        <>
          <p>Arrastra aquí los archivos o haz clic para seleccionarlos.</p>
          <aside>
            {thumbs}
          </aside>
        </>
      )}
    </div>
  );
};

export default Dropzone;