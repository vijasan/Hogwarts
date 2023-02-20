"use strict";

const url = "https://petlatkea.dk/2021/hogwarts/students.json";

// Fetch the student data from the URL
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // Define helper function to split full names into parts

    const splitName = (fullName) => {
      const parts = fullName.trim().split(" ");
      const nickName = parts.length > 2 ? parts[1] : "";
      const middleName =
        parts.length > 2 ? parts.slice(1, parts.length - 1).join(" ") : "";
      return {
        firstName:
          parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase(),
        middleName:
          middleName.charAt(0).toUpperCase() +
          middleName.slice(1).toLowerCase(),
        lastName: parts[parts.length - 1].toUpperCase(),
        nickName:
          nickName.charAt(0).toUpperCase() + nickName.slice(1).toLowerCase(),
      };
    };

    // Store the list of students in a variable
    const students = data.map((student) => {
      const { firstName, middleName, lastName, nickName } = splitName(
        student.fullname
      );
      return {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        nickName: nickName,
        house: student.house.toUpperCase(),
      };
    });

    // Store references to the HTML elements we will update
    const studentList = document.getElementById("student-list");
    const sortBy = document.getElementById("sort-by");
    const filterByHouse = document.getElementById("filter-by-house");

    // Define function to update the table with the current list of students
    const updateTable = () => {
      // Clear the current contents of the table body
      studentList.innerHTML = "";

      // Filter the list of students based on the selected house
      const filteredStudents =
        filterByHouse.value === "all"
          ? students
          : students.filter((student) => student.house === filterByHouse.value);

      // Sort the filtered students based on the selected sort option
      const sortedStudents = filteredStudents.sort((a, b) => {
        if (sortBy.value === "first-name") {
          return a.firstName.localeCompare(b.firstName);
        } else if (sortBy.value === "middle-name") {
          return a.middleName.localeCompare(b.middleName);
        } else if (sortBy.value === "last-name") {
          return a.lastName.localeCompare(b.lastName);
        } else {
          return a.house.localeCompare(b.house);
        }
      });

      // Populate the table with the sorted and filtered list of students
      sortedStudents.forEach((student) => {
        const row = document.createElement("tr");
        const firstNameCell = document.createElement("td");
        const middleNameCell = document.createElement("td");
        const lastNameCell = document.createElement("td");
        const nickNameCell = document.createElement("td");
        const houseCell = document.createElement("td");

        firstNameCell.textContent = student.firstName;
        middleNameCell.textContent = student.middleName;
        lastNameCell.textContent = student.lastName;
        nickNameCell.textContent = student.nickName;
        houseCell.textContent = student.house;

        row.appendChild(firstNameCell);
        row.appendChild(middleNameCell);
        row.appendChild(lastNameCell);
        row.appendChild(nickNameCell);
        row.appendChild(houseCell);

        studentList.appendChild(row);
      });
    };

    // Update the table whenever the sort or filter options are changed
    sortBy.addEventListener("change", updateTable);
    filterByHouse.addEventListener("change", updateTable);
    // Populate the table for the first time
    updateTable();
  });
