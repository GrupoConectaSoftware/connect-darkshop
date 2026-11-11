import { useState } from "react";
import MainLayout from "./layouts/mainLayout";
import WelcomeSection from "./sections/welcomeSection";
import ProfileSection from "./sections/profileSection";

export default function DashboardUsers() {
  const [activeSection, setActiveSection] = useState("welcome");

  return (
    <MainLayout activeSection={activeSection} onNavigateSection={setActiveSection}>
      {activeSection === "profile" ? <ProfileSection /> : <WelcomeSection />}
    </MainLayout>
  );
}
