import { NftNavbar } from "@/components/NftNavbar";
import { Footer } from "@/components/Footer";

export default function NftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NftNavbar />
      {children}
      <Footer />
    </>
  );
}
