
var list;
window.addEventListener("load", function (e) {
    list = document.querySelector(".scheduleyear").querySelectorAll(".year");
}, false);

function selectUpTo(str, key) {
    var match = "";
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) !== key) {
            match += str.charAt(i);
        } else {
            return match;
        }
    }
    return match;
}

function downloadSchedule() {
    var scheduleDiv = document.querySelector(".scheduleyear");
    var yearCount = 0;
    if (scheduleDiv.querySelectorAll(".course").length == 0) {
        alert("You don't have any courses scheduled.");
        return;
    }
    scheduleDiv.querySelectorAll(".year").forEach(year => {
        yearCount++;
        var yearStr = "";
        yearStr += year.querySelector(".yearlabel").innerHTML.trim() + "\n";
        year.querySelectorAll(".semesterdiv").forEach(semDiv => {
            yearStr += semDiv.querySelector(".semesterlabel").innerHTML.trim() + "\n";
            semDiv.querySelectorAll(".course").forEach(course => {
                yearStr += selectUpTo(course.id, "<").trim() + "\n";
            });
            yearStr += "\n";
        });
        download("year-" + yearCount + ".txt", yearStr);
    });

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

function warningFunc() {
    alert("Consult your advisor about credits for this course as it either has no credits listed or is worth 0 credits.");
}

function removeYear(element) {
    element.parentElement.remove();
    list = document.querySelector(".scheduleyear").querySelectorAll(".year");
    list.forEach(year => {
        if (list.length === 1) {
            year.querySelector(".removeyear").hidden = true;
            year.querySelector(".addyear").hidden = false;
        } else {
            if (year === list[list.length - 1]) {
                year.querySelector(".removeyear").hidden = false;
                year.querySelector(".addyear").hidden = false;
            } else {
                year.querySelector(".removeyear").hidden = true;
                year.querySelector(".addyear").hidden = true;
            }
        }
    });
}

function addYear(element) {
    var clone = element.parentElement.cloneNode(true);
    clone.querySelectorAll(".course").forEach(course => {
        course.remove();
    });
    clone.querySelector(".yearlabel").innerHTML = "Year " + (document.querySelectorAll(".year").length + 1);
    clone.querySelector(".removeyear").hidden = false;
    element.parentElement.parentElement.appendChild(clone);
    element.parentElement.querySelector(".removeyear").hidden = true;
    element.hidden = true;
    list = document.querySelector(".scheduleyear").querySelectorAll(".year");
}

function updateAvailableElectives(element, course) {
    if (course.dataset.credits.includes('-')) {
        if (course.querySelector("input").checked) {
            element.dataset.current = (Number(course.dataset.credits.split('-')[1]) + Number(element.dataset.current));
        } else {
            element.dataset.current = (Number(element.dataset.current) - Number(course.dataset.credits.split('-')[1]));
        }
    } else {
        if (course.querySelector("input").checked) {
            element.dataset.current = (Number(course.dataset.credits) + Number(element.dataset.current));
        } else {
            element.dataset.current = (Number(element.dataset.current) - Number(course.dataset.credits));
        }
    }
    element.querySelectorAll(".electivecourse").forEach(course => {
        if (Number(element.dataset.current) >= Number(element.dataset.credits)) {
            var input = course.querySelector("input");
            if (!input.checked) {
                input.disabled = true;
            }
        } else {
            var input = course.querySelector("input");
            input.disabled = false;
        }
    });
}

function hideSchedYearChildren(element) {
    element.dataset.hidechildren ^= true;
    element.querySelectorAll(".semesterdiv").forEach(semester => {
        semester.hidden ^= true;
    });
    element.querySelectorAll(".spacer").forEach(spacer => {
        spacer.hidden ^= true;
    });
}

function removeFromSchedule(element) {
    var schedule = document.querySelector(".scheduleyear");
    if (!element.checked) {
        schedule.querySelectorAll(".course").forEach(course => {
            if (course.id === element.parentElement.parentElement.id) {
                course.remove();
            }
        });
    }
}

function addSelectedCourse(element) {
    var options = document.querySelector(".courseoptions");
    var semesterCourses = element.parentElement.querySelector('.semestercourses');
    var courses = [];
    options.querySelectorAll(".course").forEach(course => {
        var header = course.querySelector(".courseheader");
        if (header.getAttribute("active") === "true") {
            if (course.dataset.prereq !== "" && course.dataset.prereq !== undefined) {
                var semDiv = document.querySelectorAll(".semestercourses");
                var prereq = JSON.parse(course.dataset.prereq);
                for (const semester of semDiv) {
                    if (semester == semesterCourses) {
                        break;
                    } else {
                        semester.querySelectorAll(".course").forEach(subcourse => {
                            courses.push(subcourse);
                        });
                    }
                }
                if (courses.length == 0) {
                    header.setAttribute("active", "false");
                    alert("Prerequisite requirement not met for this course.");
                    return;
                }
                var validCourses = [];
                for (const courseGroup of prereq) {
                    var groupValid = false;
                    for (const subcourse of courseGroup) {
                        for (const val of courses) {
                            var str = (subcourse.AREA + subcourse.ID);
                            if (val.id == str) {
                                groupValid = true;
                                validCourses.push(val);
                                break;
                            }
                        }
                    }
                    if (groupValid === false) {
                        header.setAttribute("active", "false");
                        alert("Prerequisite requirement not met for this course.");
                        return;
                    } else {
                        continue;
                    }
                }
                for (const val of validCourses) {
                    val.dataset.locked = "true";
                }
            }
            header.setAttribute("onclick", "sendBackToOptions(this);");
            header.setAttribute("active", false);
            course.parentElement.removeChild(course);
            semesterCourses.appendChild(course);
            if (!checkRecommended(course)) {
                alert("This course can still be added to your schedule, but you are missing recommended background for this course in your current scheduling.")
            }
        }
    });
}

function checkRecommended(course) {
    var semesterCourses = course.parentElement;
    var courses = [];
    if (course.dataset.rec !== "" && course.dataset.rec !== undefined) {
        var semDiv = document.querySelectorAll(".semestercourses");
        var rec = JSON.parse(course.dataset.rec);
        for (const semester of semDiv) {
            if (semester == semesterCourses) {
                break;
            } else {
                semester.querySelectorAll(".course").forEach(subcourse => {
                    courses.push(subcourse);
                });
            }
        }
        if (courses.length == 0) {
            return false;
        }
        var validCourses = [];
        for (const courseGroup of rec) {
            var groupValid = false;
            for (const subcourse of courseGroup) {
                for (const val of courses) {
                    var str = (subcourse.AREA + subcourse.ID);
                    if (val.id == str) {
                        groupValid = true;
                        validCourses.push(val);
                        break;
                    }
                }
            }
            if (groupValid === false) {
                return false;
            } else {
                continue;
            }
        }
    }
    return true;
}

function checkPrerequisite(course) {
    var semesterCourses = course.parentElement;
    var courses = [];
    if (course.dataset.prereq !== "" && course.dataset.prereq !== undefined) {
        var semDiv = document.querySelectorAll(".semestercourses");
        var prereq = JSON.parse(course.dataset.prereq);
        for (const semester of semDiv) {
            if (semester == semesterCourses) {
                break;
            } else {
                semester.querySelectorAll(".course").forEach(subcourse => {
                    courses.push(subcourse);
                });
            }
        }
        if (courses.length == 0) {
            return false;
        }
        var validCourses = [];
        for (const courseGroup of prereq) {
            var groupValid = false;
            for (const subcourse of courseGroup) {
                for (const val of courses) {
                    var str = (subcourse.AREA + subcourse.ID);
                    if (val.id == str) {
                        groupValid = true;
                        validCourses.push(val);
                        break;
                    }
                }
            }
            if (groupValid === false) {
                return false;
            } else {
                continue;
            }
        }
    }
    return true;
}

function copyPrerequisite(course) {
    var arr = JSON.parse(course.dataset.prereq);
    var arrCopy = [];
    for (let i = 0; i < arr.length; i++) {
        var subarr = [];
        for (let j = 0; j < arr[i].length; j++) {
            subarr[j] = arr[i][j].AREA + arr[i][j].ID;
        }
        arrCopy[i] = subarr
    }
    return arrCopy;
}

function sendBackToOptions(element) {
    var semDiv = document.querySelectorAll(".semestercourses");
    var semesterCourses = element.parentElement.parentElement.parentElement;
    var options = document.querySelector(".courseoptions");

    element.setAttribute("onclick", "updateSelectedCourses(this)");
    options.appendChild(element.parentElement);

    for (const semester of semDiv) {
        if (semester == semesterCourses) {
            break;
        } else {
            semester.querySelectorAll(".course").forEach(val => {
                if (!checkPrerequisite(val)) {
                    val.querySelector(".courseheader").setAttribute("onclick", "updateSelectedCourses(this)");
                    options.appendChild(val);
                }
            });
        }
    }
}

function setLocalStorage(element) {
    window.localStorage.setItem("query", element.id);
}

function redirectToCatalog() {
    window.open("https://localhost:7242/Graduate-Catalog", "_blank", "noopener noreferrer");
}

function toggleElectiveInfo(element) {
    element.parentElement.parentElement.querySelector(".electiveinfo").hidden ^= true;
}

function toggleHideDuplicateCourse(element) {
    document.querySelectorAll(".course").forEach(course => {
        if (element.parentElement.id === course.id) {
            course.hidden ^= true;
        }
    });
}

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

function modifyCourseScheduling(element) {
    var parentCourse = element.parentElement.parentElement;
    var courseOptions = document.querySelector(".courseoptions");

    if (element.checked) {
        if (parentCourse.classList.contains("course")) {
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
            var elective = electiveToCourse(parentCourse);
            courseOptions.appendChild(elective);
        }
    } else {
        document.querySelector(".selectedcourses").querySelectorAll(".course").forEach(course => {
            if (course.id === parentCourse.id) {
                course.remove();
            }
        });
    }

    function electiveToCourse(course) {
        var credits = course.dataset.credits
        var courseCopy = createElement("div", "course");
        courseCopy.setAttribute("id", course.id);
        courseCopy.setAttribute("data-credits", credits);
        courseCopy.setAttribute("data-prereq", course.dataset.prereq);

        var courseHeader = createElement("div", "courseheader");
        var courseLabel = createElement("label", "courselabel");
        courseLabel.innerHTML = course.querySelector(".electivetitle").innerHTML;
        courseHeader.appendChild(courseLabel);
        courseHeader.setAttribute("onclick", "updateSelectedCourses(this)");
        courseCopy.appendChild(courseHeader);
        return courseCopy;
    }
}

function createElement(type, className) {
    const element = document.createElement(type);
    element.className = className
    return element;
}

function updateSelectedCourses(element) {
    document.querySelector(".courseoptions").querySelectorAll(".courseheader").forEach(course => {
        course.setAttribute("active", false);
    });
    element.setAttribute("active", true);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function updateCreditCount(element) {
    var elmt = element.parentElement.parentElement.parentElement.parentElement;
    if (element.checked) {
        elmt.dataset.creditcount = String(Number(elmt.dataset.creditcount) + Number(element.parentElement.parentElement.dataset.credit));
    } else {
        elmt.dataset.creditcount = String(Number(elmt.dataset.creditcount) - Number(element.parentElement.parentElement.dataset.credit));
    }
}

function disableCoursesInGroup(element) {
    var elmt = element.parentElement.parentElement.parentElement.parentElement;
    elmt.querySelectorAll(".course").forEach(course => {
        course.querySelector("input").disabled = (Number(elmt.dataset.creditcount) >= elmt.dataset.creditsmax)
        if (course.querySelector("input").checked) {
            course.querySelector("input").disabled = false;
        }
    });
    elmt.querySelectorAll(".courseGroup").forEach(group => {
        var checked = false
        group.querySelectorAll(".course").forEach(course => {
            if (course.querySelector("input").checked) {
                checked = true;
            }
        });
        if (checked) {
            group.querySelectorAll(".course").forEach(course => {
                var input = course.querySelector("input");
                if (!input.checked) {
                    input.disabled = true;
                } else {
                    input.disabled = false;
                }
            })
        }
    });
    element.disabled = false;

    document.querySelectorAll(".electivecourse").forEach(course => {
        if (course.id == element.parentElement.parentElement.id) {
            if (course.querySelector("input").checked) {
                course.querySelector("input").click();
            }
            course.querySelector("input").checked = false;
            course.hidden ^= true;
        }
    });
}

function minimizeChildren(element) {
    element.toggleAttribute('active');
    var parent = element.parentElement.parentElement;
    parent.querySelectorAll(".courseGroup").forEach(sect => {
        sect.hidden ^= true;
        if (sect.hidden == true) {
            element.innerHTML = "+";
        } else {
            element.innerHTML = "-";
        }
    });
    parent.querySelectorAll(".spacer").forEach(sect => {
        sect.hidden ^= true;
        if (sect.hidden == true) {
            element.innerHTML = "+";
        } else {
            element.innerHTML = "-";
        }
    });
}

function toggleCourseInfo(element) {
    element.parentElement.querySelector(".courseinfo").hidden ^= true;
}

function toggleActiveAttribute(element) {
    if (!element.classList.contains('active')) {
        element.parentElement.querySelectorAll(".butsel").forEach(butsel => {
            butsel.classList.remove('active');
        });
        element.classList.add('active');
    }

    if (element.innerHTML.includes("Course Selection")) {
        document.querySelectorAll(".subarea").forEach(subarea => {
            subarea.hidden = true;
        });
        document.querySelector(".sectional").hidden = false;
    }
    if (element.innerHTML.includes("Final Project")) {
        document.querySelectorAll(".subarea").forEach(subarea => {
            subarea.hidden = true;
        });
        document.querySelector(".finalproj").hidden = false;
    }
    if (element.innerHTML.includes("Selected Courses")) {
        document.querySelectorAll(".subarea").forEach(subarea => {
            subarea.hidden = true;
        });
        document.querySelector(".selectedcourses").hidden = false;
    }
}