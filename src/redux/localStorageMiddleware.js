const localStorageMiddleware = store => next => action => {
    next(action);
   
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  };
  
  export default localStorageMiddleware;
  