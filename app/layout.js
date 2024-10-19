import Logo from "@/components/Logo";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import "/globals.css";
import { Josefin_Sans } from "next/font/google";
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
console.log(josefin);
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
      >
        <header>
          <Logo />
          <Navigation></Navigation>
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
