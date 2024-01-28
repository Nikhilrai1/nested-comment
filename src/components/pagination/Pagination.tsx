import { Box, Button } from '@mui/material';
import React from 'react';

interface PaginationProps {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    hasNextPage,
    hasPrevPage,
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>
            <Button
                disabled={!hasPrevPage}
                sx={{
                    width: "20px",
                    height: "20px",
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "fit-content",
                }}
                onClick={() => onPageChange(currentPage - 1)}
            >
                {"<"}
            </Button>

            {pages.map((page) => (
                <Button
                    key={page}
                    onClick={() => onPageChange(page)}
                    sx={{
                        width: "20px",
                        height: "20px",
                        p: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "fit-content",
                        bgcolor: currentPage === page ? "blue" : "gray",
                        color: "white",
                        "&:hover": {
                            background: "rgba(21, 136, 21, 0.658)",
                        }
                    }}
                >
                    {page}
                </Button>
            ))}

            <Button
                onClick={() => onPageChange(currentPage + 1)}
                sx={{
                    width: "20px",
                    height: "20px",
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "fit-content",
                }}
                disabled={!hasNextPage}
            >
                {">"}
            </Button>
        </Box>
    );
};

export default Pagination;
