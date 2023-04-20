function filterCourses(element) {
    var parent = element.parentElement;
    parent.querySelectorAll(".electivecourse").forEach(course => {
        if (!course.innerHTML.includes(element.value)) {
            course.hidden = true;
        } else {
            course.hidden = false;
        }
    });
}

function toggleActiveAttribute(element) {
    if (!element.classList.contains('active')) {
        element.parentElement.querySelectorAll(".butsel").forEach(butsel => {
            butsel.classList.remove('active');
        });
        element.classList.add('active');
    }

    if (element.innerHTML.includes("Course Selection")) {
        document.querySelector(".courseselection").hidden = false;
        document.querySelector(".selectedcourses").hidden = true;
    }
    if (element.innerHTML.includes("Selected Courses")) {
        document.querySelector(".courseselection").hidden = true;
        document.querySelector(".selectedcourses").hidden = false;
    }
}
function toggleCourseInfo(element) {
    element.parentElement.querySelector(".courseinfo").hidden ^= true;
}

function modifyCourseScheduling(element) {
    var parentCourse = element.parentElement.parentElement;
    var courseOptions = document.querySelector(".courseoptions");

    if (element.checked) {
        if (parentCourse.parentElement.classList.contains("finalcoursegroup")) {
            if (!parentCourse.dataset.numtaken == "0") {
                var courseCopy = parentCourse.cloneNode(true);
                courseCopy.querySelector(".creditlabel").innerHTML = "";
                courseCopy.querySelector(".courselabel").innerHTML += " " + courseCopy.querySelector(".creditlabel").innerHTML;
                courseCopy.querySelector(".courseinfo").remove();
                courseCopy.querySelector(".courseheader").setAttribute("onclick", "updateSelectedCourses(this)");
                courseCopy.querySelector("input").remove();
                for (let i = 0; i < Number(parentCourse.dataset.numtaken); i++) {
                    courseOptions.appendChild(courseCopy.cloneNode(true));
                }
            }
        } else {
            var courseCopy = parentCourse.cloneNode(true);
            courseCopy.querySelector(".courselabel").innerHTML += " " + courseCopy.querySelector(".creditlabel").innerHTML;
            courseCopy.querySelector(".courseinfo").remove();
            courseCopy.querySelector(".courseheader").setAttribute("onclick", "updateSelectedCourses(this)");
            courseCopy.querySelector("input").remove();
            courseOptions.appendChild(courseCopy);
        }
    } else {
        document.querySelector(".selectedcourses").querySelectorAll(".course").forEach(course => {
            if (course.id === parentCourse.id) {
                course.remove();
            }
        });
    }
}