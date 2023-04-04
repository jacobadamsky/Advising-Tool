/*


function getSelectedCourses() {
  var element = document.querySelector(".courseoptions");
  document.querySelector(".scheduleyear").querySelectorAll(".course").forEach(course => {
    course.remove();
  });
  removeAllChildNodes(element);
  removeAllChildNodes(document.querySelector(".selectedfinal"));
  document.querySelectorAll(".course").forEach(course => {
    if (course.querySelector("input").checked) {
      if (course.dataset.numtaken && course.dataset.numtaken !== "0") {
        for (let i = 0; i < Number(course.dataset.numtaken); i++) {
          element.appendChild(course.cloneNode(true));
        }
      }
      else {
        if (!course.parentElement.classList.contains("finalcoursegroup")) {
          element.appendChild(course.cloneNode(true));
        }
        else {
          var clone = course.cloneNode(true)
          clone.querySelector(".courselabel").innerHTML += ": " + course.parentElement.parentElement.querySelector(".finalcredits").innerHTML.replace(" group", "");
          document.querySelector(".selectedfinal").appendChild(clone);
        }
      }
    }
  });

  element.querySelectorAll(".course").forEach(course => {
    course.querySelector(".courselabel").innerHTML += course.querySelector(".creditlabel").innerHTML;
  });

  var electives = generateElectiveCourses();
  for (let i = 0; i < electives.length; i++) {
    element.appendChild(electives[i]);
  }

  element.querySelectorAll("input").forEach(input => {
    input.remove();
  });

  element.querySelectorAll(".courseinfo").forEach(info => {
    info.remove();
  });

  element.querySelectorAll(".courseheader").forEach(header => {
    header.setAttribute("onclick", "updateSelectedCourses(this)");
  });

  document.querySelector(".selectedfinal").querySelectorAll(".course").forEach(course => {
    course.querySelector("input").remove();
    course.querySelector(".courseinfo").remove();
    course.querySelector(".courseheader").setAttribute("onclick", "");
  });
}

function generateElectiveCourses() {
  var arr = [], i = 0;
  document.querySelectorAll(".electivecourse").forEach(course => {
    if (course.querySelector("input").checked) {
      var credits = course.dataset.credits
      var courseCopy = createElement("div", "course");
      courseCopy.setAttribute("id", course.id);
      courseCopy.setAttribute("data-credits", credits);

      var courseHeader = createElement("div", "courseheader");
      var courseLabel = createElement("label", "courselabel");
      courseLabel.innerHTML = course.querySelector(".electivetitle").innerHTML;
      courseHeader.appendChild(courseLabel);
      courseCopy.appendChild(courseHeader);

      var courseInfo = createElement("div", "courseinfo");
      var creditLabel = createElement("div", "creditlabel");
      if (course.dataset.credits == "") {
        creditLabel.innerHTML = "(Credits TBD)"
      } else if (course.dataset.credits == "1") {
        creditLabel.innerHTML = "(1 credit)"
      } else {
        creditLabel.innerHTML = "(" + course.dataset.credits + "credits)";
      }
      courseInfo.appendChild(creditLabel);

      var descriptionLabel = createElement("label", "descriptionlabel");
      descriptionLabel.innerHTML = "Description";
      courseInfo.appendChild(descriptionLabel);

      arr[i] = courseCopy;
      i++;
    }
  });
  return arr;
}
*/