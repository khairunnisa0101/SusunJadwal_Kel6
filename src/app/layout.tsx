import type { Metadata } from "next";
import "./globals.css";
import { Paytone_One, Poppins } from "next/font/google";
import GlobalProvider from "@/components/organisms/GlobalProvider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const paytoneOne = Paytone_One({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-paytone-one",
});

export const metadata: Metadata = {
  title: "SusunJadwal",
  description:
    "SusunJadwal adalah aplikasi berbasis web yang mendukung dalam kegiatan pembelajaran seperti kuliah dan sekolah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${paytoneOne.variable} antialiased`}
    >
      <body>
        <GlobalProvider>
          <main className="font-poppins">{children}</main>
          <Toaster />
        </GlobalProvider>
      </body>
    </html>
  );
}
