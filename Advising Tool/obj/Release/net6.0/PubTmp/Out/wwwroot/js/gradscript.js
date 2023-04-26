//Imoprts//
window.addEventListener("load", function (e) {
    var index = 0;
    document.querySelectorAll(".course").forEach(course => {
        index++;
        if (index % 2 == 0) {
            course.style = "background: #989898; " + course.style;
        } else {
            course.style = "background: #cecece; " + course.style;
        }
    });
}, false);

function filterCourses(element) {
    var parent = element.parentElement;
    parent.querySelectorAll(".course").forEach(course => {
        if (!course.innerHTML.includes(element.value)) {
            course.hidden = true;
        } else {
            course.hidden = false;
        }
    });
}

//==================================================================//

function downloadSchedule() {
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    var globalcredits = document.querySelector(".creditcounter").innerHTML;
    mywindow.document.write(`<label style='font-size:20px;'>${globalcredits}</label><br />`);
    document.querySelectorAll(".year").forEach(year => {
        var yearlabel = year.querySelector('.yearlabel').innerHTML;
        mywindow.document.write(`<label style='font-size:20px;'>${yearlabel}</label><br />`);
        year.querySelectorAll(".semesterdiv").forEach(semester => {
            var semesterlabel = semester.querySelector(".semesterlabel").innerHTML;
            mywindow.document.write(`<label style='font-size:14px; margin-left:15px;'>${semesterlabel}</label>`);
            mywindow.document.write(`<div style="border:1px solid black; margin-left:25px; padding:5px;">`)
            semester.querySelectorAll(".course").forEach(course => {
                var id = course.id;
                var credit = course.dataset.credit;
                var courseinfo = `${id}: ${credit} credit(s)`
                mywindow.document.write(`<p style='text-indent:30px; font-size:10px; width:max-content;'>${courseinfo}</p>`);
            });
            mywindow.document.write(`</div>`)
        });
    });
    mywindow.document.write("<div class='new-page'");
    var option = document.querySelector(".selectedfinal").querySelector(".finaloption");
    var optionlabel;
    if (option) {
        optionlabel = option.querySelector(".finaloptionlabel").innerHTML;
        mywindow.document.write(`<br /><label style='font-size:20px;'>${optionlabel}</label><br />`);
    }
    var i = 0;
    if (option) {
        option.querySelectorAll(".finalsection").forEach(section => {
            i++;
            if (section.dataset.num !== "0") {
                var num = section.dataset.num;
                mywindow.document.write(`<label style='font-size:18px;'>Section ${i}: ${num} times</label><br />`);
                section.querySelectorAll(".finalcoursegroup").forEach(group => {
                    mywindow.document.write(`<div style="border:1px solid black; margin-left:25px; padding:5px;">`)
                    for (var course of group.querySelectorAll(".finalcourse")) {
                        if (course.querySelector("input").checked == true) {
                            var clone = course.cloneNode(true);
                            clone.querySelector("input").remove();
                            clone.querySelector("br").remove();
                            mywindow.document.write(clone.innerHTML);
                        }
                        mywindow.document.write(`<br />`);
                    }
                    mywindow.document.write(`</div><br />`);
                });
            } else {
                if (section.dataset.min === section.dataset.max) {
                    var num = section.dataset.max;
                    mywindow.document.write(`<label style='font-size:18px;'>Section ${i}: ${num} credits</label><br />`);
                    section.querySelectorAll(".finalcoursegroup").forEach(group => {
                        mywindow.document.write(`<div style="border:1px solid black; margin-left:25px; padding:5px;">`)
                        for (var course of group.querySelectorAll(".finalcourse")) {
                            if (course.querySelector("input").checked == true) {
                                var clone = course.cloneNode(true);
                                clone.querySelector("input").remove();
                                clone.querySelector("br").remove();
                                mywindow.document.write(clone.innerHTML);
                                mywindow.document.write(`<br />`);
                            }
                        }
                        mywindow.document.write(`</div><br />`);
                    });
                } else {
                    var min = section.dataset.min;
                    var max = section.dataset.max;
                    mywindow.document.write(`<label style='font-size:18px;'>Section ${i}: ${min} - ${max} credits</label><br />`);
                    section.querySelectorAll(".finalcoursegroup").forEach(group => {
                        mywindow.document.write(`<div style="border:1px solid black; margin-left:25px; padding:5px;">`)
                        for (var course of group.querySelectorAll(".finalcourse")) {
                            if (course.querySelector("input").checked == true) {
                                var clone = course.cloneNode(true);
                                clone.querySelector("input").remove();
                                clone.querySelector("br").remove();
                                mywindow.document.write(clone.innerHTML);
                                mywindow.document.write(`<br />`);
                            }
                        }
                        mywindow.document.write(`</div><br />`);
                    });
                }
            }
        });
    }
    mywindow.document.write("</div>");
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
}

//==================================================================//

function updateGlobalCredits(element) {
    var counter = document.querySelector(".creditcounter");
    for (var option of document.querySelectorAll(".finaloption")) {
        if (!option.querySelector("input").checked) {
            continue;
        }
        for (var section of option.querySelectorAll(".finalsection")) {
            for (var course of section.querySelectorAll(".finalcourse")) {
                if (course.parentElement.parentElement.dataset.num == "0") {
                    if (element == course.querySelector('input') && element.checked) {
                        counter.dataset.credits = String(Number(counter.dataset.credits) + Number(course.dataset.max));
                    } else if (element == course.querySelector('input') && !element.checked) {
                        counter.dataset.credits = String(Number(counter.dataset.credits) - Number(course.dataset.max));
                    }
                }
            }
        }
    }
    counter.innerHTML = counter.dataset.credits + " credits";
}

//==================================================================//

function setFinalProj() {
    var parent = document.querySelector(".selectedfinal");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    var options = document.querySelectorAll(".finaloption");
    for (var option of options) {
        var check = option.querySelector("input");
        if (check.checked) {
            var clone = option.cloneNode(true);
            clone.querySelector("input").remove();
            clone.querySelectorAll("input").forEach(input => {
                input.disabled = true;
            });
            parent.appendChild(clone);
            return;
        }
    }
}

//==================================================================//

function updateFinalOptions(element) {
    element.parentElement.querySelectorAll("input").forEach(input => {
        if (input !== element) {
            if (input.checked) {
                input.click();
            }
            input.disabled = false;
        }
    });
    element.checked = true;
    document.querySelector(".finalproject").querySelectorAll(".finaloption").forEach(option => {
        if (option == element.parentElement) {
            option.querySelectorAll(".finalcourse").forEach(course => {
                course.querySelector("input").disabled = false;
            });
        } else {
            option.querySelector("input").checked = false;
            option.querySelectorAll(".finalcourse").forEach(course => {
                if (course.querySelector("input").checked) {
                    course.querySelector("input").click();
                    removeCredit(course);
                }
                course.querySelector("input").disabled = true;
            });
        }
    });
}

function removeCredit(element) {
    var counter = document.querySelector(".creditcounter");
    if (element.parentElement.parentElement.dataset.num === "0") {
        if (element.querySelector("input").checked) {
            counter.dataset.credits = String(Number(counter.dataset.credits) + (Number(element.dataset.max)));
        } else {
            counter.dataset.credits = String(Number(counter.dataset.credits) - (Number(element.dataset.max)));
        }
    }
    counter.innerHTML = counter.dataset.credits + " credits";
}

//==================================================================//

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

//==================================================================//

function downloadScheduleOLD() {
    var finalDiv;
    for (var obj of document.querySelectorAll(".finaloption")) {
        if (obj.querySelector("input").checked) {
            finalDiv = obj;
            break;
        }
    }
    var scheduleDiv = document.querySelector(".scheduleyear");
    var retString = "";
    var depth = "";
    for (var obj of document.querySelectorAll(".depthsection")) {
        if (obj.querySelector("input").checked) {
            depth = obj.querySelector(".sectionlabel").dataset.name;
        }
    }
    var finalselection = finalDiv.querySelector(".finaloption");
    var degType = finalselection === null ? "No final selected." : finalselection.querySelector("label").innerHTML;
    if (degType !== "") {
        retString += `Final Type: ${degType}\n\n`
    }
    if (depth !== "") {
        retString += `Depth: ${depth}\n\n=========================================\n\n`;
    }
    scheduleDiv.querySelectorAll(".year").forEach(year => {
        retString += year.querySelector(".yearlabel").innerHTML.trim() + "\n";
        year.querySelectorAll(".semesterdiv").forEach(semDiv => {
            retString += semDiv.querySelector(".semesterlabel").innerHTML.trim() + "\n";
            semDiv.querySelectorAll(".course").forEach(course => {
                retString += selectUpTo(course.id, "<").trim() + "\n";
            });
            retString += "\n";
        });
        retString += "=========================================\n\n"
    });
    retString += "Final Selection:\n"
    var groupCount = 0;
    finalDiv.querySelectorAll(".finalsection").forEach(group => {
        groupCount++;
        retString += `Group ${groupCount}\n`;
        group.querySelectorAll(".finalcourse").forEach(course => {
            if (course.querySelector("input").checked) {
                retString += `${course.dataset.area}${course.dataset.id}\n`;
            }
        });
        retString += "\n";
    });
    if (groupCount === 0) {
        retString += "No final selected.";
    }
    download(`schedule.txt`, retString);

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

//==================================================================//

function updateCount(element) {
    var specialty = document.querySelector('.specialty');
    var count = Number(document.querySelector('.specialty').dataset.count);
    specialty.dataset.count = Number(count + (element.checked ? 1 : -1));
    if (element.checked) {
        if (specialty.dataset.count >= specialty.dataset.num) {
            document.querySelectorAll(".specialtyoption").forEach(sect => {
                if (!sect.querySelector('input').checked) {
                    sect.querySelector('input').disabled = true;
                    sect.querySelectorAll(".course").forEach(course => {
                        if (course.querySelector("input").checked) {
                            course.querySelector("input").click();
                        }
                        course.querySelector("input").disabled = true;
                    });
                }
            });
        } else {
            document.querySelectorAll(".specialtyoption").forEach(sect => {
                if (sect.dataset.credits > sect.dataset.current) {
                    sect.querySelector('input').disabled = false;
                }
            });
        }
        element.parentElement.parentElement.querySelectorAll(".course").forEach(course => {
            course.querySelector('input').disabled = false;
        });
    }
    else {
        element.parentElement.parentElement.querySelectorAll(".course").forEach(course => {
            if (course.querySelector('input').checked) {
                course.querySelector('input').click();
            }
            course.querySelector('input').disabled = true;
        });
    }
}

//==================================================================//

function switchVisibleSection(value, element) {
    var thisElmt = document.querySelector(value);
    document.querySelectorAll('.subarea').forEach(area => {
        area.hidden = true;
    });
    document.querySelectorAll('.butsel').forEach(button => {
        button.setAttribute("active", "false");
    });
    thisElmt.hidden = false;
    element.setAttribute("active", "true");
}

//==================================================================//

function switchVisibleSubsection(value, element) {
    document.querySelectorAll(".coursesubsect").forEach(subsect => {
        subsect.hidden = true;
    });
    document.querySelector(value).hidden = false;
    document.querySelectorAll(".selectionbutton").forEach(button => {
        button.setAttribute("active", "false");
    });
    element.setAttribute("active", "true");
}

//==================================================================//

function setLocalStorage(element) {
    window.localStorage.setItem("query", element.id);
}

//==================================================================//

function minimizeCourses(element) {
    element.parentElement.parentElement.querySelector(".areacourses").toggleAttribute("hidden");
    element.innerHTML = element.innerHTML == "-" ? "+" : "-";
    element.setAttribute("hidecourses", element.innerHTML == "-" ? "false" : "true");
}

//==================================================================//

function modifyCourseScheduling(element) {
    var parentCourse = element.parentElement;
    var courseOptions = document.querySelector(".courseoptions");

    if (element.checked) {
        var courseCopy = parentCourse.cloneNode(true);
        courseCopy.querySelector(".courselabel").innerHTML += " " + courseCopy.querySelector(".creditlabel").innerHTML;
        courseCopy.querySelector(".courselabel").setAttribute("onclick", "");
        courseCopy.querySelector(".courseinfo").remove();
        courseCopy.setAttribute("onclick", "updateSelectedCourse(this);");
        courseCopy.querySelector("input").remove();
        courseOptions.appendChild(courseCopy);
    } else {
        document.querySelector(".selectedcourses").querySelectorAll(".course").forEach(course => {
            if (course.id === parentCourse.id) {
                course.remove();
            }
        });
    }
}

//==================================================================//

function updateSelectedCourse(element) {
    document.querySelector(".courseoptions").querySelectorAll(".course").forEach(course => {
        course.setAttribute("active", "false");
    });
    element.setAttribute("active", "true");
}

//==================================================================//

function addSelectedCourse(element) {
    var options = document.querySelector(".courseoptions");
    var semesterCourses = element.parentElement.querySelector('.semestercourses');
    var courses = [];
    options.querySelectorAll(".course").forEach(course => {
        var prevCourses = [];
        document.querySelectorAll(".prevcourse").forEach(prev => {
            prevCourses.push(prev.querySelector("input").value);
        });
        if (course.getAttribute("active") === "true") {
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
                var validCourses = [];
                for (const courseGroup of prereq) {
                    var groupValid = false;
                    for (const subcourse of courseGroup) {
                        for (const val of courses) {
                            var str = (subcourse.AREA + subcourse.ID);
                            if (val.id === str) {
                                groupValid = true;
                                validCourses.push(val);
                                break;
                            }
                        }
                        if (prevCourses.includes(subcourse.AREA + subcourse.ID)) {
                            groupValid = true;
                            break;
                        }
                    }
                    if (groupValid === false) {
                        course.setAttribute("active", "false");
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
            course.setAttribute("onclick", "sendBackToOptions(this);");
            course.setAttribute("active", false);
            course.parentElement.removeChild(course);
            semesterCourses.appendChild(course);
            if (!checkRecommended(course)) {
                alert("This course can still be added to your schedule, but you are missing recommended background for this course in your current scheduling.")
            }
        }
    });
}

//==================================================================//

function sendBackToOptions(element) {
    var semDiv = document.querySelectorAll(".semestercourses");
    var options = document.querySelector(".courseoptions");

    element.setAttribute("onclick", "updateSelectedCourse(this)");

    for (const semester of semDiv) {
        semester.querySelectorAll(".course").forEach(val => {
            if (!checkPrerequisite(val)) {
                val.setAttribute("onclick", "updateSelectedCourse(this)");
                options.appendChild(val);
            }
        });
    }
    element.setAttribute("active", "false");
    options.appendChild(element);
}

//==================================================================//

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

//==================================================================//

function checkPrerequisite(course) {
    var semesterCourses = course.parentElement;
    var courses = [];
    var prevCourses = [];
    document.querySelectorAll(".prevcourse").forEach(prev => {
        prevCourses.push(prev.querySelector("input").value);
    });

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
                if (prevCourses.includes(subcourse.AREA + subcourse.ID) && !groupValid) {
                    groupValid = true;
                    break;
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

//==================================================================//

function updateCreditCount(element) {
    var counter = document.querySelector(".creditcounter");
    var elmt = element.parentElement.parentElement.parentElement.parentElement;
    if (element.checked) {
        elmt.dataset.current = String(Number(elmt.dataset.current) + Number(element.parentElement.dataset.credit));
        counter.dataset.credits = String(Number(counter.dataset.credits) + Number(element.parentElement.dataset.credit));
    } else {
        elmt.dataset.current = String(Number(elmt.dataset.current) - Number(element.parentElement.dataset.credit));
        counter.dataset.credits = String(Number(counter.dataset.credits) - Number(element.parentElement.dataset.credit));
    }
    counter.innerHTML = counter.dataset.credits + " credits";
}

//==================================================================//

function updateCreditCountTwo(element) {
    var counter = document.querySelector(".creditcounter");
    var elmt = element.parentElement.parentElement;
    if (element.checked) {
        elmt.dataset.current = String(Number(elmt.dataset.current) + Number(element.parentElement.dataset.credit));
        counter.dataset.credits = String(Number(counter.dataset.credits) + Number(element.parentElement.dataset.credit));
    } else {
        elmt.dataset.current = String(Number(elmt.dataset.current) - Number(element.parentElement.dataset.credit));
        counter.dataset.credits = String(Number(counter.dataset.credits) - Number(element.parentElement.dataset.credit));
    }
    counter.innerHTML = counter.dataset.credits + " credits";
    elmt.querySelectorAll(".course").forEach(course => {
        if (!course.querySelector("input").checked) {
            course.querySelector("input").disabled = Number(elmt.dataset.current) >= Number(elmt.dataset.credit);
        }
    });
}

//==================================================================//

function disableCoursesInGroup(element) {
    var elmt = element.parentElement.parentElement.parentElement.parentElement;
    elmt.querySelectorAll(".course").forEach(course => {
        course.querySelector("input").disabled = (Number(elmt.dataset.current) >= elmt.dataset.credits)
        if (course.querySelector("input").checked) {
            course.querySelector("input").disabled = false;
        }
    });
    elmt.querySelectorAll(".coursegroup").forEach(group => {
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
}

//==================================================================//

function hideDuplicate(element) {
    var course = element.parentElement.id;
    for (var other of document.querySelectorAll(".course")) {
        if (other.querySelector("input") == null) { continue; }
        if (element.checked) {
            if (other.id === course && other !== element.parentElement) {
                document.querySelector(".selectedcourses").querySelectorAll(".course").forEach(course => {
                    if (course.id === other.id) {
                        course.remove();
                    }
                });
                if (other.querySelector("input").checked) {
                    other.querySelector("input").click()
                }
                other.querySelector("input").hidden = true;
            }
        } else {
            if (other.id === course && !other.checked) {
                if (other.querySelector("input").checked) {
                    other.querySelector("input").click();
                }
                other.querySelector("input").hidden = false;
            }
        }
    }
}

//==================================================================//

function minimizeCoursesTwo(element) {
    var parent = element.parentElement.parentElement;
    if (element.innerHTML == "+") {
        element.innerHTML = "-";
    } else {
        element.innerHTML = "+";
    }
    parent.querySelector(".courses").hidden ^= true;
}

//==================================================================//

function warningFunc() {
    alert("Consult your advisor about credits for this course as it either has no credits listed or is worth 0 credits.");
}

//==================================================================//

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

//==================================================================//

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

//==================================================================//

function duplicateSelf(element) {
    var copy = element.parentElement.cloneNode(true);
    copy.querySelector(".removeprev").disabled = false;
    element.parentElement.parentElement.appendChild(copy);
}

//==================================================================//

function removeParent(element, remove) {
    if (remove == true) {
        element.parentElement.remove();
    }
    var options = document.querySelector(".courseoptions");
    document.querySelector(".scheduleyear").querySelectorAll(".course").forEach(course => {
        if (!checkPrerequisite(course)) {
            course.setAttribute("onclick", "updateSelectedCourse(this)");
            options.appendChild(course);
        }
    });
}

//==================================================================//

function toggleDepthOptions(element) {
    var parent = element.parentElement.parentElement;
    if (element.checked) {
        parent.querySelectorAll(".course").forEach(course => {
            course.querySelector("input").disabled = false;
        });
    } else {
        parent.querySelectorAll(".course").forEach(course => {
            if (course.querySelector("input").checked) {
                course.querySelector("input").click();
            }
            course.querySelector("input").disabled = true;
        });
    }
    document.querySelectorAll(".depthoption").forEach(option => {
        if (option != parent) {
            if (option.querySelector("input").checked) {
                option.querySelector("input").click();
            } else {
                element.click();
            }
            option.querySelectorAll("input").disabled = true;
            option.querySelector("input").checked = false;
        }
    });
}