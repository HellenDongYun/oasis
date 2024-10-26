import Footer from "@/components/footer";
import "/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "@/components/Header";
import { ReservationProvider } from "@/components/ReservationContext";
import { Analytics } from "@vercel/analytics/react";
export const metadata = {
  title: {
    template: "%s The Oasis",
    default: "The Oasis",
  },
  description: "Luxurious Oasis cabins hotel in the middle of the desert",
};
const josefin = Josefin_Sans({
  subsets: ["latin"],
  // weight: ["400", "700"],
  variable: "--font-josefin",
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
