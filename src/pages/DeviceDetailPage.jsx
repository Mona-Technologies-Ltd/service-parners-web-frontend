import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UploadPolicyModal from "../components/UploadPolicyModal";
import RepairClaimDetailsModal from "../components/RepairClaimDetailsModal";
import RepairClaimModalDevice from "../components/claim/RepairClaimModalDevice";

const DeviceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showClaimDetailsModal, setShowClaimDetailsModal] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Mock device data - in a real app, fetch this based on the id
  const device = {
    id: id,
    brand: "Apple",
    brandLogo: "/iphonelogo.svg",
    deviceImage: "/videoPlay.svg",
    model: "iPhone 1 Pro Max",
    nickname: "My fav",
    deviceId: "PLU3766",
    phoneNumber: "08129171O4367",
    imei: "16254242826262",
    onboardingCenter: "Mona Tech",
    dateOnboarded: "Dec 6, 2024",
    expiryDate: "Dec 6, 2024",
    deviceCondition: "New",
    totalSumInsured: "₦25,000.00",
    premium: "₦25,000.00",
    balance: "₦25,000.00",
    customer: {
      firstName: "Joseph",
      lastName: "Prince",
      dob: "Jan 19 1980",
      gender: "Male",
    },
    claims: [
      {
        claimId: "PLU3766",
        issue: "Damaged screen",
        date: "Dec 6, 2024",
        status: "In progress",
      },
      {
        claimId: "PLU3766",
        issue: "Damaged screen",
        date: "Dec 6, 2024",
        status: "Done",
      },
    ],
    coverage: [
      "Accidental Damage",
      "Hardware Failure (Impact)",
      "Repair Guaranteed",
    ],
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  // const handleCloseModal = () => {
  //   setShowUploadModal(false);
  //   setShowClaimDetailsModal(false);
  // };

//   React.useEffect(() => {
//   console.log("Modal open state changed:", showClaimDetailsModal);
// }, [showClaimDetailsModal]);

//   const handleViewMoreClick = () => {
//     setShowClaimDetailsModal(true);
//     alert(showClaimDetailsModal)
//   };
const handleViewDetails = (claim) => {
  setSelectedDevice(claim);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setShowUploadModal(false);
  setIsModalOpen(false);
  setSelectedDevice(null);
};


// const handleCloseModal = () => {
//   setIsModalOpen(false);
//   setSelectedDevice(null);
// };

  return (
    <Container>
      <ContentWrapper>
        <LeftSection>
          <DeviceImageContainer>
            <DeviceImage
              src={device.deviceImage}
              alt={`${device.brand} device`}
            />
            <PlayButtonContainer>
              <PlayIcon src="/playIcon.svg" alt="Play video" />
              <PlayText>Click button to watch onboarding video</PlayText>
            </PlayButtonContainer>
          </DeviceImageContainer>
          <DownloadVideoButton>
            Download Video <DownloadIcon src="/download.svg" alt="Download" />
          </DownloadVideoButton>

          <PolicyInfoContainer>
            <PolicyNumberRow>
              <PolicyLabel>Policy Number</PolicyLabel>
              <PolicyNumber>POL123456789</PolicyNumber>
            </PolicyNumberRow>
            <UploadPolicyButton onClick={handleUploadClick}>
              Upload Policy Document
            </UploadPolicyButton>
          </PolicyInfoContainer>
        </LeftSection>

        <RightContentSection>
          <TopRowContainer>
            <MiddleSection>
              <DetailsSection>
                <SectionHeader>Customer Information</SectionHeader>
                <DetailRow>
                  <DetailLabel>First Name</DetailLabel>
                  <DetailValue>{device.customer.firstName}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Last Name</DetailLabel>
                  <DetailValue>{device.customer.lastName}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>D.O.B.</DetailLabel>
                  <DetailValue>{device.customer.dob}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Gender</DetailLabel>
                  <DetailValue>{device.customer.gender}</DetailValue>
                </DetailRow>
              </DetailsSection>

              <BrandDetailsSection>
                <BrandHeader>
                  <BrandLogo
                    src={device.brandLogo}
                    alt={`${device.brand} logo`}
                  />
                  <BrandName>{device.brand}</BrandName>
                </BrandHeader>

                <DetailRow>
                  <DetailLabel>Model</DetailLabel>
                  <DetailValue>{device.model}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Device id</DetailLabel>
                  <DetailValue>{device.deviceId}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>IMEI</DetailLabel>
                  <DetailValue>{device.imei}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Onboarding Date</DetailLabel>
                  <DetailValue>{device.dateOnboarded}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Device Condition</DetailLabel>
                  <DetailValue>{device.deviceCondition}</DetailValue>
                </DetailRow>
              </BrandDetailsSection>
            </MiddleSection>

            <ClaimsSectionWrapper>
              <ClaimsSection>
                <ClaimsHeader>
                  Claims <ClaimsCount>(6)</ClaimsCount>
                </ClaimsHeader>

                <ClaimsList>
                  <ClaimItem>
                    <ClaimRow>
                      <ClaimLabel>Claim id</ClaimLabel>
                      <ClaimValue>PLU3766</ClaimValue>
                    </ClaimRow>
                    <ClaimRow>
                      <ClaimLabel>Issue</ClaimLabel>
                      <ClaimValue>Damaged screen</ClaimValue>
                    </ClaimRow>
                    <ClaimRow>
                      <ClaimLabel>Date</ClaimLabel>
                      <ClaimValue>Dec 6, 2024</ClaimValue>
                    </ClaimRow>
                    <ClaimRow>
                      <ClaimLabel>Status</ClaimLabel>
                      <StatusBadge status="In progress">
                        In progress
                      </StatusBadge>
                    </ClaimRow>
                    <ViewMoreButton onClick={() => handleViewDetails(device['claims'][0])}>
                      View More
                    </ViewMoreButton>
                  </ClaimItem>

                  <ClaimItem>
                    <ClaimRow>
                      <ClaimLabel>Claim id</ClaimLabel>
                      <ClaimValue>PLU3766</ClaimValue>
                    </ClaimRow>
                    <ClaimRow>
                      <ClaimLabel>Issue</ClaimLabel>
                      <ClaimValue>Damaged screen</ClaimValue>
                    </ClaimRow>
                    <ClaimRow>
                      <ClaimLabel>Date</ClaimLabel>
                      <ClaimValue>Dec 6, 2024</ClaimValue>
                    </ClaimRow>
                    <ClaimRow>
                      <ClaimLabel>Status</ClaimLabel>
                      <StatusBadge status="Done">Done</StatusBadge>
                    </ClaimRow>
                     <ViewMoreButton onClick={() => handleViewDetails(device['claims'][0])}>
                      View More
                    </ViewMoreButton>
                  </ClaimItem>
                </ClaimsList>
              </ClaimsSection>
            </ClaimsSectionWrapper>
          </TopRowContainer>

          <ProtectionPlanSection>
            <ProtectionPlanTitle>Protection Plan Details</ProtectionPlanTitle>
            <ProtectionPlanContent>
              <DatesSection>
                <DateBox>
                  <DateLabel>Total Sum Insured</DateLabel>
                  <DateValue>{device.totalSumInsured}</DateValue>
                </DateBox>
                <DateBox>
                  <DateLabel>Premium</DateLabel>
                  <DateValue>{device.premium}</DateValue>
                </DateBox>
                <DateBox>
                  <DateLabel>Expiry date</DateLabel>
                  <DateValue>{device.expiryDate}</DateValue>
                </DateBox>
                <DateBox>
                  <DateLabel>Balance</DateLabel>
                  <DateValue>{device.balance}</DateValue>
                </DateBox>
              </DatesSection>

              <CoverageSection>
                <CoverageLabel>Repair Coverage</CoverageLabel>
                <CoverageItems>
                  {device.coverage.map((item, index) => (
                    <CoverageItem key={index}>{item}</CoverageItem>
                  ))}
                </CoverageItems>
              </CoverageSection>
            </ProtectionPlanContent>
          </ProtectionPlanSection>
        </RightContentSection>
      </ContentWrapper>

      {/* Upload Policy Document Modal */}
      {showUploadModal && <UploadPolicyModal onClose={handleCloseModal} />}
{/* 
{isModalOpen && (
  <RepairClaimModalDevice
    onClose={handleCloseModal}
    selectedClaim={selectedDevice} // pass claim details if needed
  />
)} */}
{isModalOpen && (
      <RepairClaimModalDevice
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        device={selectedDevice} // this should be the claim selected
      />
    )}



      {/* <RepairClaimModalDevice
  isOpen={showClaimDetailsModal} // ✅ conditionally show/hide
  onClose={handleCloseModal}
/> */}
      {/* Repair Claim Details Modal */}
      {/* {showClaimDetailsModal && (
        <RepairClaimModalDevice onClose={handleCloseModal} />
      )} */}


    </Container>
  );
};

// Styled Components
const Container = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap:'wrap';
  

   @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

// const DeviceImageContainer = styled.div`
//   position: relative;
//   width: 100%;
//   height: 590px;


  
// `;

// const DeviceImage = styled.img`
//   height: 100%;
//   object-fit: contain;


//    @media (max-width: 768px) {
//     margin: auto;
//    height: 70%;
//   }
// `;
const DeviceImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const DeviceImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;


const PlayButtonContainer = styled.div`
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const PlayIcon = styled.img`
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

const PlayText = styled.span`
  color: rgb(191, 200, 206);
  font-size: 10px;
  font-weight: 200;
  text-align: center;
`;

const DownloadVideoButton = styled.button`
  background-color: white;
  color: #0056b3;
  border: 1px solid #0056b3;
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 500;
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
  width: 90%;
  padding: 10px;
  font-size: 14px;
}

`;

const DownloadIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const PolicyInfoContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const PolicyNumberRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 10px;

  @media (max-width: 768px) {
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

`;

const PolicyLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const PolicyNumber = styled.span`
  color: #333;
  font-weight: 500;
`;

const UploadPolicyButton = styled.button`
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
`;

const RightContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: none;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;


   @media (max-width: 768px) {
     gap: 14px;
       padding: 16px;

  }
`;

const TopRowContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

     @media (max-width: 768px) {
     gap: 14px;
  }
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;


     @media (max-width: 768px) {
     /* width: 200px; */
     width: 100%;
  }
`;

const BrandDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid #e6e6e6;
  padding: 16px;


    @media (max-width: 768px) {
      padding: 10px;
  }
`;

const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 12px;
  margin-bottom: 12px;

    @media (max-width: 768px) {
      padding-bottom: 5px;
  }
`;

const BrandLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;

    @media (max-width: 768px) {
      width:20px;
    height: 30px;
  }
`;

const BrandName = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #00439e;

   @media (max-width: 768px) {
      font-size: 10px;
  font-weight: 300;
  }
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid #e6e6e6;
  padding: 16px;
  margin-bottom: 20px;

     @media (max-width: 768px) {
       padding: 10px;
  }
`;

const SectionHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #00439e;
  padding-bottom: 16px;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 12px;


    @media (max-width: 768px) {
        font-size: 10px;
        font-weight: 300;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

`;

const DetailLabel = styled.span`
  color: #38b6ff;
  font-size: 14px;

    @media (max-width: 768px) {
        font-size: 8px;
       
  }
`;

const DetailValue = styled.span`
  color: #00439e;
  font-weight: 500;

    @media (max-width: 768px) {
      
        font-weight: 300;
  }
`;

const ClaimsSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  border: 1px solid #e6e6e6;
  height: 415px;



    @media (max-width: 768px) {
        /* width: 350px;
      height: 215px; */
 width: 100%;
  }
`;

const ClaimsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  background-color: white;



   @media (max-width: 768px) {
        width: 65%;

  }
`;

const ClaimsHeader = styled.div`
  background-color: #c3e4ff;
  padding: 8px 20px;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  color: #0056b3;
  margin-bottom: 0;


   @media (max-width: 768px) {
        padding: 5px 10px;
  font-weight: 300;
  /* font-size: 10px; */
  width: 10.5rem;

  }
`;

const ClaimsCount = styled.span`
  margin-left: 8px;
  color: #0056b3;
`;

const ClaimsList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;


   @media (max-width: 768px) {
        padding: 5px;

  }
`;

// const ClaimItem = styled.div`
//   background-color: #e6f0fa;
//   padding: 7px 16px;
//   margin-top: 20px;


//    @media (max-width: 768px) {
//           padding: 3px 7px;
//   margin-top: 8px;

//   }
// `;
const ClaimItem = styled.div`
  background-color: #e6f0fa;
  padding: 15px 16px;
  /* margin-top: 20px; */
  /* height: 10rem; */
  margin-bottom: 4px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 10rem;
    /* background: red; */
    padding: 12px;
    gap: 8px;
  }
`;

const ClaimRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 6px;
  }

    @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ClaimLabel = styled.span`
  color: #38b6ff;
  font-size: 14px;

    @media (max-width: 768px) {
           font-size: 8px;

  }
`;

const ClaimValue = styled.span`
  color: #0056b3;
  font-weight: 500;

    @media (max-width: 768px) {
            font-weight: 300;
            font-size: 7px;

  }
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  width: 140px;
  display: inline-block;
  background-color: ${({ status }) =>
    status === "Done"
      ? "#d4edda"
      : status === "In progress"
      ? "#fff3cd"
      : "#f8d7da"};
  color: ${({ status }) =>
    status === "Done"
      ? "#155724"
      : status === "In progress"
      ? "#856404"
      : "#721c24"};
`;

const ViewMoreButton = styled.button`
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 5px 16px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  margin-top: 0;

   @media (max-width: 768px) {
    font-size: 14px;
    align-self: flex-start;
  }
`;

const ProtectionPlanSection = styled.div`
  border: 1px solid #e6e6e6;
  overflow: hidden;
  max-width: 800px;
  width: -webkit-fill-available;
  margin: 0 auto;
`;

const ProtectionPlanTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 16px;
  border-bottom: 1px solid #e6e6e6;


   @media (max-width: 768px) {
    font-size: 14px;
    /* align-self: flex-start; */
  }
`;

const ProtectionPlanContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;


    @media (max-width: 768px) {
      padding: 2px;
      /* font-size: 1px; */
  }
`;

const DatesSection = styled.div`
  display: flex;
  gap: 16px;


    @media (max-width: 768px) {
gap: 1.5px; 
font-size: 8px;
}
`;

const DateBox = styled.div`
  flex: 1;
  background-color: #e6f0fa;
  padding: 12px;
  text-align: center;


      @media (max-width: 768px) {
padding: 5px;

}
`;

const DateLabel = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;

     @media (max-width: 768px) {
  font-size: 8px;

}
`;

const DateValue = styled.div`
  color: #38b6ff;
  font-weight: 500;
`;

const CoverageSection = styled.div`
  background-color: #e6f0fa;
  padding: 12px;
`;

const CoverageLabel = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
  text-align: center;
`;

const CoverageItems = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  width: 50%;
  margin: auto;

  @media (max-width: 768px) {
      width: 100%;
  /* flex-direction: column; */
  /* align-items: flex-start; */
  gap: 4px;
}

`;

const CoverageItem = styled.div`
  background-color: #38b6ff;
  color: white;
  padding: 6px 12px;
  font-size: 14px;


    @media (max-width: 768px) {
      width: 35%;
  /* flex-direction: column; */
  /* align-items: flex-start; */
  gap: 4px;
    padding: 2px 6px;
  font-size: 8px;
    }
`;

// Change the status labels to match the image
const getStatusDisplay = (status) => {
  if (status === "Done") return "Done";
  if (status === "In progress") return "In progress";
  return status;
};

export default DeviceDetailPage;
