import React, {useState, useContext, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Header from './Header';
import {LoginContext} from '../LoginProvider';
import Data from '../Data';

/****
 * DISPLAYS A FORM TO UPDATE A COURSE
 ***/
function UpdateCourse(){
    const data = new Data(); //creates an instance of data
    const value = useContext(LoginContext);
    let history = useHistory();
    let {id} = useParams();

    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");

    /****
    * FETCH DATA FOR PLACEHOLDERS
    ***/
     useEffect(()=>{
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(courseAsJSON => {
                setCourseTitle(courseAsJSON.title);
                setCourseDescription(courseAsJSON.description);
                setEstimatedTime(courseAsJSON.estimatedTime);
                setMaterialsNeeded(courseAsJSON.materialsNeeded);
                return courseAsJSON
            })
            .catch(error => console.log('connection failed', error))
    }, [id])//changes every time a new course is loaded

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
        await data.updateCourse(`/courses/${id}`, course, value.authenticatedUser.emailAddress, value.authenticatedPassword);
        history.push('/');
    }

    return(
        <React.Fragment>
            <Header></Header>
            <main>
                    <div className="wrap">
                        <h2>Update Course</h2>
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