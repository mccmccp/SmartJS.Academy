var realTree = {
  value: 4,
  color: 'black',
  left: {
    value: 2,
    color: 'black',
    left: { value: 1, color: 'black' },
    right: { value: 3, color: 'black' }
  },
  right: {
    value: 8,
    color: 'red',
    left: {
      value: 6,
      color: 'black',
      left: { value: 5, color: 'black' },
      right: { value: 7, color: 'black' }
    },
    right: {
      value: 12,
      color: 'black',
      left: {
        value: 10,
        color: 'red',
        left: { value: 9, color: 'black' },
        right: { value: 11, color: 'black' }
      },
      right: {
        value: 14,
        color: 'red',
        left: { value: 13, color: 'black'},
        right: {
          value: 15,
          color: 'black',
          right: { value: 16, color: 'red'},
        }
      }
    }
  }
};

var tree = {
  value: 1,
  color: 'black',
  left: { value: 0, color: 'black'},
  right: {
    value: 3,
    color: 'red',
    left: { value: 2, color: 'black'},
    right: {
      value: 5,
      color: 'red',
      left: { value: 4, color: 'black' },
      right: {
        value: 6,
        color: 'black',
        right: { value: 7, color: 'red'}
      }
    }
  }
};

var demoTree = {
  value: 1,
  left: {
    value:2 ,
    left: {value: 'A'},
    right: {value: 'B'}
  },
  right: {
    value: 3,
    left: {value: 'C'},
    right: {value: 'D'}
  }
};

var treeMy = {
  value: 4,
  color: 'black'
};


