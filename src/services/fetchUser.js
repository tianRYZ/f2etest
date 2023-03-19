export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Krone',
        age: 2222
      });
    }, 1000)
  })
}