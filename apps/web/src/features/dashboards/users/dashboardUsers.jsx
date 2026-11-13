import { useState } from "react";
import MainLayout from "./layouts/mainLayout";
import WelcomeSection from "./sections/welcomeSection";
import ProfileSection from "./sections/profileSection";
import SecuritySection from "./sections/securitySection";
import PaymentSection from "./sections/paymentSection";
import ReportsSection from "./sections/reportsSection";
import ModerationReportsSection from "./sections/moderationReportsSection";

export default function DashboardUsers() {
  const [activeSection, setActiveSection] = useState("welcome");

  return (
    <MainLayout activeSection={activeSection} onNavigateSection={setActiveSection}>
      {activeSection === "summary" ? <ReportsSection /> : activeSection === "reports" ? <ModerationReportsSection /> : activeSection === "payment" ? <PaymentSection /> : activeSection === "security" ? <SecuritySection /> : activeSection === "profile" ? <ProfileSection /> : <WelcomeSection />}
    </MainLayout>
  );
}
