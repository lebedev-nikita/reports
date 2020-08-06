import updateTest from './test';

const reducer = (state, action) => {
  return {
    test: updateTest(state, action)
  };
};

export default reducer;
