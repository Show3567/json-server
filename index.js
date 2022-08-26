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
          <li>
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
     

    };
    return {
      bootstrap,
    };
  })(Model, View);
  
  Controller.bootstrap();
  