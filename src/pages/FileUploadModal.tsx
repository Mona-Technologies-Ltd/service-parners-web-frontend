import React from "react";
import { Modal, Upload, Button, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Dragger } = Upload;
const { Title, Text } = Typography;

const StyledModalBody = styled.div`
  padding: 24px;
  text-align: center;

  .ant-upload-wrapper {
    margin-top: 16px;
    margin-bottom: 24px;
  }

  .ant-btn {
    width: 100%;
    height: 48px;
    font-weight: 600;
    background-color: #0052cc;
    border: none;
    color: #fff;
    font-size: 16px;
  }

  .ant-btn:hover {
    background-color: #003e99;
  }

  .ant-upload-drag {
    padding: 32px;
    background-color: #f7fbff;
    border: 2px dashed #91d5ff;
    border-radius: 8px;
  }

  .upload-text {
    margin-top: 8px;
    font-size: 14px;
    color: #595959;
  }

  .ant-upload-icon {
    font-size: 32px;
    color: #1890ff;
  }

  .drag-text {
    font-size: 16px;
    font-weight: 500;
  }
`;

const FileUploadModal = ({
  visible,
  onCancel,
  onSubmit,
  onFileChange,
  title,
  subtitle,
  uploadText,
}) => {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={520}
      closeIcon
    >
      <StyledModalBody>
        <Title level={3} style={{ marginBottom: 8 }}>
          {title}
        </Title>
        <Text type="secondary">{subtitle}</Text>

        <Dragger
          name="file"
          beforeUpload={() => false}
          onChange={onFileChange}
          showUploadList={true}
          accept=".pdf,.doc,.docx"
          maxCount={1}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="drag-text">{uploadText}</p>
          <p className="upload-text">PDF, DOC, or DOCX up to 30MB</p>
        </Dragger>

        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </StyledModalBody>
    </Modal>
  );
};

export default FileUploadModal;
