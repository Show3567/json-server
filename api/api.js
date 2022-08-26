export const Api = (() => {
    const baseUrl = "http://localhost:4232/courseList";
    
    const getCourse = () =>
      fetch([baseUrl]).then((response) => response.json());
  
    // const deleteTodo = (id) =>
    //   fetch([baseUrl, todospath, id].join("/"), {
    //     method: "DELETE",
    //   });
    // const addTodo = (newTodo) =>
    //   fetch([baseUrl, todospath].join("/"), {
    //     method: "POST",
    //     body: JSON.stringify(newTodo),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   }).then((response) => response.json());
  
    return {
     getCourse
    };
  })();