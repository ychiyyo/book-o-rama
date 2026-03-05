import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_BOOKS } from '../data/books';

export default function Reader() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const book = MOCK_BOOKS.find(b => b.id === bookId);

    const [currentPage, setCurrentPage] = useState(0);

    // Load saved progress
    useEffect(() => {
        if (bookId) {
            const savedPage = localStorage.getItem(`progress_${bookId}`);
            if (savedPage) {
                // Enforce boundaries just in case
                const parsedPage = parseInt(savedPage, 10);
                if (parsedPage >= 0 && parsedPage < (book?.totalPages || 1)) {
                    setCurrentPage(parsedPage);
                }
            }
        }
    }, [bookId, book]);

    // Save progress on page change
    useEffect(() => {
        if (bookId) {
            localStorage.setItem(`progress_${bookId}`, currentPage.toString());
        }
    }, [bookId, currentPage]);

    if (!book) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-zinc-400">Book not found.</p>
            </div>
        );
    }

    const handleNext = () => {
        if (currentPage < book.totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 bg-white flex flex-col relative h-full"
        >
            {/* Subtle Top Navigation */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
                <button
                    onClick={() => navigate('/')}
                    className="pointer-events-auto flex items-center justify-center p-2 -ml-2 rounded-md text-zinc-400 hover:text-zinc-900 transition-colors bg-white/50 hover:bg-zinc-100 backdrop-blur-sm"
                    title="Back to Library"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>

                <div className="pointer-events-auto flex items-baseline gap-1 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-md">
                    <span className="text-sm font-medium text-zinc-900">{currentPage + 1}</span>
                    <span className="text-xs text-zinc-400">/ {book.totalPages}</span>
                </div>
            </div>

            {/* Reader Area */}
            <div className="flex-1 relative flex items-center justify-center h-full w-full">
                {/* Invisible tap zones for mobile/tablet navigation */}
                <div
                    className="absolute inset-y-0 left-0 w-1/3 z-20 cursor-pointer"
                    onClick={handlePrev}
                    aria-label="Previous Page"
                />
                <div
                    className="absolute inset-y-0 right-0 w-1/3 z-20 cursor-pointer"
                    onClick={handleNext}
                    aria-label="Next Page"
                />

                {/* The Image Container */}
                <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 select-none overflow-hidden bg-[#f4f4f5]">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.img
                            key={currentPage}
                            src={book.getPageImage(currentPage)}
                            alt={`Page ${currentPage + 1}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="max-h-[90vh] max-w-full object-contain shadow-sm border border-zinc-200"
                            draggable={false}
                        />
                    </AnimatePresence>
                </div>

                {/* Desktop Navigation Hover Zones */}
                <div className="absolute inset-y-0 left-0 w-24 hidden sm:flex items-center justify-center z-30 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className="pointer-events-auto p-3 rounded-full bg-white shadow-sm border border-zinc-200 text-zinc-600 disabled:opacity-0 transition-transform hover:scale-110 active:scale-95"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="absolute inset-y-0 right-0 w-24 hidden sm:flex items-center justify-center z-30 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <button
                        onClick={handleNext}
                        disabled={currentPage === book.totalPages - 1}
                        className="pointer-events-auto p-3 rounded-full bg-white shadow-sm border border-zinc-200 text-zinc-600 disabled:opacity-0 transition-transform hover:scale-110 active:scale-95"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
