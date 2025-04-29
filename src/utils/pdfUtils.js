import jsPDF from "jspdf";
import "jspdf-autotable";
import monaLogo from "../assets/monaHeaderLogo.svg";

/**
 * Creates a simple table in the PDF
 * @param {jsPDF} doc - The PDF document
 * @param {Array} headers - Array of header texts
 * @param {Array} data - Array of row data arrays
 * @param {Number} startY - Y position to start drawing
 * @param {Object} options - Table options
 * @returns {Number} - The Y position after drawing the table
 */
const createTable = (doc, headers, data, startY, options = {}) => {
  const defaults = {
    fontSize: 10,
    headerFontSize: 10,
    cellPadding: 5,
    headerBackground: [245, 245, 245],
    headerTextColor: [0, 0, 0],
    rowBackground: [255, 255, 255],
    rowTextColor: [0, 0, 0],
    width: 190,
    cellWidths: [],
    margin: 10,
  };

  const settings = { ...defaults, ...options };
  let { margin } = settings;
  const pageWidth = doc.internal.pageSize.width;
  const tableWidth = settings.width || pageWidth - 2 * margin;
  const startX = margin;

  // Calculate column widths if not specified
  if (
    !settings.cellWidths.length ||
    settings.cellWidths.length !== headers.length
  ) {
    settings.cellWidths = new Array(headers.length).fill(
      tableWidth / headers.length
    );
  }

  // Calculate total width
  const totalWidth = settings.cellWidths.reduce((a, b) => a + b, 0);

  // Set header style
  doc.setFillColor(...settings.headerBackground);
  doc.setTextColor(...settings.headerTextColor);
  doc.setFontSize(settings.headerFontSize);
  doc.setFont("helvetica", "bold");

  // Draw header
  let x = startX;
  let y = startY;
  const cellHeight = settings.cellPadding * 2 + settings.headerFontSize / 2;

  // Draw header cells
  headers.forEach((header, i) => {
    const cellWidth = settings.cellWidths[i];

    // Draw cell background
    doc.rect(x, y, cellWidth, cellHeight, "F");

    // Draw border
    doc.setDrawColor(220, 220, 220);
    doc.rect(x, y, cellWidth, cellHeight);

    // Add text
    doc.text(
      header.toString(),
      x + settings.cellPadding,
      y + settings.cellPadding + settings.headerFontSize / 2
    );

    x += cellWidth;
  });

  y += cellHeight;

  // Set row style
  doc.setFillColor(...settings.rowBackground);
  doc.setTextColor(...settings.rowTextColor);
  doc.setFontSize(settings.fontSize);
  doc.setFont("helvetica", "normal");

  // Draw rows
  data.forEach((row) => {
    const rowCellHeight = settings.cellPadding * 2 + settings.fontSize / 2;
    x = startX;

    row.forEach((cell, i) => {
      const cellWidth = settings.cellWidths[i];

      // Draw cell border
      doc.setDrawColor(220, 220, 220);
      doc.rect(x, y, cellWidth, rowCellHeight);

      // Add text
      doc.text(
        cell.toString(),
        x + settings.cellPadding,
        y + settings.cellPadding + settings.fontSize / 2
      );

      x += cellWidth;
    });

    y += rowCellHeight;
  });

  return y; // Return the Y position after the table
};

/**
 * Generates a simple QR code data URL
 * @param {string} text - The text to encode in the QR code
 * @returns {string} - Data URL for the QR code
 */
const generateQRCode = (text) => {
  // Since we can't use external libraries without installation,
  // we'll create a placeholder QR code using canvas
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");

  // Draw white background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 100, 100);

  // Draw black squares for QR code effect
  ctx.fillStyle = "black";

  // Draw border
  ctx.fillRect(0, 0, 100, 10);
  ctx.fillRect(0, 0, 10, 100);
  ctx.fillRect(0, 90, 100, 10);
  ctx.fillRect(90, 0, 10, 100);

  // Draw position detection patterns (corners)
  ctx.fillRect(20, 20, 20, 20);
  ctx.fillRect(60, 20, 20, 20);
  ctx.fillRect(20, 60, 20, 20);

  // Draw some random dots to simulate QR code
  for (let i = 0; i < 30; i++) {
    const x = 15 + Math.floor(Math.random() * 70);
    const y = 15 + Math.floor(Math.random() * 70);
    const size = 2 + Math.floor(Math.random() * 4);
    ctx.fillRect(x, y, size, size);
  }

  return canvas.toDataURL("image/png");
};

/**
 * Generates and downloads an invoice PDF
 * @param {Object} invoiceData - The data to include in the invoice
 */
export const generateInvoicePDF = (invoiceData = {}) => {
  try {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Default invoice data if not provided
    const data = {
      reportId: invoiceData.reportId || "RPT123456",
      generatedBy: invoiceData.generatedBy || "Admin 1/Michael James",
      generatedOn: invoiceData.generatedOn || "2025-01-15 16:09:05",
      version: invoiceData.version || "1.0",
      totalClaims: invoiceData.totalClaims || 10,
      totalAmount: invoiceData.totalAmount || "₦100,000",
      issueHighlights: invoiceData.issueHighlights || [
        { sn: "01", issue: "Lorem ipsum dolor sit amet", count: 5 },
        { sn: "02", issue: "Lorem ipsum dolor sit amet", count: 5 },
      ],
      claims: invoiceData.claims || [
        {
          id: "#0001",
          brand: "Samsung",
          model: "Galaxy S20",
          sumInsured: "₦723,345",
          claimAmount: "₦123,345",
          approvedBy: "Admin 1",
          date: "2025-01-15",
        },
        {
          id: "#0001",
          brand: "Samsung",
          model: "Galaxy S20",
          sumInsured: "₦723,345",
          claimAmount: "₦123,345",
          approvedBy: "Admin 1",
          date: "2025-01-15",
        },
      ],
      paymentDetails: {
        accountName:
          invoiceData.paymentDetails?.accountName || "Mona Protect Limited",
        bankName: invoiceData.paymentDetails?.bankName || "Commonwealth Bank",
        accountNumber: invoiceData.paymentDetails?.accountNumber || "12345678",
        sortCode: invoiceData.paymentDetails?.sortCode || "CTBAU2S",
        dueDate: invoiceData.paymentDetails?.dueDate || "2024-02-01",
      },
    };

    // Add blue header
    doc.setFillColor(0, 86, 179); // Blue color
    doc.rect(0, 0, 210, 20, "F");

    // Add "Invoice" text to header
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // White
    doc.setFontSize(16);
    doc.text("Invoice", 105, 12, { align: "center" });

    // Add Mona Protect logo
    try {
      doc.addImage(monaLogo, "PNG", 10, 25, 60, 18);
    } catch (error) {
      console.error("Error adding logo:", error);
      // Draw a placeholder logo if image loading fails
      doc.setDrawColor(0);
      doc.setFillColor(70, 130, 180);
      doc.roundedRect(10, 25, 60, 18, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text("MONA PROTECT", 40, 35, { align: "center" });
    }

    // Add company details on the right
    doc.setTextColor(0, 0, 0); // Black
    doc.setFontSize(16);
    doc.text("Invoice", 200, 30, { align: "right" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Mona Technologies Limited", 200, 40, { align: "right" });
    doc.text("613 Ahmadu Bello Way, Abuja", 200, 45, { align: "right" });
    doc.text("+234 903 345 6789", 200, 50, { align: "right" });
    doc.text("info@monaprotect.com", 200, 55, { align: "right" });

    // Add invoice details
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Report ID:", 15, 60);
    doc.text("Generated by:", 15, 65);
    doc.text("Generated on:", 15, 70);
    doc.text("Version:", 15, 75);

    doc.setFont("helvetica", "normal");
    doc.text(data.reportId, 50, 60);
    doc.text(data.generatedBy, 50, 65);
    doc.text(data.generatedOn, 50, 70);
    doc.text(data.version, 50, 75);

    // Add overview section
    doc.setFillColor(255, 255, 255);
    doc.rect(10, 85, 190, 30, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Overview", 15, 95);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Total No. of Claims:", 15, 103);
    doc.text("Total Payout Amount:", 15, 108);

    doc.text(data.totalClaims.toString(), 70, 103);
    doc.text(data.totalAmount, 70, 108);

    // Add issue highlights section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Highlight of the Issue", 15, 130);

    // Create a table for issue highlights using jspdf-autotable
    let yPos = 135;
    const highlightsHeaders = ["S/N", "Issues", "Count"];
    const highlightsData = data.issueHighlights.map((item) => [
      item.sn,
      item.issue,
      item.count,
    ]);

    doc.autoTable({
      startY: yPos,
      head: [highlightsHeaders],
      body: highlightsData,
      columnStyles: {
        0: { cellWidth: 20, halign: "center" },
        1: { cellWidth: 135 },
        2: { cellWidth: 25, halign: "center" },
      },
      headStyles: {
        fillColor: [245, 245, 245],
        textColor: [80, 80, 80],
        fontSize: 10,
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
        cellPadding: 8,
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [80, 80, 80],
        fontSize: 9,
        lineColor: [220, 220, 220],
      },
      styles: {
        fontSize: 9,
        cellPadding: 8,
        overflow: "linebreak",
        lineWidth: 0.1,
        lineColor: [220, 220, 220],
      },
      theme: "grid",
      tableLineColor: [220, 220, 220],
      margin: { left: 10, right: 10 },
    });

    yPos = doc.lastAutoTable.finalY + 15;

    // Add claims information section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Claims Information", 15, yPos);

    // Table for claims information using jspdf-autotable
    const claimsHeaders = [
      "Claim ID",
      "Brand",
      "Model",
      "Sum Insured\nBalance",
      "Claim Amount",
      "Approved by",
      "Date",
    ];
    const claimsData = data.claims.map((claim) => [
      claim.id,
      claim.brand,
      claim.model,
      claim.sumInsured,
      claim.claimAmount,
      claim.approvedBy,
      claim.date,
    ]);

    doc.autoTable({
      startY: yPos + 10,
      head: [claimsHeaders],
      body: claimsData,
      columnStyles: {
        0: { halign: "center" },
        1: { halign: "left" },
        2: { halign: "left" },
        3: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "left" },
        6: { halign: "center" },
      },
      headStyles: {
        fillColor: [245, 245, 245],
        textColor: [80, 80, 80],
        fontSize: 10,
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
        cellPadding: 8,
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [80, 80, 80],
        fontSize: 9,
        lineColor: [220, 220, 220],
      },
      styles: {
        fontSize: 9,
        cellPadding: 8,
        overflow: "linebreak",
        lineWidth: 0.1,
        lineColor: [220, 220, 220],
      },
      theme: "grid",
      tableLineColor: [220, 220, 220],
      margin: { left: 10, right: 10 },
    });

    yPos = doc.lastAutoTable.finalY + 15;

    // Payment Details section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Payment Details", 15, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Please remit payment to the following account:", 15, yPos);

    yPos += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Account Name:", 15, yPos);
    yPos += 5;
    doc.text("Bank Name:", 15, yPos);
    yPos += 5;
    doc.text("Acc #:", 15, yPos);
    yPos += 5;
    doc.text("Sort Code:", 15, yPos);
    yPos += 5;
    doc.text("Payment Due Date:", 15, yPos);

    doc.setFont("helvetica", "normal");
    yPos -= 20;
    doc.text(data.paymentDetails.accountName, 115, yPos);
    yPos += 5;
    doc.text(data.paymentDetails.bankName, 115, yPos);
    yPos += 5;
    doc.text(data.paymentDetails.accountNumber, 115, yPos);
    yPos += 5;
    doc.text(data.paymentDetails.sortCode, 115, yPos);
    yPos += 5;
    doc.text(data.paymentDetails.dueDate, 115, yPos);

    // QR Code section
    doc.setFont("helvetica", "bold");
    doc.text("QR Code payment", 150, yPos - 20, { align: "center" });

    // Generate and add QR code
    try {
      const qrCodeDataUrl = generateQRCode(
        `PAYMENT:${data.reportId}:${data.paymentDetails.accountNumber}`
      );
      doc.addImage(qrCodeDataUrl, "PNG", 130, yPos - 15, 40, 40);
    } catch (error) {
      console.error("Error generating QR code:", error);
      // Try to use the static QR code SVG
      try {
        doc.addImage("/qr-code-payment.svg", "SVG", 130, yPos - 15, 40, 40);
      } catch (svgError) {
        console.error("Error adding static QR code:", svgError);
        // Draw a placeholder if all QR code options fail
        doc.rect(130, yPos - 15, 40, 40);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("QR Code", 150, yPos, { align: "center" });
      }
    }

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Scan to verify payment details", 150, yPos + 30, {
      align: "center",
    });

    // Add footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.text(
      `Generated on: ${data.generatedOn} | Page 1 of 1 | Report ID: ${data.reportId} | Mona Protect`,
      105,
      pageHeight - 15,
      { align: "center" }
    );
    doc.text("Confidential – For internal use only", 105, pageHeight - 10, {
      align: "center",
    });

    // Save the PDF
    doc.save(`Invoice_${data.reportId}.pdf`);

    console.log("PDF successfully generated");
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("There was an error generating the invoice. Please try again later.");
    return false;
  }
};

/**
 * Generates and downloads a Premium Report PDF
 * @param {Object} reportData - The data to include in the premium report
 */
export const generatePremiumReportPDF = (reportData = {}) => {
  try {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Default report data if not provided
    const data = {
      reportId: reportData.reportId || "RPT123456",
      generatedBy: reportData.generatedBy || "Admin 1/Michael James",
      generatedOn: reportData.generatedOn || "2025-01-15 16:09:05",
      version: reportData.version || "1.0",
      totalDevices: reportData.totalDevices || 10,
      totalPremium: reportData.totalPremium || "₦100,000",
      totalSumInsured: reportData.totalSumInsured || "₦200,000",
      devices: reportData.devices || [
        {
          deviceId: "#0001",
          brand: "Samsung",
          model: "Galaxy S20",
          imei: "356789123456789",
          totalSumInsured: "₦723,345",
          premium: "₦123,345",
          date: "2025-01-15",
        },
        {
          deviceId: "#0001",
          brand: "Samsung",
          model: "Galaxy S20",
          imei: "356789123456789",
          totalSumInsured: "₦723,345",
          premium: "₦123,345",
          date: "2025-01-15",
        },
      ],
    };

    // Add blue header
    doc.setFillColor(0, 86, 179);
    doc.rect(0, 0, 210, 20, "F");

    // Add "Premium Report" text to header
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // White
    doc.setFontSize(16);
    doc.text("Premium Report", 105, 12, { align: "center" });

    // Add Mona Protect logo
    try {
      doc.addImage(monaLogo, "PNG", 10, 30, 60, 18);
    } catch (error) {
      console.error("Error adding logo:", error);
      // Draw a placeholder logo if image loading fails
      doc.setDrawColor(0);
      doc.setFillColor(70, 130, 180);
      doc.roundedRect(10, 30, 60, 18, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text("MONA PROTECT", 40, 40, { align: "center" });
    }

    // Add company details on the right
    doc.setTextColor(0, 0, 0); // Black
    doc.setFontSize(16);
    doc.text("Premium Report", 200, 35, { align: "right" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Mona Technologies Limited", 200, 45, { align: "right" });
    doc.text("613 Ahmadu Bello Way, Abuja", 200, 50, { align: "right" });
    doc.text("+234 903 345 6789", 200, 55, { align: "right" });
    doc.text("info@monaprotect.com", 200, 60, { align: "right" });

    // Add report details
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Report ID:", 15, 65);
    doc.text("Generated by:", 15, 70);
    doc.text("Generated on:", 15, 75);
    doc.text("Version:", 15, 80);

    doc.setFont("helvetica", "normal");
    doc.text(data.reportId, 50, 65);
    doc.text(data.generatedBy, 50, 70);
    doc.text(data.generatedOn, 50, 75);
    doc.text(data.version, 50, 80);

    // Add overview section
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(255, 255, 255);
    doc.line(10, 90, 200, 90); // Draw a horizontal line as a separator

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Overview", 15, 100);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Total No. of Devices:", 15, 110);
    doc.text("Total Premium:", 15, 115);
    doc.text("Total Sum Insured:", 15, 120);

    doc.text(data.totalDevices.toString(), 70, 110);
    doc.text(data.totalPremium, 70, 115);
    doc.text(data.totalSumInsured, 70, 120);

    // Line separator after overview
    doc.line(10, 130, 200, 130);

    // Add premium information section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Premium Information", 15, 140);

    // Table for premium information using jspdf-autotable
    const premiumHeaders = [
      "Device ID",
      "Brand",
      "Model",
      "IMEI",
      "Total Sum Insured",
      "Premium",
      "Date",
    ];
    const premiumData = data.devices.map((device) => [
      device.deviceId,
      device.brand,
      device.model,
      device.imei,
      device.totalSumInsured,
      device.premium,
      device.date,
    ]);

    doc.autoTable({
      startY: 145,
      head: [premiumHeaders],
      body: premiumData,
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [80, 80, 80],
        fontSize: 10,
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
        cellPadding: 5,
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [80, 80, 80],
        fontSize: 9,
        lineColor: [220, 220, 220],
      },
      styles: {
        fontSize: 9,
        cellPadding: 5,
        overflow: "linebreak",
        lineWidth: 0.1,
        lineColor: [220, 220, 220],
      },
      theme: "grid",
      tableLineColor: [220, 220, 220],
      margin: { left: 10, right: 10 },
    });

    // Add footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.text(
      `Generated on: ${data.generatedOn} | Page 1 of 1 | Report ID: ${data.reportId} | Mona Protect`,
      105,
      pageHeight - 15,
      { align: "center" }
    );
    doc.text("Confidential – For internal use only", 105, pageHeight - 10, {
      align: "center",
    });

    // Save the PDF
    doc.save(`Premium_Report_${data.reportId}.pdf`);

    console.log("Premium PDF report successfully generated");
    return true;
  } catch (error) {
    console.error("Error generating Premium PDF report:", error);
    return false;
  }
};

export const generateDeviceReportPDF = (reportData = {}) => {
  try {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Default report data if not provided
    const data = {
      reportId: reportData.reportId || "RPT123456",
      generatedBy: reportData.generatedBy || "Admin 1/Michael James",
      generatedOn: reportData.generatedOn || "2025-01-15 16:09:05",
      version: reportData.version || "1.0",
      totalDevices: reportData.totalDevices || "10",
      totalPremium: reportData.totalPremium || "₦100,000",
      totalSumInsured: reportData.totalSumInsured || "#200,000",
      statusType: "Paid, Unpaid Premium",
      dateRange: reportData.dateRange || {
        from: "2025-01-15",
        to: "2025-01-30",
      },
      devices: reportData.devices || [
        {
          deviceId: "#0001",
          brand: "Samsung",
          model: "Galaxy S20",
          imei: "12345723170345",
          totalSumInsured: "#723,345",
          premium: "#123,345",
          onboardingDate: "2025-01-15",
          expiryDate: "2025-01-15",
        },
        {
          deviceId: "#0001",
          brand: "Samsung",
          model: "Galaxy S20",
          imei: "12345723170345",
          totalSumInsured: "#723,345",
          premium: "#123,345",
          onboardingDate: "2025-01-15",
          expiryDate: "2025-01-15",
        },
      ],
    };

    // Add blue header
    doc.setFillColor(0, 86, 179); // Blue color
    doc.rect(0, 0, 210, 20, "F");

    // Add "Premium Report" text to header
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // White
    doc.setFontSize(16);
    doc.text("Premium Report", 105, 12, { align: "center" });

    // Add Mona Protect logo - using the public directory logo
    try {
      // Use the logo from public directory
      doc.addImage("/monaHeaderLogo.svg", "SVG", 32, 32, 120, 35);
    } catch (error) {
      console.error("Error adding logo from public directory:", error);
      try {
        // Fallback to any available logo
        doc.addImage(monaLogo, "PNG", 32, 32, 120, 35);
      } catch (error2) {
        console.error("Error adding fallback logo:", error2);
        // Draw a placeholder if all logo options fail
        doc.setDrawColor(0);
        doc.setFillColor(70, 130, 180);
        doc.roundedRect(32, 32, 120, 35, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text("MONA PROTECT", 92, 50, { align: "center" });
      }
    }

    // Add report title and company details on the right
    doc.setTextColor(0, 0, 0); // Black
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Premium Report", 200, 40, { align: "right" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Mona Technologies Limited", 200, 50, { align: "right" });
    doc.text("613 Ahmadu Bello Way, Abuja", 200, 55, { align: "right" });
    doc.text("+234 903 345 6789", 200, 60, { align: "right" });
    doc.text("info@monaprotect.com", 200, 65, { align: "right" });

    // Add report details
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Report ID:", 32, 80);
    doc.text("Generated by:", 32, 87);
    doc.text("Generated on:", 32, 94);
    doc.text("Version:", 32, 101);

    doc.setFont("helvetica", "normal");
    doc.text(data.reportId, 85, 80);
    doc.text(data.generatedBy, 85, 87);
    doc.text(data.generatedOn, 85, 94);
    doc.text(data.version, 85, 101);

    // Add a line separator
    doc.setDrawColor(230, 230, 230);
    doc.line(32, 108, 178, 108);

    // Add overview section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Overview", 32, 118);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Total No. of Devices:", 32, 128);
    doc.text("Total Premium:", 32, 135);
    doc.text("Total Coverage:", 32, 142);
    doc.text("Status Type:", 32, 149);

    doc.text(data.totalDevices, 85, 128);
    doc.text(data.totalPremium.replace("₦", "#"), 85, 135);
    doc.text(data.totalSumInsured, 85, 142);
    doc.text(data.statusType, 85, 149);

    // Add another line separator
    doc.line(32, 156, 178, 156);

    // Add premium information section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Premium Information", 32, 166);

    // Add period text to the right
    doc.setFontSize(10);
    doc.text(
      `Period: ${data.dateRange.from} - ${data.dateRange.to}`,
      178,
      166,
      { align: "right" }
    );

    // Define table headers and rows for premium information
    const headers = [
      { header: "Device ID", dataKey: "deviceId" },
      { header: "Brand", dataKey: "brand" },
      { header: "Model", dataKey: "model" },
      { header: "IMEI", dataKey: "imei" },
      { header: "Total Sum Insured", dataKey: "totalSumInsured" },
      { header: "Premium", dataKey: "premium" },
      { header: "Onboarding Date", dataKey: "onboardingDate" },
      { header: "Expiry Date", dataKey: "expiryDate" },
    ];

    const rows = data.devices.map((device) => ({
      deviceId: device.deviceId,
      brand: device.brand,
      model: device.model,
      imei: device.imei,
      totalSumInsured: device.totalSumInsured,
      premium: device.premium,
      onboardingDate: device.onboardingDate,
      expiryDate: device.expiryDate,
    }));

    // Create the premium information table
    doc.autoTable({
      startY: 170,
      head: [headers.map((h) => h.header)],
      body: rows.map((row) => headers.map((h) => row[h.dataKey])),
      theme: "grid",
      styles: {
        fontSize: 9,
        cellPadding: 3,
        lineColor: [230, 230, 230],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [245, 245, 245],
        textColor: [50, 50, 50],
        fontSize: 9,
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [252, 252, 252],
      },
      margin: { left: 32, right: 32 },
    });

    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100); // Gray
      doc.text(
        `Generated on: ${data.generatedOn.substring(
          0,
          16
        )} | Page ${i} of ${pageCount} | Report ID: ${
          data.reportId
        } | Mona Protect`,
        105,
        282,
        { align: "center" }
      );
      doc.text("Confidential – For internal use only", 105, 287, {
        align: "center",
      });
    }

    // Save the PDF with a timestamp to prevent caching issues
    doc.save(`Premium_Report_${Date.now()}.pdf`);

    return true;
  } catch (error) {
    console.error("Error generating device report PDF:", error);
    return false;
  }
};

export default {
  generateInvoicePDF,
  generatePremiumReportPDF,
  generateDeviceReportPDF,
};
