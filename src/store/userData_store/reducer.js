export default (state = null, action) => {
  if (action.type === "SET_USERDATA") {
    return { ...action.data };
  } else if (action.type === "RESET") {
    return null;
  }

  return state;
};
