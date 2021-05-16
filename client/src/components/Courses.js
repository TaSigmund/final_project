//dependencies
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import Header from './Header';

/****
 * DISPLAYS A LIST OF ALL COURSES
 ***/
function Courses(){
    const [courses, setCourses] = useState([])

/****
 * FETCH DATA
 ***/
useEffect(()=>{
        fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(coursesAsJSON => setCourses(coursesAsJSON))
            .catch(error => console.log('connection failed', error))
    }, []) //runs only once after initial render


    return(
        <React.Fragment>
            <Header></Header>
                <div className="wrap main--grid">
                    {courses.map(course => (
                                    <Link className="course--module course--link" to={`/courses/${course.id}`} key={'course '+ course.id}>
                                    <h2 className="course--label">Course</h2>
                                    <h3 className="course--title">{course.title}</h3>
                                    </Link>
                    ))
                    }
                </div>  
        </React.Fragment>
    )
}

export default Courses