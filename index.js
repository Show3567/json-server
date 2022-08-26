// console.log("hello from indenx.js")
import { Api } from "./api/api.js";


const View = (() => {
    const domstr = {
      course: "#availbeleCourse"
      
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
              <span>Course type: ${course.required ? 'Cumpolsery' : 'Elective' }</span>
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
    const { getCourse} = api;
  
    class Course{
      constructor(courseName, courseCredit,courseType){
        this.courseCredit = courseCredit
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
    const selectedCourses =[];
    let totalcredit = 0;

    const selectCourse =() =>{

        const ulcontainer = document.querySelector(view.domstr.course);
          ulcontainer.addEventListener("click", (event) => {
            console.log(event.target.className)
            if (event.target.className === "courseItem" && !event.target.classList.contains('selected')) {
            //   console.log(state, event.target.id)
              let course = state.courseList.find(elem => elem.courseId == event.target.id);
              console.log(course)
              if((totalcredit+course.credit) > 18){
                alert("course credit is over 18");
              } else {
                selectedCourses.push(course);
                totalcredit+= course.credit;
                event.target.classList.add('selected');
              }
            }
            console.log(selectedCourses, totalcredit);
        })

    }

    const removeCourse = () =>{
        const ulcontainer = document.querySelector(view.domstr.course);
        ulcontainer.addEventListener("click", (event) => {
            if (event.target.classList.contains('selected') && event.target.classList.contains('courseItem')) {
           
              let course = state.courseList.find(elem => elem.courseId == event.target.id);
                selectedCourses.filter(elem => elem.courseId != course.courseId);
                event.target.classList.remove('selected');
            
            }
            console.log('removing',selectedCourses, totalcredit);
        })
    }
    
    // const deleteTodo = () => {
    //   const ulcontainer = document.querySelector(view.domstr.courseList);
    //   ulcontainer.addEventListener("click", (event) => {
    //     if (event.target.className === "deletebtn") {
    //       state.todolist = state.todolist.filter(
    //         (ele) => +ele.id !== +event.target.id
    //       );
    //     }
    //     model.deleteTodo(event.target.id);
  
    //   });
    // };
  
    // const addTodo = () => {
    //   const inputbox = document.querySelector(view.domstr.inputbox);
    //   inputbox.addEventListener("keyup", event =>{
    //     if(event.code === 'Enter' && event.target.value.trim() !==""){
    //       // console.log(event.target.value);
    //       const newTodo = new model.Todo(event.target.value.trim());
    //       model.addTodo(newTodo).then(todofrombe =>{
    //         state.todolist = [todofrombe, ...state.todolist];
    //       });
    //     }
        
    //   })
    // };
  
    const init = () => {
      model.getCourse().then((course) => {
        console.log(course)
        state.courseList = course;
      });
    };
  
    const bootstrap = () => {
      init();
      removeCourse();
      selectCourse();

    };
    return {
      bootstrap,
    };
  })(Model, View);
  
  Controller.bootstrap();
  