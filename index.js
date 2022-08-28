// console.log("hello from indenx.js")
import { Api } from "./api/api.js";

const View = (() => {
  const domstr = {
    course: "#availbeleCourse",
    button: "#sbtn",
    course2: "#selectedCourse",
  };

  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  const createTmp = (arr) => {
    let tmp = "";

    arr.forEach((course) => {
      tmp += `
            <li class="courseItem" id="${course.courseId}">
              <span class="name">${course.courseName}</span>
              <span>Course type: ${
                course.required ? "Cumpolsery" : "Elective"
              }</span>
              <span>Course credit: ${course.credit}</span>
            </li>
            
          `;
    });

    return tmp;
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

  const selectBtn = () => {
    const button = document.querySelector(view.domstr.button);
    button.addEventListener("click", (event) => {
      if (totalcredit < 18) {
        let lis = document.querySelectorAll("#availbeleCourse li");
        for (let i = 0; i < lis.length; i++) {
          let name = lis[i].getElementsByClassName("name")[0].innerHTML;
          let t = lis[i].innerHtml;
          selectedCourses.forEach((selCourse) => {
            if (selCourse.courseName === name)
              lis[i].parentNode.removeChild(lis[i]);
          });
        }
      }

      const ulcontainer = document.querySelector(view.domstr.course2);
      const tmp = view.createTmp(selectedCourses);
      view.render(ulcontainer, tmp);
    });
  };

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
            return elem.courseId != course.courseId;
          });
          totalcredit -= course.credit;
          event.target.classList.remove("selected");
        } else {
          //   console.log(course);
          // if(totalcredit + course.credit === 12){
          //     alert(`
          //     You have chosen ${totalcredit} credits for semester.
          //     You cannot change once you submit.
          //     Do you want to confirm?`);
          // }
          // else
          if (totalcredit + course.credit > 18) {
            alert("You cannot choose more than 18 credits in one semester!");
          } else {
            selectedCourses.push(course);
            totalcredit += course.credit;
            event.target.classList.add("selected");
            document.getElementById("total").innerHTML = totalcredit;
          }
        }
        const ulcontainer = document.querySelector(view.domstr.course2);
        const tmp = view.createTmp(selectedCourses);
        view.render(ulcontainer, tmp);
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
    selectBtn();
  };
  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
