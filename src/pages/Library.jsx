import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { MOCK_BOOKS } from '../data/books';

export default function Library() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10"
        >
            <div className="mb-12">
                <h1 className="text-3xl font-medium tracking-tight text-zinc-900">
                    Library
                </h1>
                <p className="mt-2 text-zinc-500 font-normal">
                    Your scanned collection.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                {MOCK_BOOKS.map((book) => {
                    // Check local storage for progress
                    const progressStr = localStorage.getItem(`progress_${book.id}`);
                    const progress = progressStr ? parseInt(progressStr, 10) : 0;
                    const percentComplete = Math.round((progress / book.totalPages) * 100);

                    return (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link
                                to={`/read/${book.id}`}
                                className="group flex flex-col gap-3 h-full"
                            >
                                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-sm border border-zinc-200 bg-zinc-50 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:-translate-y-1">
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                    {/* Subtle inner shadow for depth, no heavy gradients */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] pointer-events-none" />
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-medium text-zinc-900 truncate">
                                                {book.title}
                                            </h3>
                                            <p className="text-xs text-zinc-500 truncate mt-0.5">
                                                {book.author}
                                            </p>
                                        </div>
                                        {progress > 0 && percentComplete < 100 && (
                                            <span className="shrink-0 text-[10px] font-medium text-zinc-400 tracking-wider">
                                                {percentComplete}%
                                            </span>
                                        )}
                                        {percentComplete === 100 && (
                                            <span className="shrink-0 text-[10px] font-medium text-green-600 tracking-wider">
                                                DONE
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
