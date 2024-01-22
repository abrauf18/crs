import Link from 'next/link';
import React from 'react';

function Pagintaion() {
    return (
        <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                    <Link
                        href="#"
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg lg:hover:bg-gray-100 lg:hover:text-gray-700"
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 lg:hover:bg-gray-100 lg:hover:text-gray-700"
                    >
                        1
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 lg:hover:bg-gray-100 lg:hover:text-gray-700"
                    >
                        2
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        aria-current="page"
                        className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-white border border-blue-300 bg-primary-color lg:hover:bg-orange-400"
                    >
                        3
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 lg:hover:bg-gray-100 lg:hover:text-gray-700"
                    >
                        ...
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 lg:hover:bg-gray-100 lg:hover:text-gray-700"
                    >
                        8
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg lg:hover:bg-gray-100 lg:hover:text-gray-700"
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Pagintaion;
