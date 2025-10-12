import AppointmentSection from "@/components/pages/landing-page/hero-appointment/AppointmentSection";
import HeroSection from "@/components/pages/landing-page/HeroSection";
import SearchSection from "@/components/pages/search/SearchSection";
import { getSession } from "@/lib/session";

const HomePage = async () => {
  const session = await getSession();
  return (
    <main>
      {session ? (
        <>
          <HeroSection role={session?.user.role} />
          <AppointmentSection role={session?.user.role} />
        </>
      ) : (
        <SearchSection />
      )}
    </main>
  );
};

export default HomePage;
