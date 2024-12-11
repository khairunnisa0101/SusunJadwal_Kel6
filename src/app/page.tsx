import CardFeatureList from "@/components/molecules/card/CardFeatureList";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex bg-primary text-white relative flex-1 overflow-hidden md:h-[80vh] h-[55vh] justify-center">
        <div className="text-center md:space-y-8 space-y-4 max-w-xl mt-24">
          <h1 className="md:text-5xl text-3xl font-bold font-paytone">
            Susun Jadwal
          </h1>
          <p>
            Susun Jadwal adalah aplikasi berbasis web yang mendukung dalam
            kegiatan pembelajaran seperti kuliah dan sekolah.
          </p>
          <Button className="bg-white text-primary hover:bg-white/90 hover:text-primary">
            <Link href={"/login"}>Coba Sekarang</Link>
          </Button>
        </div>
        <div className="md:flex hidden justify-center absolute md:-bottom-24 -bottom-12">
          <Image
            src="/assets/images/landing.png"
            alt="Susun Jadwal"
            width={600}
            height={300}
          />
        </div>
      </main>
      <div className="my-10">
        <CardFeatureList />
      </div>
    </>
  );
}
