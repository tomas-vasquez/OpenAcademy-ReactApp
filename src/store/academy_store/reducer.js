const init = {
  courses: null,
  authors: null,
  items: [],
  descriptions: [],
  // stagedCourse: null,
  // stagedItems: [],
};

export default (state = init, action) => {
  if (action.type === "SET_COURSES") {
    let aux2 = state;
    aux2.courses = [...action.data];
    return aux2;
  } else if (action.type === "SET_ITEMS") {
    let aux2 = state;
    aux2.items[action.course_name] = action.items;
    return aux2;
  } else if (action.type === "SET_AUTHORS") {
    let aux2 = state;
    aux2.authors = [...action.data];
    return aux2;
  } else if (action.type === "SET_DESCRIPTION") {
    let aux2 = state;
    aux2.descriptions[action.target] = action.data;
    return aux2;
  }
  //  else if (action.type === "SET_COURSE_STAGED") {
  //   let aux2 = state;
  //   aux2.stagedCourse = action.data;
  //   return aux2;
  // } else if (action.type === "SET_ITEM_TO_STAGED") {
  //   let course_name = action.course_name;

  //   let aux2 = state;
  //   if (aux2.stagedItems[course_name] === undefined) {
  //     aux2.stagedItems[course_name] = [];
  //   }

  //   let isAlreadyinIndex = aux2.stagedItems[course_name].findIndex((item) => {
  //     return action.item.id === item.id;
  //   });
  //   if (isAlreadyinIndex !== -1) {
  //     aux2.stagedItems[course_name][isAlreadyinIndex] = action.item;
  //   } else {
  //     aux2.stagedItems[course_name].push(action.item);
  //   }
  //   return aux2;
  // }

  return state;
};
