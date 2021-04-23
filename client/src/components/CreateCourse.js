import React from 'react';
import Header from './Header';

/****
 * DISPLAYS A FORM TO CREATE A NEW COURSE
 ***/

function CreateCourse(){
    return(
        <React.Fragment>
        <Header></Header>
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                        </ul>
                    </div>
                    <form>
                        <div className="main--flex">
                            <div>
                                <label for="courseTitle">Course Title</label>
                                <input id="courseTitle" name="courseTitle" type="text" value=""/>

                                <label for="courseAuthor">Course Author</label>
                                <input id="courseAuthor" name="courseAuthor" type="text" value=""/>

                                <label for="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="courseDescription"></textarea>
                            </div>
                            <div>
                                <label for="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" value=""/>

                                <label for="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">Create Course</button><button class="button button-secondary">Cancel</button>
                    </form>
                </div>
            </main>
        </React.Fragment>
    )
}

export default CreateCourse