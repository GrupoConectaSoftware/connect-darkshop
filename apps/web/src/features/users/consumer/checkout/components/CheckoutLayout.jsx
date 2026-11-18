import checkoutImage from "../../../../../assets/Chekout/imagesChekout.webp";

export default function CheckoutLayout({ children }) {
  return (
    <main className="relative flex h-screen w-full items-center justify-end overflow-hidden bg-black p-4 lg:p-8">
      <img
        src={checkoutImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <span className="absolute inset-0 bg-black/55" />
      <span className="absolute inset-0 bg-linear-to-l from-black/20 via-transparent to-black/50" />
      <section className="relative z-10 w-full max-w-[680px]">
        <div className="max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-white/30 bg-white p-6 shadow-2xl [scrollbar-width:none] sm:p-8 [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </section>
    </main>
  );
}
