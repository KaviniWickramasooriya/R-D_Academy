import Hero from "../components/Hero/Hero";
import AboutAcademy from "../components/AboutAcademy/AboutAcademy";
import VideoTrailer from "../components/VideoTrailer/VideoTrailer";
import FeaturedCourses from "../components/FeaturedCourses/FeaturedCourses";
import MentorsSection from "../components/MentorsSection/MentorsSection";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import StudentJourney from "../components/StudentJourney/StudentJourney";
import FAQ from "../components/FAQ/FAQ";

export default function Home() {
  return (
    <div className="bg-stone-950 min-h-screen text-stone-100 selection:bg-[#d4af37] selection:text-stone-900">
      <Hero />
      <AboutAcademy />
      <VideoTrailer />
      <FeaturedCourses />
      <WhyChooseUs />
      <MentorsSection />
      <StudentJourney />
      <FAQ />
    </div>
  );
}