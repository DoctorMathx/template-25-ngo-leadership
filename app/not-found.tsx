import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white min-h-[70vh] flex items-center">
      <div className="container-x py-24">
        <p className="eyebrow">Error 404</p>
        <h1 className="display-xl mt-6 max-w-[14ch]">This page isn’t here — yet.</h1>
        <p className="lede mt-6 max-w-lg">It may have moved, or it may still be under construction, like our civic centre.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-ink btn-lg">Back to home</Link>
          <Link href="/leaders" className="btn btn-outline btn-lg">Explore leaders programmes</Link>
        </div>
      </div>
    </section>
  );
}
