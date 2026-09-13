import SiteHeader from "@/app/components/SiteHeader";
import Hero from "@/app/components/Hero";
import Concept from "@/app/components/Concept";
import Menu from "@/app/components/Menu";
import Access from "@/app/components/Access";
import ReservationForm from "@/app/components/ReservationForm";
import SiteFooter from "@/app/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <Concept />
      <Menu />
      <Access />
      <ReservationForm />
      <SiteFooter />
    </>
  );
}
