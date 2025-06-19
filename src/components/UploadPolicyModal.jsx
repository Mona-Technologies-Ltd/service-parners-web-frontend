import React from "react";
import styled from "styled-components";

const UploadPolicyModal = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Upload Policy Document</ModalHeader>
        <ModalBody>
          <FormGroup>
            <FormLabel>Policy Number</FormLabel>
            <FormInput placeholder="Enter Policy Number" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Upload Certificate</FormLabel>
            <FileUploadContainer>
              <FileUploadButton>Choose File</FileUploadButton>
              <FileUploadText>No file chosen</FileUploadText>
            </FileUploadContainer>
          </FormGroup>
          <ModalActions>
            <SubmitButton>Submit</SubmitButton>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
          </ModalActions>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// Modal styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 500px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  background-color: #00439e;
  color: white;
  padding: 12px 20px;
  font-size: 18px;
  font-weight: 500;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
`;

const FileUploadContainer = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
`;

const FileUploadButton = styled.button`
  background-color: white;
  color: #333;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-right: 10px;
  font-weight: 500;
`;

const FileUploadText = styled.span`
  color: #999;
  font-size: 14px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: white;
  color: #f44336;
  border: 1px solid #f44336;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export default UploadPolicyModal;
