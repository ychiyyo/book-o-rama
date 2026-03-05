import { Outlet, Link } from 'react-router-dom';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-black selection:text-white">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center group">
                            <span className="font-semibold text-lg tracking-tight text-zinc-900 group-hover:text-zinc-500 transition-colors">
                                Book-o-rama
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* spacer for fixed header */}
            <div className="h-16" />

            <main className="flex-1 flex flex-col w-full relative z-0">
                <Outlet />
            </main>
        </div>
    );
}
