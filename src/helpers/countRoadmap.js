//get the count of everything in the passed in requests array that has that status

export default function countRoadmap(array, status) {
  let count = 0;
  for (let i = 0, n = array.length; i < n; i++) {
    if (array[i].status == status) {
      count++;
    }
  }
  return count;
}
