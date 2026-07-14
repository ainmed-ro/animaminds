import HeroSection from "@/components/home/HeroSection";
import FormatSelectionSection from "@/components/home/FormatSelectionSection";
import SameProgramDifferentFormats from "@/components/home/SameProgramDifferentFormats";
import FeaturedProgramsSection from "@/components/home/FeaturedProgramsSection";
import PreparationProgramsSection from "@/components/home/PreparationProgramsSection";
import TrustSection from "@/components/home/TrustSection";
import CPDExplanationSection from "@/components/home/CPDExplanationSection";
import AudienceSection from "@/components/home/AudienceSection";
import CommunitySection from "@/components/home/CommunitySection";
import PartnershipsSection from "@/components/home/PartnershipsSection";
import CtaBanner from "@/components/home/CtaBanner";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FormatSelectionSection />
      <SameProgramDifferentFormats />
      <FeaturedProgramsSection />
      <PreparationProgramsSection />
      <TrustSection />
      <CPDExplanationSection />
      <AudienceSection />
      <CommunitySection />
      <PartnershipsSection />
      <CtaBanner />
    </>
  );
}

