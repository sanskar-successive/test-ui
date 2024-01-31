import React, { useState } from 'react';
import { Button, message, Upload, UploadOutlined } from '../../../../lib/generics';
import { BookService } from '../../Service';

const UploadFile = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file);
    });
    setUploading(true);
    try {
      await BookService.uploadCsvFile(formData);
    } catch (error) {
      message.error(error.message);

    } finally {
      setUploading(false);
    }
  };
  const props = {
    accept : ".csv",
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};
export default UploadFile;