import { useState } from "react";
import MainLayout from "./layouts/mainLayout";
import WelcomeSection from "./sections/welcomeSection";
import ProfileSection from "./sections/profileSection";
import SecuritySection from "./sections/securitySection";

export default function DashboardUsers() {
  const [activeSection, setActiveSection] = useState("welcome");

  return (
    <MainLayout activeSection={activeSection} onNavigateSection={setActiveSection}>
      {activeSection === "security" ? <SecuritySection /> : activeSection === "profile" ? <ProfileSection /> : <WelcomeSection />}
    </MainLayout>
  );
}
