//dependencies
import React, {useState, useEffect, useContext} from 'react';
import Header from './Header';
import {Link, useParams, useHistory} from "react-router-dom";
import {LoginContext} from '../LoginProvider';
import Data from '../Data';
import ReactMarkdown from 'react-markdown';

/****
 * DISPLAYS A COURSE DESCRIPTION ALONG WITH THE POSSIBILITY TO UPDATE OR DELETE A COURSE
 ***/

function CourseDetail(){

    //creates an instance of data
    const data = new Data(); 

    //course data
    const [course, setCourse] = useState("");
    const [user, setUser] = useState(""); 
    const [materials, setMaterials] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const {id} = useParams();

    //context and history
    const value = useContext(LoginContext);
    const authUser = value.authenticatedUser;
    const history = useHistory();

    //deletes a course and redirects the user
    const handleDelete = async(e) => {
        await data.deleteCourse(`/courses/${id}`, value.authenticatedUser.emailAddress, value.authenticatedPassword)
        .then(history.push("/"))
        .catch(error => {
            console.error(error);
            history.push("/error");
        })
    }

    /****
    * FETCH DATA
    ***/
    useEffect(()=>{
        
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                if (res.status === 404){ //makes sure there is a course with that id
                    return history.push("/notfound")}
                else {
                    return res.json()
                }
            })
            .then(courseAsJSON => { //sets all the relevant variables for this course
                if(courseAsJSON){ //so the not found page does not get replaced by the error page
                    setCourse(courseAsJSON);
                    if(courseAsJSON.User){setUser(courseAsJSON.User)}
                    if(courseAsJSON.materialsNeeded){setMaterials(courseAsJSON.materialsNeeded)};
                    if(courseAsJSON.description){setCourseDescription(courseAsJSON.description)};
                }
            })
            .catch(error => { //deals with server errors
                console.error(error);
                history.push("/error");
            })
    }, [id, history])//fires every time a new course is loaded

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
                        <ReactMarkdown>{courseDescription}</ReactMarkdown>
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