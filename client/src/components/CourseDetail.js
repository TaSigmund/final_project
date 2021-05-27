import React, {useState, useEffect, useContext} from 'react';
import Header from './Header';
import {Link, useParams} from "react-router-dom";
import {LoginContext} from '../LoginProvider';
import Data from '../Data';
import ReactMarkdown from 'react-markdown';

/****
 * DISPLAYS A COURSE DESCRIPTION ALONG WITH THE POSSIBILITY TO UPDATE OR DELETE A COURSE
 ***/

function CourseDetail(){

    const data = new Data(); //creates an instance of data

    const [course, setCourse] = useState({}); //current course
    const [user, setUser] = useState({}); //associated user
    const [materials, setMaterials] = useState([]);
    const [courseDescription, setCourseDescription] = useState([]);
    let {id} = useParams();

    const value = useContext(LoginContext);
    const authUser = value.authenticatedUser;

    const handleDelete = async(e) => {
        await data.deleteCourse(`/courses/${id}`, value.authenticatedUser.emailAddress, value.authenticatedPassword);
    }

    /****
    * FETCH DATA
    ***/
    useEffect(()=>{
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(courseAsJSON => {
                setCourse(courseAsJSON);
                setUser(courseAsJSON.User);
                setMaterials(courseAsJSON.materialsNeeded);
                setCourseDescription(courseAsJSON.description);
            })
            .catch(error => console.log('connection failed', error))
    }, [id])//changes every time a new course is loaded

    return(
    <React.Fragment>
        <Header></Header>
        <main>
        <div className="actions--bar">
            <div className="wrap">
                {
                    (authUser && authUser.id === course.userId)?
                    <React.Fragment>
                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                    <Link className="button" to={`/`}onClick={handleDelete}>Delete Course</Link>
                    </React.Fragment>
                    :
                    <React.Fragment>
                    </React.Fragment>
                }
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
                        {courseDescription}
                    </div>
                    <div>
                        <h3 className="course--detail--title">estimated time</h3>
                        <p> {course.estimatedTime} </p>
                        <h3 className="course--detail--title">materials needed</h3>
                        <ul className="course--detail--list">
                        <ReactMarkdown>{materials}</ReactMarkdown>
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