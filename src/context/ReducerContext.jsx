const ReducerContext = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: true };
    case "LOGOUT":
      return { user: false };
    default:
      return state;
  }
};
export default ReducerContext;
