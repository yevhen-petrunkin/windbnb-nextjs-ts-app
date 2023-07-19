import "./globals.css";
import type { Metadata } from "next";
import { SafeUser } from "@/types";
import { Nunito } from "next/font/google";
import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/components/navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import RentModal from "@/components/modals/RentModal";
import ToasterProvider from "@/providers/ToasterProvider";

export const metadata: Metadata = {
  title: "Windbnb",
  description: "Airbnb Clone",
};

const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser: SafeUser | null = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <header>
          <ClientOnly>
            <ToasterProvider />
            <RentModal />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
        </header>

        {children}
      </body>
    </html>
  );
}
