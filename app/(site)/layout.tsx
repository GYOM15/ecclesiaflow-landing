import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VerticalLine } from "@/components/decorative/vertical-line";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-indigo-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Aller au contenu principal
      </a>
      <VerticalLine />
      <Navbar />
      <main id="main-content" className="overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
}
