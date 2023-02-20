const names = ["Phoebe", "Maj", "Elena", "Anne", "Jørgen", "Lars"];
console.log("names", names);

// sort names

names.sort(sortAlphabetically);

function sortAlphabetically(nameA, nameB) {
  if (nameA < nameB) {
    return -1;
  } else if (nameB < nameA) {
    return 1;
  } else {
    return 0;
  }
}

console.log("names sortede", names);

// names.forEach(printNames);

//function printNames(name, index, arr) {
// if (index === 0) {
// console.log("Array: ", arr);
// }
//console.log(`${names} has index number ${index}`);
//}

// sort names by length
//let shortNames = names.filter(removeLongNames);

//function removeLongNames(name) {
// let isLong;
// if (name.length > 5) {
//   return false;
//  } else {
//  isLong = true;
//  }
// return isLong;
// }

//console.log("Short names", shortNames);
