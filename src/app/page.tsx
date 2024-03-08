import LandingServer from "@/components/pages/landing/server/landing-server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pass it or Keep it (PIOKI)',
  description: 'Have fun socializing yourself up with the fascinating system . . .',
}

export default function Home() {
  return (
      <LandingServer/>
  );
}
