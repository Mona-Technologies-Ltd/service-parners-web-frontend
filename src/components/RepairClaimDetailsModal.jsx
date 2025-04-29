import React from "react";
import styled from "styled-components";

const RepairClaimDetailsModal = ({ onClose }) => {
  return (
    <ModalOverlay>
      <RepairClaimModalContent>
        <RepairClaimHeader>Repair Claim Details</RepairClaimHeader>
        <RepairClaimBody>
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

          <TotalSection>
            <TotalRow>
              <TotalLabel>Total:</TotalLabel>
              <TotalValue>₹120,000</TotalValue>
            </TotalRow>
            <TotalRow>
              <TotalLabel>Device Balance:</TotalLabel>
              <TotalValue>₹120,000</TotalValue>
            </TotalRow>
            <TotalRow>
              <TotalLabel>Amount Payable:</TotalLabel>
              <TotalValue>₹120,000</TotalValue>
            </TotalRow>
          </TotalSection>

          <ReviewDamageSection>
            <ReviewDamageLabel>Review Damage:</ReviewDamageLabel>
            <WatchVideoButton>
              Watch Video <VideoIcon>▶</VideoIcon>
            </WatchVideoButton>
          </ReviewDamageSection>

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

          <SectionTitle>Customer Review</SectionTitle>
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

          <CloseButtonContainer>
            <CloseButton onClick={onClose}>Close</CloseButton>
          </CloseButtonContainer>
        </RepairClaimBody>
      </RepairClaimModalContent>
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

const RepairClaimModalContent = styled.div`
  background-color: white;
  width: 700px;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const RepairClaimHeader = styled.div`
  background-color: #0056b3;
  color: white;
  padding: 12px 20px;
  font-size: 18px;
  font-weight: 500;
`;

const RepairClaimBody = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
`;

const ClaimDetailSection = styled.div`
  margin-bottom: 20px;
`;

const ClaimDetailItem = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const ClaimDetailLabel = styled.div`
  font-weight: 500;
  color: #333;
  width: 150px;
`;

const ClaimDetailValue = styled.div`
  color: #666;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 20px 0 10px;
`;

const DeviceInfoTable = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const DeviceInfoHeader = styled.div`
  display: flex;
  background-color: #f5f5f5;
`;

const DeviceInfoHeaderCell = styled.div`
  padding: 10px;
  font-weight: 500;
  flex: 1;
  border-right: 1px solid #ddd;

  &:last-child {
    border-right: none;
  }
`;

const DeviceInfoRow = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
`;

const DeviceInfoCell = styled.div`
  padding: 10px;
  flex: 1;
  border-right: 1px solid #ddd;

  &:last-child {
    border-right: none;
  }
`;

const DeviceIDLink = styled.a`
  color: #0056b3;
  text-decoration: none;
  cursor: pointer;
`;

const ViewMoreLink = styled.a`
  color: #0056b3;
  text-decoration: none;
  cursor: pointer;
`;

const ClaimsInfoTable = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const ClaimsInfoHeader = styled.div`
  display: flex;
  background-color: #f5f5f5;
`;

const ClaimsInfoHeaderCell = styled.div`
  padding: 10px;
  font-weight: 500;

  &:first-child {
    flex: 2;
  }
  &:last-child {
    flex: 1;
    text-align: right;
  }
`;

const ClaimsInfoRow = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
`;

const ClaimsInfoCell = styled.div`
  padding: 10px;

  &:first-child {
    flex: 2;
  }
  &:last-child {
    flex: 1;
    text-align: right;
  }
`;

const TotalSection = styled.div`
  margin-left: auto;
  width: 50%;
  margin-bottom: 20px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const TotalLabel = styled.div`
  font-weight: 500;
`;

const TotalValue = styled.div`
  font-weight: 500;
`;

const ReviewDamageSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ReviewDamageLabel = styled.div`
  font-weight: 500;
  margin-right: 15px;
`;

const WatchVideoButton = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  color: #f44336;
  border: 1px solid #f44336;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
`;

const VideoIcon = styled.span`
  margin-left: 5px;
`;

const DescriptionSection = styled.div`
  margin-bottom: 15px;
`;

const DescriptionLabel = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
`;

const DescriptionText = styled.div`
  background-color: #f5f9ff;
  padding: 10px;
  color: #4a90e2;
  font-size: 14px;
`;

const ReviewSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
`;

const ReviewCard = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  display: flex;
`;

const RatingSection = styled.div`
  margin-right: 15px;
`;

const ReviewContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ReviewInfo = styled.div`
  margin-bottom: 10px;
`;

const ReviewerName = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const ReviewClaimId = styled.div`
  color: #0056b3;
  font-size: 14px;
  margin-bottom: 5px;
`;

const ReviewTag = styled.span`
  display: inline-block;
  background-color: #e6f7ff;
  color: #0056b3;
  padding: 2px 8px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const ReviewComment = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewStars = styled.div`
  color: #ffb400;
`;

const ReviewDate = styled.div`
  color: #999;
  font-size: 12px;
`;

const RatingCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f2f9e5;
  color: #7cb305;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export default RepairClaimDetailsModal;
