import HeroSection from "@/components/home/HeroSection";
import LaunchBanner from "@/components/home/LaunchBanner";
import TrustSection from "@/components/home/TrustSection";
import CPDExplanationSection from "@/components/home/CPDExplanationSection";
import LaunchFeaturedSection from "@/components/home/LaunchFeaturedSection";
import ContributionSection from "@/components/home/ContributionSection";
import FeaturedProgramsSection from "@/components/home/FeaturedProgramsSection";
import AudienceSection from "@/components/home/AudienceSection";
import CommunitySection from "@/components/home/CommunitySection";
import PartnershipsSection from "@/components/home/PartnershipsSection";
import CtaBanner from "@/components/home/CtaBanner";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <>
      <HeroSection />
      <LaunchBanner />
      <TrustSection />
      <CPDExplanationSection />
      <LaunchFeaturedSection />
      <ContributionSection />
      <FeaturedProgramsSection />
      <AudienceSection />
      <CommunitySection />
      <PartnershipsSection />
      <CtaBanner />
    </>
  );
}

