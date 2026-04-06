import { MultiStepForm } from '@/components/MultiStepForm';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-white/60 bg-white/70 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-3xl px-4 py-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white text-lg">
            🎪
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">EventHire</h1>
            <p className="text-xs text-gray-500">Post a Requirement</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Post a Hiring Requirement
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
            Fill in your event details and we&apos;ll match you with the best talent available in
            your area.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-xl shadow-blue-900/5 ring-1 ring-gray-200 p-6 sm:p-8">
          <MultiStepForm />
        </div>
      </div>

      <footer className="py-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} EventHire. Built with Next.js & Express.
      </footer>
    </main>
  );
}
