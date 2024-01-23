import React from 'react';
import CourseCard, { CourseCardInterface } from './CourseCard';

const courses: CourseCardInterface[] = [
    {
        id: '1',
        name: 'Corona Virus',
    },
    {
        id: '2',
        name: 'Corona Virus Topic 2',
    },
    {
        id: '3',
        name: 'Aggregates and Programs',
    },
    {
        id: '4',
        name: 'Computatioal Devices',
    },
    {
        id: '5',
        name: 'Internet Services',
    },
    {
        id: '6',
        name: 'Programming and Data Structures',
    },
    {
        id: '7',
        name: 'Corona Virus',
    },
    {
        id: '8',
        name: 'Corona Virus',
    },
    {
        id: '9',
        name: 'Corona Virus',
    },
    {
        id: '10',
        name: 'Corona Virus',
    },
];
function AllCourses() {
    return (
        <section className="pb-5">
            <h1 className="font-semibold text-lg">All Courses</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {courses.map((course) => (
                    <div key={course.id}>
                        <CourseCard name={course.name} id={course.id} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default AllCourses;
