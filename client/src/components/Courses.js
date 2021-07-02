//dependencies
import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";

import Header from './Header';

/****
 * MAIN PAGE - DISPLAYS A LIST OF ALL COURSES 
 ***/
function Courses(){
    const [courses, setCourses] = useState([]);
    const history = useHistory();

/****
 * FETCH DATA - ALL COURSES
 ***/
useEffect(()=>{
        fetch('http://localhost:5000/api/courses')
            .then(res => {
                if (res.status === 500){
                    throw new Error()}
                else {return res.json()}
            })
            .then(coursesAsJSON => setCourses(coursesAsJSON))
            .catch(error => { //deals with server errors
                console.error(error);
                history.push("/error")
            })
    }, [courses.length, history]) //fires every time the number of courses changes

    return(
        <React.Fragment>
            <Header></Header>
                <div className="wrap main--grid">
                    {courses.map(course => (
                                    <Link className="course--module course--link" to={`/courses/${course.id}`} key={'course '+ course.id}>
                                    <h2 className="course--label">Course</h2>
                                    <h3 className="course--title">{course.title}</h3>
                                    </Link>
                    ))}
                    <Link className="course--module course--add--module" to={'/courses/create'}>
                            <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                              New Courses</span>
                    </Link>
                </div>  
        </React.Fragment>
    )
}

export default Courses