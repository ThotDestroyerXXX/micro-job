import { Session } from "@/lib/auth";
import BasicInfoSection from "../sections/basic-info-section";
import RatingReviewsSection from "../sections/rating-reviews-section";
import SkillSection from "../sections/skill-section";
import ContactInfoSection from "../sections/contact-info-section";
import LocationAvailabilitySection from "../sections/location-availability-section";

export default function ProfileView({
  user,
}: Readonly<{ user: Session["user"] }>) {
  return (
    <div className='min-h-screen'>
      <div className='max-w-4xl mx-auto p-6 space-y-6'>
        <BasicInfoSection user={user} />
        <RatingReviewsSection
          profileData={{
            rating: user.rating ?? 0,
            totalReviews: 0,
            reviews: null,
          }}
        />
        <SkillSection
          profileData={
            user.skills as unknown as { name: string; years: number }[]
          }
        />
        <LocationAvailabilitySection user={user} />
        <ContactInfoSection
          email={user.email}
          phone={user.phoneNumber ?? "No Phone Number"}
          emailVerified={user.emailVerified ?? false}
          phoneVerified={user.phoneNumberVerified ?? false}
        />
      </div>
    </div>
  );
}
