import { DeveloperNavbar } from "@/components/DeveloperNavbar";
import { Footer } from "@/components/Footer";

export default function DataStreamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DeveloperNavbar />
      {children}
      <Footer />
    </>
  );
}

