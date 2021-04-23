import React from 'react';
import Header from './Header';

/****
 * DISPLAYS A FORM TO UPDATE A COURSE
 ***/
function UpdateCourse(){
    return(
        <React.Fragment>
            <Header></Header>
            <main>
                    <div class="wrap">
                        <h2>Update Course</h2>
                        <form>
                            <div class="main--flex">
                                <div>
                                    <label for="courseTitle">Course Title</label>
                                    <input id="courseTitle" name="courseTitle" type="text" value="Replace With Course Title"/>

                                    <label for="courseAuthor">Course Author</label>
                                    <input id="courseAuthor" name="courseAuthor" type="text" value="Replace With Course Author"/>

                                    <label for="courseDescription">Course Description</label>
                                    <textarea id="courseDescription" name="courseDescription">
                                        Replace With Course Description
                                    </textarea>
                                </div>
                                <div>
                                    <label for="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text" value="Replace With Estimated Time"/>

                                    <label for="materialsNeeded">Materials Needed</label>
                                    <textarea id="materialsNeeded" name="materialsNeeded">
                                    Replace with Material List
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