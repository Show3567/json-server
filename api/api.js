export const Api = (() => {
    const baseUrl = "http://localhost:4232/courseList";
    
    const getCourse = () =>
      fetch([baseUrl]).then((response) => response.json());
  
   
    return {
     getCourse,
    
    };
  })();