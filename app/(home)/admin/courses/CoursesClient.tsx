'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import CourseCard from '@/components/modules/courses/course-card';
import CreateCourseModal from '@/components/modules/courses/create-course-modal';
import { Course } from '@/lib/types/course';
import { Search } from 'lucide-react';

interface CoursesClientProps {
    initialCourses: Course[];
}

export default function CoursesClient({ initialCourses }: CoursesClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Debounce search query for better performance
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Normalize string for better matching
    const normalizeString = useCallback((str: string): string => {
        return str
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .normalize('NFD') // Normalize unicode characters
            .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
    }, []);

    // Calculate relevance score for ranking
    const calculateRelevanceScore = useCallback((course: Course, searchTerms: string[]): number => {
        let score = 0;
        const name = normalizeString(course.name || '');
        const description = normalizeString(course.description || '');

        searchTerms.forEach((term) => {
            // Exact match in name (highest priority)
            if (name === term) score += 100;

            // Name starts with search term
            else if (name.startsWith(term)) score += 50;

            // Name contains the term as a whole word
            else if (new RegExp(`\\b${term}\\b`).test(name)) score += 30;

            // Name contains the term anywhere
            else if (name.includes(term)) score += 20;

            // Description contains term as whole word
            if (new RegExp(`\\b${term}\\b`).test(description)) score += 10;

            // Description contains term anywhere
            else if (description.includes(term)) score += 5;
        });

        return score;
    }, [normalizeString]);

    // Filter and sort courses based on search query
    const filteredCourses = useMemo(() => {
        if (!debouncedQuery.trim()) {
            return initialCourses;
        }

        const normalizedQuery = normalizeString(debouncedQuery);

        // Split query into individual search terms
        const searchTerms = normalizedQuery.split(' ').filter(term => term.length > 0);

        if (searchTerms.length === 0) {
            return initialCourses;
        }

        // Filter and score courses
        const coursesWithScores = initialCourses
            .map((course) => ({
                course,
                score: calculateRelevanceScore(course, searchTerms)
            }))
            .filter(({ score }) => score > 0) // Only include courses with matches
            .sort((a, b) => b.score - a.score); // Sort by relevance score (highest first)

        return coursesWithScores.map(({ course }) => course);
    }, [initialCourses, debouncedQuery, normalizeString, calculateRelevanceScore]);

    return (
        <div className="px-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 min-w-60">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>

                <CreateCourseModal />
            </div>

            <section className="space-y-4">
                <header className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Courses ({filteredCourses.length})
                    </h2>
                </header>

                {filteredCourses.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
                        <p className="text-sm font-medium text-gray-600">
                            {searchQuery.trim()
                                ? 'No courses found matching your search.'
                                : 'No courses found. Create your first course to get started.'}
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
