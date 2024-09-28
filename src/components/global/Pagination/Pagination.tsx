import React from "react";

import styles from "./pagination.module.scss";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const renderPageNumbers = () => {
        const pageNumbers: (number | string)[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else if (totalPages === 6) {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, 4, "...", totalPages);
            } else {
                pageNumbers.push(1, "...", 3, 4, 5, 6);
            }
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(
                    1,
                    "...",
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pageNumbers.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                );
            }
        }

        return pageNumbers;
    };

    const handlePageClick = (page: number | string) => {
        if (typeof page === "number") {
            onPageChange(page);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const pageNumbers = renderPageNumbers();

    return (
        <div className="flex items-center justify-center space-x-2">
            {totalPages > 5 && (
                <button
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
                >
                    prev
                </button>
            )}
            {pageNumbers.map((page, index) => (
                <button
                    key={index}
                    onClick={() => handlePageClick(page)}
                    className={`${styles.button} ${page === currentPage && styles.buttonSelected}`}
                >
                    {page}
                </button>
            ))}
            {totalPages > 5 && (
                <button
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
                >
                    next
                </button>
            )}
        </div>
    );
};
