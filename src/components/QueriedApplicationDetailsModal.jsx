import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Button, Modal } from "antd";
import { Icon } from "@iconify/react";

const QueriedApplicationDetailsModal = ({ visible, onClose, application }) => {
  return (
    <>
      <ButtonStyleOverrides />
      <StyledModal
        open={visible}
        footer={null}
        closable={false}
        width={800}
        onCancel={onClose}
        centered
        destroyOnClose
      >
        <ModalHeader>
          Repair Claim Details
          <CloseButton onClick={onClose}>
            <Icon icon="mdi:close" width="20" height="20" />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          {/* Claim Details Section */}
          <ClaimDetailSection>
            <ClaimDetailItem>
              <ClaimDetailLabel>Claim ID:</ClaimDetailLabel>
              <ClaimDetailValue>12345678</ClaimDetailValue>
            </ClaimDetailItem>
            <ClaimDetailItem>
              <ClaimDetailLabel>Created On:</ClaimDetailLabel>
              <ClaimDetailValue>2025-01-15</ClaimDetailValue>
            </ClaimDetailItem>
            <ClaimDetailItem>
              <ClaimDetailLabel>Claim Type:</ClaimDetailLabel>
              <ClaimDetailValue>Accidental Damage</ClaimDetailValue>
            </ClaimDetailItem>
            <ClaimDetailItem>
              <ClaimDetailLabel>Total Sum Insured:</ClaimDetailLabel>
              <ClaimDetailValue>₹10,000</ClaimDetailValue>
            </ClaimDetailItem>
            <ClaimDetailItem>
              <ClaimDetailLabel>Balance:</ClaimDetailLabel>
              <ClaimDetailValue>₹10,000</ClaimDetailValue>
            </ClaimDetailItem>
          </ClaimDetailSection>

          {/* Messages Section */}
          <MessagesContainer>
            <Message>
              <MessageInfo>Admin John Doe | 2025-01-15 | 10:30 AM</MessageInfo>
              <MessageText>
                Please ensure the documents are correctly uploaded
              </MessageText>
            </Message>
            <Message>
              <MessageInfo>
                Admin Jane Smith | 2025-01-15 | 11:00 AM
              </MessageInfo>
              <MessageText>Awaiting confirmation from the customer</MessageText>
            </Message>
          </MessagesContainer>

          {/* Action Buttons */}
          <ActionButtonsContainer>
            <AddResponseButton className="add-response-button">
              Add Response
            </AddResponseButton>
            <ApproveButton className="approve-button">
              Approve Claim
            </ApproveButton>
          </ActionButtonsContainer>

          {/* Device Information */}
          <SectionTitle>Device Information</SectionTitle>
          <DeviceInfoTable>
            <DeviceInfoHeader>
              <DeviceInfoHeaderCell>Device ID</DeviceInfoHeaderCell>
              <DeviceInfoHeaderCell>Device Brand</DeviceInfoHeaderCell>
              <DeviceInfoHeaderCell>Model</DeviceInfoHeaderCell>
              <DeviceInfoHeaderCell>IMEI</DeviceInfoHeaderCell>
              <DeviceInfoHeaderCell>Policy Document</DeviceInfoHeaderCell>
            </DeviceInfoHeader>
            <DeviceInfoRow>
              <DeviceInfoCell>
                <DeviceIDLink>#0001</DeviceIDLink>
              </DeviceInfoCell>
              <DeviceInfoCell>Samsung</DeviceInfoCell>
              <DeviceInfoCell>Galaxy S22</DeviceInfoCell>
              <DeviceInfoCell>356789123456789</DeviceInfoCell>
              <DeviceInfoCell>
                <ViewMoreLink>View More</ViewMoreLink>
              </DeviceInfoCell>
            </DeviceInfoRow>
          </DeviceInfoTable>

          {/* Claims Information */}
          <SectionTitle>Claims Information</SectionTitle>
          <ClaimsInfoTable>
            <ClaimsInfoHeader>
              <ClaimsInfoHeaderCell>Description</ClaimsInfoHeaderCell>
              <ClaimsInfoHeaderCell>Amount</ClaimsInfoHeaderCell>
            </ClaimsInfoHeader>
            <ClaimsInfoRow>
              <ClaimsInfoCell>Screen Damage</ClaimsInfoCell>
              <ClaimsInfoCell>₹50,000</ClaimsInfoCell>
            </ClaimsInfoRow>
            <ClaimsInfoRow>
              <ClaimsInfoCell>Battery Issue</ClaimsInfoCell>
              <ClaimsInfoCell>₹60,000</ClaimsInfoCell>
            </ClaimsInfoRow>
            <ClaimsInfoRow>
              <ClaimsInfoCell>Service Fee</ClaimsInfoCell>
              <ClaimsInfoCell>₹10,000</ClaimsInfoCell>
            </ClaimsInfoRow>
          </ClaimsInfoTable>

          {/* Totals Section */}
          <TotalSection>
            <TotalRow>
              <TotalLabel>Total:</TotalLabel>
              <TotalValue>₹120,000</TotalValue>
            </TotalRow>
            <TotalRow>
              <TotalLabel>Amount Payable:</TotalLabel>
              <TotalValue>₹120,000</TotalValue>
            </TotalRow>
            <TotalRow>
              <TotalLabel>Device Balance:</TotalLabel>
              <TotalValue>₹120,000</TotalValue>
            </TotalRow>
          </TotalSection>

          {/* Review Damage */}
          <ReviewDamageSection>
            <ReviewDamageLabel>Review Damage:</ReviewDamageLabel>
            <WatchVideoButton className="watch-video-button">
              Watch Video{" "}
              <Icon
                icon="majesticons:play"
                width="16"
                height="16"
                color="#F44336"
              />
            </WatchVideoButton>
          </ReviewDamageSection>

          {/* General Description */}
          <SectionTitle>General Description</SectionTitle>

          <DescriptionSection>
            <DescriptionLabel>When</DescriptionLabel>
            <DescriptionText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </DescriptionText>
          </DescriptionSection>

          <DescriptionSection>
            <DescriptionLabel>Where</DescriptionLabel>
            <DescriptionText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </DescriptionText>
          </DescriptionSection>

          <DescriptionSection>
            <DescriptionLabel>How</DescriptionLabel>
            <DescriptionText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </DescriptionText>
          </DescriptionSection>

          {/* Customer Review */}
          <ReviewCard>
            <ReviewContent>
              <ReviewInfo>
                <ReviewerName>John Doe</ReviewerName>
                <ReviewClaimId>Claim ID: CL-134763</ReviewClaimId>
                <ReviewTag>Accidental Damage</ReviewTag>
              </ReviewInfo>
              <ReviewComment>
                Ajay did a great job assisting us with the repairs of my iPhone
                13
              </ReviewComment>
              <ReviewFooter>
                <ReviewStars>★ ★ ★ ★ ☆</ReviewStars>
                <ReviewDate>2 months ago</ReviewDate>
              </ReviewFooter>
            </ReviewContent>
            <RatingSection>
              <RatingCircle>4.5</RatingCircle>
            </RatingSection>
          </ReviewCard>
        </ModalBody>
      </StyledModal>
    </>
  );
};

// Global style overrides for antd buttons
const ButtonStyleOverrides = createGlobalStyle`
  .ant-btn:hover,
  .ant-btn:focus {
    color: inherit;
    border-color: inherit;
    background: inherit;
  }
  
  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    color: white;
    background-color: #005bb5;
    border-color: #005bb5;
  }
`;

// Styled Components
const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 0;
    overflow: hidden;
    border-radius: 4px;
  }

  .ant-modal-body {
    padding: 0;
  }
`;

const ModalHeader = styled.div`
  background-color: #0066cc;
  color: white;
  padding: 16px 20px;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ClaimDetailSection = styled.div`
  margin-bottom: 20px;
`;

const ClaimDetailItem = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const ClaimDetailLabel = styled.div`
  font-weight: 500;
  width: 150px;
`;

const ClaimDetailValue = styled.div`
  color: #333;
`;

const MessagesContainer = styled.div`
  background-color: #f5f5f5;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const Message = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MessageInfo = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const MessageText = styled.div`
  color: #555;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const AddResponseButton = styled(Button)`
  background-color: #0066cc !important;
  color: white !important;
  border: none !important;
  height: auto;
  padding: 8px 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover,
  &:focus {
    background-color: #005bb5 !important;
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ApproveButton = styled(Button)`
  background-color: white !important;
  color: #0066cc !important;
  border: 1px solid #0066cc !important;
  height: auto;
  padding: 8px 16px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    border-color: #005bb5 !important;
    color: #005bb5 !important;
    background-color: #f0f7ff !important;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const DeviceInfoTable = styled.div`
  margin-bottom: 24px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
`;

const DeviceInfoHeader = styled.div`
  display: flex;
  background-color: #f5f5f5;
`;

const DeviceInfoHeaderCell = styled.div`
  flex: 1;
  padding: 10px;
  font-weight: 500;
`;

const DeviceInfoRow = styled.div`
  display: flex;
`;

const DeviceInfoCell = styled.div`
  flex: 1;
  padding: 10px;
  border-top: 1px solid #e8e8e8;
`;

const DeviceIDLink = styled.a`
  color: #0066cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ViewMoreLink = styled.a`
  color: #0066cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ClaimsInfoTable = styled.div`
  margin-bottom: 24px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
`;

const ClaimsInfoHeader = styled.div`
  display: flex;
  background-color: #f5f5f5;
`;

const ClaimsInfoHeaderCell = styled.div`
  flex: 1;
  padding: 10px;
  font-weight: 500;
`;

const ClaimsInfoRow = styled.div`
  display: flex;
  &:not(:last-child) {
    border-bottom: 1px solid #e8e8e8;
  }
`;

const ClaimsInfoCell = styled.div`
  flex: 1;
  padding: 10px;
`;

const TotalSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 24px;
`;

const TotalRow = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const TotalLabel = styled.div`
  font-weight: 500;
  margin-right: 12px;
`;

const TotalValue = styled.div`
  font-weight: 500;
  width: 100px;
  text-align: right;
`;

const ReviewDamageSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const ReviewDamageLabel = styled.div`
  font-weight: 500;
  margin-right: 12px;
`;

const WatchVideoButton = styled(Button)`
  background-color: white !important;
  color: #f44336 !important;
  border: 1px solid #f44336 !important;
  height: auto;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    color: white !important;
    background-color: #f44336 !important;
    border-color: #f44336 !important;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DescriptionSection = styled.div`
  margin-bottom: 16px;
`;

const DescriptionLabel = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const DescriptionText = styled.div`
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  color: #555;
`;

const ReviewCard = styled.div`
  margin-top: 24px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  background-color: #f9f9f9;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #0099ff, #2196f3);
    transform: rotate(45deg) translate(20px, -70px);
  }
`;

const ReviewContent = styled.div`
  flex: 1;
  z-index: 1;
`;

const ReviewInfo = styled.div`
  margin-bottom: 12px;
`;

const ReviewerName = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const ReviewClaimId = styled.div`
  color: #0066cc;
  margin-bottom: 4px;
`;

const ReviewTag = styled.div`
  display: inline-block;
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 4px;
`;

const ReviewComment = styled.div`
  margin-bottom: 12px;
  color: #555;
`;

const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewStars = styled.div`
  color: #ffc107;
`;

const ReviewDate = styled.div`
  color: #777;
  font-size: 12px;
`;

const RatingSection = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const RatingCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #8bc34a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
`;

export default QueriedApplicationDetailsModal;
