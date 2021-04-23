import React, {useState, useEffect} from 'react';
import Header from './Header'

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
    }, []) //runs only once after inital render


    return(
        <React.Fragment>
            <Header></Header>
                <div className="wrap main--grid">
                    {courses.map(course => (
                                    <a className="course--module course--link" href="course-detail.html" key={'course '+ course.id}>
                                    <h2 className="course--label">{course.title}</h2>
                                    <h3 className="course--title">{course.description}</h3>
                                    </a>
                    ))
                    }
                </div>  
        </React.Fragment>
    )
}

export default Courses