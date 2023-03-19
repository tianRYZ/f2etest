export const getArray = (num) => {
  if (!Number.isInteger(num)) {
    throw new TypeError('只接受整数类型的参数');
  }
  return [...new Array(num).keys()];
};
