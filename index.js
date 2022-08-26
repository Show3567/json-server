// console.log("hello from indenx.js")
import { Api } from "./api/api.js";

const View = (() => {
  const domstr = {
    course: "#availbeleCourse",
  };

  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  //

  const createTmp = (arr) => {
    let tmp = "";
    
    arr.forEach((course) => {
      tmp += `
          <li class="courseItem" id="${course.courseId}">
              <span>${course.courseName}</span>
              <span>Course type: ${
                course.required ? "Cumpolsery" : "Elective"
              }</span>
              <span>Course credit: ${course.credit}</span>

          </li>
          `;
    });

    
    return (tmp);
  };

  return {
    render,
    domstr,
    createTmp,
  };
})();

//**============== Model=============== */
const Model = ((api, view) => {
  const { getCourse } = api;

  class Course {
    constructor(courseName, courseCredit, courseType) {
      this.courseCredit = courseCredit;
      this.courseName = courseName;
      this.courseType = courseType;
    }
  }

  class State {
    #courseList = [];

    get courseList() {
      return this.#courseList;
    }
    set courseList(newlist) {
      this.#courseList = [...newlist];

      const ulcontainer = document.querySelector(view.domstr.course);
      const tmp = view.createTmp(this.#courseList);
      view.render(ulcontainer, tmp);
    }
  }

  return {
    getCourse,
    State,
  };
})(Api, View);

//** =========Controller=============== */

const Controller = ((model, view) => {
  const state = new model.State();
  let selectedCourses = [];
  let totalcredit = 0;

  const selectCourse = () => {
    const ulcontainer = document.querySelector(view.domstr.course);
    ulcontainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("courseItem")) {
        let classList = event.target.classList;
        let course = state.courseList.find(
          (elem) => elem.courseId == event.target.id
        );

        if (classList.contains("selected")) {
          selectedCourses = selectedCourses.filter((elem) => {
            console.log(elem.courseId, course.courseId);
            return elem.courseId != course.courseId;
          });
          console.log(selectedCourses);
          totalcredit -= course.credit;
          event.target.classList.remove("selected");
        } else {
          console.log(course);
          if (totalcredit + course.credit > 18) {
            alert("course credit is over 18");
          } else {
            selectedCourses.push(course);
            totalcredit += course.credit;
            event.target.classList.add("selected");
          }
        }

        console.log(selectedCourses, totalcredit);
      }
    });
  };

  const init = () => {
    model.getCourse().then((course) => {
      console.log(course);
      state.courseList = course;
    });
  };

  const bootstrap = () => {
    init();
    selectCourse();
  };
  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
