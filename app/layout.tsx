import "./globals.css";
import { Nunito } from "next/font/google";

import { SafeUser } from "@/types";

import type { Metadata } from "next";

import getCurrentUser from "@/actions/getCurrentUser";

import Navbar from "@/components/navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
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
            <SearchModal />
            <RentModal />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
        </header>

        <main>
          <section className="pb-20 pt-28">{children}</section>
        </main>
      </body>
    </html>
  );
}
