import React from 'react';
import Header from './Header';

/****
 * DISPLAYS A COURSE DESCRIPTION ALONG WITH THE POSSIBILITY TO UPDATE OR DELETE A COURSE
 ***/

function CourseDetail(){

    return(
    <React.Fragment>
        <Header></Header>
        <main>
        <div className="actions--bar">
            <div className="wrap">
                <a className="button" href="update-course.html">Update Course</a>
                <a className="button" href="#">Delete Course</a>
                <a className="button button-secondary" href="index.html">Return to List</a>
            </div>
        </div>
        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">Replace With Course Title</h4>
                        <p>by User First Name and User Last Name</p>
                        <p>Course Description</p>
                    </div>
                    <div>
                        <h3 className="course--detail--title">estimated time</h3>
                        <p> Replace with time</p>
                        <h3 className="course--detail--title">materials needed</h3>
                        <ul className="course--detail--list">
                            <li>Replace wit items</li>
                            <li>Replace wit items</li>
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