const defaultState = () => {
  return {
  };
};

const updateTest = (state, action) => {

  if (state === undefined) {
    return defaultState();
  }

  switch (action.type) {

    case 'TEST_CHANGED':
      return {
        ...state.filters,
        ...action.newTest
      };

    default:
      return state.filters;
  }
};

export default updateTest;
