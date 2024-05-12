// import { getUniqueStudent } from "@/lib/db"

import { Footer, GetRoom, Hero } from "@/components/announce";

export default async function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between pb-8 font-display">
      <div className="flex w-full flex-col">
        <Hero />
        <GetRoom />
      </div>
      <Footer />
    </main>
  );
}
