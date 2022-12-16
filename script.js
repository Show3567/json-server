// iife
// fetch()
// arrow function
// abstraction, encapsulation

const Api = (() => {
    const baseUrl = 'http://localhost:4232';
    const todoPath = 'courseList';
  
    const getTodos = () =>
      fetch([baseUrl, todoPath].join('/')).then((response) => response.json());
  
    const deleteTodo = (id) =>
      fetch([baseUrl, todoPath, id].join('/'), {
        method: 'DELETE',
      }); // still need to maintain data deletion in the frontend
  
    const addTodo = (todo) =>
      fetch([baseUrl, todoPath].join('/'), {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-type': 'application/json',
          charset: 'UTF-8',
        },
      }).then((response) => response.json());
  
    return {
      getTodos,
      deleteTodo,
      addTodo,
    };
  })();
  
  const View = (() => {
    const domstr = {
      todocontainer: '#todolist_container',
      inputbox: '.todolist__input',
    };
    // innerHTML
    const createTmp = (arr) => {
      let tmp = '';
      arr.forEach((todo) => {
        tmp += `
        <li>
            <span>${todo.courseId}-${todo.courseName}</span>
            
        </li>
        `;
      });
  
      return tmp;
    };
  
    const render = (ele, tmp) => {
      ele.innerHTML = tmp;
    };
  
    return {
      domstr,
      createTmp,
      render,
    };
  })();
  
  const Model = ((api, view) => {
    const { getTodos, deleteTodo, addTodo } = api;
  
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
      getTodos,
      deleteTodo,
      addTodo,
      State,
      Todo,
    };
  })(Api, View);
  
  const controller = ((model, view) => {
    const state = new model.State();
  
    const init = () => {
      model.getTodos().then((todos) => {
        state.todoList = todos;
      });
    };
  
   
  
    const bootstrap = () => {
      init();
      deleteTodo();
      addTodo();
    };
  
    return { bootstrap };
  })(Model, View);
  controller.bootstrap();
  