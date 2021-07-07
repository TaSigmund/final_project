//dependencies
import React, {useState, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './Header';
import {LoginContext} from '../LoginProvider';
import Data from '../Data';
import ReactMarkdown from 'react-markdown';

/****
 * DISPLAYS A FORM TO CREATE A NEW COURSE
 ***/

function CreateCourse(){
    
    //creates an instance of data
    const data = new Data();

    //access hook functionality
    const value = useContext(LoginContext);
    const history = useHistory();
    
    //set current user
    const authUser = value.authenticatedUser;

    //store field data
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [errors, setErrors] = useState(null);


    

    //submit form and redirect
    const handleSubmit = async(e) => {
        e.preventDefault();
        const course = {
            title: courseTitle,
            description: courseDescription,
            estimatedTime,
            materialsNeeded,
            userId: value.authenticatedUser.id
        };
        await data.createCourse(course, value.authenticatedUser.emailAddress, value.authenticatedPassword)
        .then((response)=>{
            if (response === null){
                history.push("/")
            }
            else {
                setErrors(response.message);
                history.push("/courses/create");
            }
        })
        .catch(error => { //deals with server errors
            console.error(error);
            history.push("/error");
        })
    }

    return(
        <React.Fragment>
        <Header></Header>
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    {
                    errors?
                    <div className="validation--errors">
                    <h3>Validation Errors</h3>
                        <ReactMarkdown>{errors.replaceAll("Validation error:", "*").replaceAll(",", "")}</ReactMarkdown>
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
                                    value={courseTitle}
                                    placeholder="Please provide a course title."
                                    onChange={e => setCourseTitle(e.target.value)}    
                                />

                                <label htmlFor="courseAuthor">Course Author</label>
                                <p>{authUser.firstName} {authUser.lastName}</p>
                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea 
                                    id="courseDescription" 
                                    name="courseDescription"
                                    value={courseDescription}
                                    placeholder="Please provide a course description."
                                    onChange={e => setCourseDescription(e.target.value)}
                                    ></textarea>
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
                                    placeholder="Please provide a list of materials."
                                    onChange={e => setMaterialsNeeded(e.target.value)}
                                    ></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">Create Course</button><Link to="/"><button className="button button-secondary">Cancel</button></Link>
                    </form>
                </div>
            </main>
        </React.Fragment>
    )
}

export default CreateCourse