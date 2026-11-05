import BannerSection from "../components/BannerSection.jsx";
import FeatureSection from "../components/FeatureSection.jsx";
import RecentEvents from "../components/RecentEvents.jsx";
import GallerySection from "../components/GallerySection.jsx";
import NewsletterSection from "../components/NewsletterSection.jsx";

export default function Home() {
  return (
    <>
      <BannerSection />
      <FeatureSection />
      <RecentEvents />
      <GallerySection />
      <NewsletterSection />
    </>
  );
}
