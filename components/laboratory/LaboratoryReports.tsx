"use client";

import { useState } from "react";
import StepSearch from "./StepSearch";
import StepVerify from "./StepVerify";
import StepReports, { LaboratoryReport } from "./StepReports";
import StepViewer from "./StepViewer";

const mockReports: LaboratoryReport[] = [
  {
    id: "REP-202600101",
    reportName: "Complete Blood Count (CBC)",
    laboratory: "SHIFA LIFE LINE Diagnostics",
    collectedOn: "15 Jul 2026",
    status: "Ready",
  },
  {
    id: "REP-202600102",
    reportName: "Lipid Profile",
    laboratory: "SHIFA LIFE LINE Diagnostics",
    collectedOn: "15 Jul 2026",
    status: "Ready",
  },
  {
    id: "REP-202600103",
    reportName: "Thyroid Profile (T3, T4, TSH)",
    laboratory: "SHIFA LIFE LINE Diagnostics",
    collectedOn: "16 Jul 2026",
    status: "Pending",
  },
];

export default function LaboratoryReports() {
  const [step, setStep] = useState(1);

  const [mobile, setMobile] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [reportId, setReportId] = useState("");
  const [otp, setOtp] = useState("");

  const [selectedReport, setSelectedReport] =
    useState<LaboratoryReport | null>(null);

  const openReport = (report: LaboratoryReport) => {
    setSelectedReport(report);
    setStep(4);
  };

  switch (step) {
    case 1:
      return (
        <StepSearch
          mobile={mobile}
          bookingId={bookingId}
          reportId={reportId}
          onMobileChange={setMobile}
          onBookingIdChange={setBookingId}
          onReportIdChange={setReportId}
          onNext={() => setStep(2)}
        />
      );

    case 2:
      return (
        <StepVerify
          otp={otp}
          onOtpChange={setOtp}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      );

    case 3:
      return (
        <StepReports
          reports={mockReports}
          onBack={() => setStep(2)}
          onView={openReport}
        />
      );

    case 4:
      return selectedReport ? (
        <StepViewer
          report={selectedReport}
          onBack={() => setStep(3)}
        />
      ) : null;

    default:
      return null;
  }
}