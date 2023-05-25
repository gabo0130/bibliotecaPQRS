import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onDrop }) => {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (onDrop) {
        onDrop(acceptedFiles);
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

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
        <p>Arrastra aquí los archivos o haz clic para seleccionarlos.</p>
      )}
    </div>
  );
};

export default Dropzone;
