import React, {useState, useContext} from 'react';
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
                    <div class="wrap">
                        <h2>Update Course</h2>
                        <form onSubmit={handleSubmit}>
                            <div class="main--flex">
                                <div>
                                    <label for="courseTitle">Course Title</label>
                                    <input 
                                        id="courseTitle" 
                                        name="courseTitle" 
                                        type="text" 
                                        value={courseTitle}
                                        placeholder="Please provide a course title."
                                        onChange={e => setCourseTitle(e.target.value)}   
                                    />

                                    <label for="courseAuthor">Course Author</label>
                                    <input id="courseAuthor" name="courseAuthor" type="text" value="Replace With Course Author"/>

                                    <label for="courseDescription">Course Description</label>
                                    <textarea 
                                        id="courseDescription" 
                                        name="courseDescription"
                                        value={courseDescription}
                                        onChange={e => setCourseDescription(e.target.value)}
                                    >Please provide a course description.</textarea>
                                </div>
                                <div>
                                    <label for="estimatedTime">Estimated Time</label>
                                    <input 
                                        id="estimatedTime" 
                                        name="estimatedTime" 
                                        type="text" 
                                        value={estimatedTime}
                                        placeholder="Please provide a course title."
                                        onChange={e => setEstimatedTime(e.target.value)} 
                                        />

                                    <label for="materialsNeeded">Materials Needed</label>
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
                            <button class="button" type="submit">Update Course</button><button class="button button-secondary">Cancel</button>
                        </form>
                    </div>
                </main>
        </React.Fragment>
    )
}

export default UpdateCourse