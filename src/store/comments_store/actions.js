export const setComments = (item_id, comments) => ({
  type: "SET_COMMENTS",
  item_id,
  comments,
});

export const addComment = (item_id, comment) => ({
  type: "ADD_COMMENT",
  item_id,
  comment,
});

export const setLastUpdate = (item_id, lastUpdate) => ({
  type: "SET_LAST_UPDATE",
  item_id,
  lastUpdate,
});
