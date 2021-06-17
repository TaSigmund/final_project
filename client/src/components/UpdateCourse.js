//dependencies
import React, {useState, useContext, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Header from './Header';
import {LoginContext} from '../LoginProvider';
import Data from '../Data';

/****
 * DISPLAYS A FORM TO UPDATE A COURSE
 ***/
function UpdateCourse(){

    //creates an instance of data
    const data = new Data(); 

    //context and history
    const value = useContext(LoginContext);
    const history = useHistory();
    
    //course data
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [errors, setErrors] = useState(null);
    const {id} = useParams();

    //display existing data for the course
     useEffect(()=>{
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                if (res.status === 404){ //makes sure there is a course with that id
                    history.push("/notfound")}
                else {
                    return res.json()
                }
            })
            .then(courseAsJSON => { //makes sure the authenticated user owns that course
                if(courseAsJSON){ //so the not found page does not get replaced by the error page
                    if (courseAsJSON.userId !== value.authenticatedUser.id){ //authentication
                        history.push("/forbidden")
                    }
                    else {
                        return courseAsJSON
                    }
            }
            })
            .then(courseAsJSON => { //sets all the relevant variables for this course
                if(courseAsJSON){
                    if(courseAsJSON.title){setCourseTitle(courseAsJSON.title)};
                    if(courseAsJSON.description){setCourseDescription(courseAsJSON.description)};
                    if(courseAsJSON.estimatedTime){setEstimatedTime(courseAsJSON.estimatedTime)};
                    if(courseAsJSON.materialsNeeded){setMaterialsNeeded(courseAsJSON.materialsNeeded)};
                    return courseAsJSON
            }
            })
            .catch(error => { //deals with server errors
                console.error(error);
                history.push("/error")
            })
    }, [id, history, value.authenticatedUser.id])//changes every time a new course is loaded

    //submit form and redirect
    const handleSubmit = async(e) => {
        e.preventDefault();
        const course = {
            id: value.authenticatedUser.id,
            title: courseTitle,
            description: courseDescription,
            estimatedTime,
            materialsNeeded,
            userId: value.authenticatedUser.id
        };
        await data.updateCourse(`/courses/${id}`, course, value.authenticatedUser.emailAddress, value.authenticatedPassword)
        .then(
            async (response) => 
            {
            if (response === null){ // update successful
                history.push("/"); // redirect
            }
            else { //update fails
                setErrors(response.message)
                history.push(`/courses/${id}/update`)
            }
            }
        )
        .catch(error => { //deals with server errors
            console.error(error);
            history.push("/error")
        })
    }  
    

    return(
        <React.Fragment>
            <Header></Header>
            <main>
                    <div className="wrap">
                        <h2>Update Course</h2>
                    {
                    errors?
                    <div className="validation--errors">
                    <h3>Validation Errors</h3>

                        <p>{errors}</p>
                    </div>:
                    <React.Fragment></React.Fragment>
                    }
                        <form onSubmit={handleSubmit}>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input 
                                        id="courseTitle" 
                                        name="courseTitle" 
                                        type="text" 
                                        placeholder={courseTitle}
                                        value={courseTitle}
                                        onChange={e => setCourseTitle(e.target.value)}   
                                    />

                                    <label htmlFor="courseAuthor">Course Author</label>
                                    <input id="courseAuthor" name="courseAuthor" type="text"/>

                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea 
                                        id="courseDescription" 
                                        name="courseDescription"
                                        value={courseDescription}
                                        onChange={e => setCourseDescription(e.target.value)}
                                    >Please provide a course description.</textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input 
                                        id="estimatedTime" 
                                        name="estimatedTime" 
                                        type="text" 
                                        value={estimatedTime}
                                        placeholder="Please provide a time estimate."
                                        onChange={e => setEstimatedTime(e.target.value)} 
                                        />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea 
                                        id="materialsNeeded" 
                                        name="materialsNeeded"
                                        value={materialsNeeded}
                                        onChange={e => setMaterialsNeeded(e.target.value)}
                                    >
                                    Please provide a course description.
                                    </textarea>
                                </div>
                            </div>
                            <button className="button" type="submit">Update Course</button><button className="button button-secondary">Cancel</button>
                        </form>
                    </div>
                </main>
        </React.Fragment>
    )
}

export default UpdateCourse