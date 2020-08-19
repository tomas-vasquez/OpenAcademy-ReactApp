export default (state = {}, action) => {
  var aux;

  if (action.type === "ADD_COMMENT") {
    //console.log("ADD_COMMENT:", action);

    aux = state;
    let isAlreadyinIndex = aux[action.item_id].comments.findIndex((element) => {
      return action.comment.id === element.id;
    });

    if (isAlreadyinIndex !== -1) {
      aux[action.item_id].comments[isAlreadyinIndex] = action.comment;
    } else {
      aux[action.item_id].comments.push({ ...action.comment });
    }
    return aux;
  } else if (action.type === "SET_LAST_UPDATE") {
    aux = state;
    aux[action.item_id].lastUpdate = action.lastUpdate;
    return aux;
  } else if (action.type === "REPLACE_COMMENTS") {
    //console.log("REPLACE_COMMENTS:", action);
    return { [action.item_id]: action.comments };
  } else if (action.type === "RESET") {
    return {};
  }

  return state;
};
