import Link from "next/link";
import Image from "next/image";

export function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90 font-bold text-emerald-700">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-emerald-50 border border-emerald-100">
              <Image 
                src="/logo.png" 
                alt="Campus Ride Logo" 
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Campus Ride
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/login"
              className="rounded-full px-4 py-1.5 font-medium text-zinc-600 hover:text-emerald-700 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-emerald-600 px-4 py-1.5 font-medium text-white hover:bg-emerald-500 shadow-md transition-all active:scale-95"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col justify-center px-4 py-32 text-center sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
            University Transportation Sharing
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-6xl">
            A ride, whenever you need it.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-zinc-600">
            Real-time transit matching for students and staff. 
            Sign in to share your request and get moving faster.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-14 w-full max-w-xs items-center justify-center rounded-full bg-emerald-600 px-10 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-500 hover:shadow-xl active:scale-95 sm:w-auto"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="inline-flex h-14 w-full max-w-xs items-center justify-center rounded-full border border-zinc-200 bg-white px-10 text-base font-semibold text-zinc-800 shadow-sm transition-all hover:bg-zinc-50 active:scale-95 sm:w-auto"
            >
              Sign up
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-zinc-100 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div className="flex flex-col items-center gap-3 sm:items-start text-center sm:text-left">
              <div className="flex items-center gap-2">
                <div className="relative h-6 w-6 overflow-hidden rounded bg-emerald-50 border border-emerald-100">
                  <Image 
                    src="/logo.png" 
                    alt="Campus Ride Logo" 
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-bold tracking-tight text-emerald-700">
                  Campus Ride
                </span>
              </div>
              <p className="text-xs font-medium text-zinc-500">
                &copy; {new Date().getFullYear()} University transit and transportation system.
              </p>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-semibold text-zinc-500">
              <a href="#" className="hover:text-emerald-600 transition-colors">Documentation</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Github</a>
            </nav>

            <div className="text-xs font-bold text-zinc-400 tracking-tight">
              Built with <span className="text-emerald-600">Next.js & Supabase</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
