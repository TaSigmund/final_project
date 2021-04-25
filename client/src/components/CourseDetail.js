import React, {useState, useEffect} from 'react';
import Header from './Header';
import {Link, useParams} from "react-router-dom";

/****
 * DISPLAYS A COURSE DESCRIPTION ALONG WITH THE POSSIBILITY TO UPDATE OR DELETE A COURSE
 ***/

function CourseDetail(){

    const [course, setCourse] = useState({}); //current course
    const [user, setUser] = useState({}); //associated user
    const [materials, setMaterials] = useState([]);
    let {id} = useParams();

    /****
    * FETCH DATA
    ***/
    useEffect(()=>{
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(courseAsJSON => {
                setCourse(courseAsJSON);
                setUser(courseAsJSON.User);
                return courseAsJSON
            })
            .then(course => {
                let materialsString = JSON.stringify(course.materialsNeeded); //turns JSON into string
                materialsString = materialsString.replace(/\\n/g, ""); //removes the line breaks
                materialsString = materialsString.replace(/"/g, ""); //removes the apostrophes
                let materialsArray = materialsString.split("*"); //turns list into array
                materialsArray.shift();//removes the empty string in the first position
                setMaterials(materialsArray.map(material => <li key={'material:' + materialsArray.indexOf(material)}>{material}</li>))}) //create and store list items
            .catch(error => console.log('connection failed', error))
    }, [id])//changes every time a new course is loaded

    return(
    <React.Fragment>
        <Header></Header>
        <main>
        <div className="actions--bar">
            <div className="wrap">
                <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                <Link className="button" to={`/api/courses/${course.id}`}>Delete Course</Link>
                <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
        </div>
        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p>by {user.firstName} {user.lastName}</p>
                        <p>{course.description}</p>
                    </div>
                    <div>
                        <h3 className="course--detail--title">estimated time</h3>
                        <p> {course.estimatedTime} </p>
                        <h3 className="course--detail--title">materials needed</h3>
                        <ul className="course--detail--list">
                            {materials}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
        </main>
    </React.Fragment>
    )
}

export default CourseDetail