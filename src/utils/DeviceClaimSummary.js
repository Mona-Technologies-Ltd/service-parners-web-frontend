import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  background: #fff;
  padding: 20px;
  font-family: Arial, sans-serif;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  img {
    height: 40px;
  }
  h1 {
    font-size: 20px;
    margin: 0;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`;

const Status = styled.span`
  padding: 4px 10px;
  background: ${({ status }) =>
    status === 'Approved' ? '#D1FADF' : '#FFE4E4'};
  color: ${({ status }) =>
    status === 'Approved' ? '#027A48' : '#B42318'};
  border-radius: 12px;
  font-size: 13px;
`;

const DeviceImage = styled.img`
  width: 100%;
  max-width: 200px;
  display: block;
  margin: 0 auto 20px auto;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #1d4ed8;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

const DeviceClaimSummary = ({ data }, ref) => {
  // const pdfRef = useRef();

  // const handleExportPDF = async () => {
  //   const canvas = await html2canvas(pdfRef.current);
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF('p', 'pt', 'a4');
  //   const imgProps = pdf.getImageProperties(imgData);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   pdf.save('claim-summary.pdf');
  // };
const pdfRef = useRef();

  useImperativeHandle(ref, () => ({
    exportToPDF: async () => {
      const canvas = await html2canvas(pdfRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('claim-summary.pdf');
    },
  }));
  return (
    <>
      <div ref={pdfRef}>
        {/* <Header> */}
          {/* <img src={data.logo} alt="Logo" />
          <h1>{data.title}</h1> */}
        {/* </Header> */}

        {/* <DeviceImage src={data.deviceImage} alt="Device" /> */}

        {/* <Section>
          <SectionTitle>Device Details</SectionTitle>
          <InfoRow><span>Brand:</span><span>{data.brand}</span></InfoRow>
          <InfoRow><span>Model:</span><span>{data.model}</span></InfoRow>
          <InfoRow><span>IMEI:</span><span>{data.imei}</span></InfoRow>
        </Section>

        <Section>
          <SectionTitle>Claim Details</SectionTitle>
          <InfoRow>
            <span>Status:</span>
            <Status status={data.status}>{data.status}</Status>
          </InfoRow>
          <InfoRow><span>Date:</span><span>{data.date}</span></InfoRow>
          <InfoRow><span>Issues:</span><span>{data.issues.join(', ')}</span></InfoRow>
        </Section> */}
      </div>

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <Button onClick={useImperativeHandle}>Download PDF</Button>
      </div>
    </>
  );
};

export default DeviceClaimSummary;
