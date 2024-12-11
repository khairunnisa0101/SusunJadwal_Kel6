import Image from "next/image";

export default function LoginBanner() {
  return (
    <>
      <div className="md:w-5/12 relative flex-1 space-y-4 md:flex hidden px-6 md:px-12 md:h-full bg-primary text-center flex-col text-white items-center justify-center">
        <Image
          src="/assets/images/asset-login.png"
          alt="Susun Jadwal"
          width={3026}
          height={2893}
        />
        <h1 className="md:text-2xl font-semibold">
          Mulai perkuliahan anda disini.
        </h1>
        <p className="text-slate-200">
          Koneksikan perkuliahan anda dengan fasilitas yang ada.
        </p>
      </div>
    </>
  );
}
