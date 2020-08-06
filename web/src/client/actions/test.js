const testChanged = ({name, test}) => {
  return {
    type: 'TEST_CHANGED',
	test
  };
};

export {
	testChanged
}

