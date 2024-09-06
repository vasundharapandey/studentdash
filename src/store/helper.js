
export const saveToLocalStorage = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  };
  
  export const loadFromLocalStorage = (key) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      console.warn("Could not load from localStorage", e);
      return undefined;
    }
  };
  