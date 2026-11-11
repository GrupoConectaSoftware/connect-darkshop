import ProfileHero from "../components/profile/ProfileHero";
import ProfilePictureCard from "../components/profile/ProfilePictureCard";
import PersonalInfoCard from "../components/profile/PersonalInfoCard";
import AdditionalInfoCard from "../components/profile/AdditionalInfoCard";
import AddressesCard from "../components/profile/AddressesCard";

export default function ProfileSection() {
  return (
    <div className="h-full w-full overflow-y-auto bg-[#f6f7f8] pb-10">
      <ProfileHero />
      <div className="relative z-10 mx-auto -mt-9 grid max-w-[1600px] gap-4 px-4 sm:px-6 lg:-mt-11 lg:gap-5 lg:px-10">
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
          <ProfilePictureCard />
          <PersonalInfoCard />
        </div>
        <AdditionalInfoCard />
        <AddressesCard />
      </div>
    </div>
  );
}
