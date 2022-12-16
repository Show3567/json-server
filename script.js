// iife
// fetch()
// arrow function
// abstraction, encapsulation

const Api = (() => {
    const baseUrl = 'http://localhost:4232';
    const todoPath = 'courseList';
  
    const getCourses = () =>
      fetch([baseUrl, todoPath].join('/')).then((response) => response.json());
  

  
    return {
      getCourses,
  
    };
  })();
  
  const View = (() => {
    const domstr = {
      todocontainer: '#courses_container',
      
    };
    // innerHTML
    
    const createTmp = (arr) => {
      let tmp = '';
      arr.forEach((course) => {
        tmp += `
        <li id=${course.courseId}  class="class-select-box">
            <span>${course.courseName}</span>
            ${course.required?"<div>Compulsory</div>":"<div>Elective</div>"}
            <div id=credits-${course.credit}>Credits: ${course.credit}</div>
            
        </li>
        `;
      });

      

      
  
      return tmp;
    };
    
  
    const render = (ele, tmp) => {
      ele.innerHTML = tmp;
      let counter = 0;

      const myList =  document.querySelectorAll(".class-select-box")
      const counternumber = document.getElementById("counter-number")
      const selected = document.getElementById("selected-courses-container")
      const clickbutton = document.getElementById("confirmselect")
      
      counternumber.innerHTML = counter
    
   
      myList.forEach(el=>{
          el.addEventListener('click', function handleClick(event) {
              
              let getcredits = Number(el.childNodes[5].id.split("-")[1])
              
              if(el.style.backgroundColor === "rgb(173, 216, 230)" && el.id % 2 ===0){
                el.style.backgroundColor = "rgb(221, 239, 221)"
                if(counter != 0) counter-=getcredits
                counternumber.innerHTML = counter
                
              }
              else if(el.style.backgroundColor === "rgb(173, 216, 230)" && el.id % 2 ===1){
                el.style.backgroundColor = "rgb(255, 255, 255)"
                if(counter != 0) counter-=getcredits
                counternumber.innerHTML = counter
                
              }
              else{
                
                el.style.backgroundColor = "#ADD8E6"
                counter+=getcredits
                counternumber.innerHTML = counter
                let newel = el
                
                
              }
            });

            
          
        });

        clickbutton.addEventListener('click', function buttonClick(event){

          if(counter > 0 && counter <= 18){
          alert("You have chosen " + counter + " credits for this semester. You cannot change once you submit. Do you want to confirm?")
          myList.forEach(el=>{
                
                
                if(el.style.backgroundColor === "rgb(173, 216, 230)" ){
                  selected.append(el)
                  
                  if (el.id%2===0){
                    el.style.backgroundColor="rgb(221, 239, 221)"
                  }
                  else if(el.id%2===1){
                    el.style.backgroundColor="rgb(255,255,255)"
                  }

                  

                  
              };

            });
            clickbutton.disabled = true;
  
              
            
          }

          else if(counter > 18){
            alert("You can only choose up to 18 credits in one semester")
          }
          
        
        });        


        

    };
  
    return {
      domstr,
      createTmp,
      render,
    };
  })();
  
  const Model = ((api, view) => {
    const { getCourses} = api;
  
    class Todo {
      constructor(title) {
        this.userId = 2;
        this.title = title;
        this.completed = false;
      }
    }
  
    class State {
      #todoList = [];
      
  
      get todoList() {
        return this.#todoList;
      }
  
      set todoList(newtodoList) {
        this.#todoList = newtodoList;
        const todocontainer = document.querySelector(view.domstr.todocontainer);
  
        const tmp = view.createTmp(this.#todoList);
  
        view.render(todocontainer, tmp);
      }
      

     

    }

    
  
    return {
      getCourses,
    
      State,
      Todo,
    };
  })(Api, View);
  
  const controller = ((model, view) => {
    const state = new model.State();

    

    
       
   

   
  
    const init = () => {
      model.getCourses().then((todos) => {
        state.todoList = todos;
      });
    };

   
  
    const bootstrap = () => {
      init();
     
    };
  
    return { bootstrap };
  })(Model, View);
  controller.bootstrap();
  

