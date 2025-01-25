const studentsList = [
  {
    surname: 'Иванов',
    name: 'Иван',
    lastname: 'Иванович',
    birthday: new Date(1987, 5, 12),
    studyStart: '2018',
    faculty: 'Математика'
  },
  {
    surname: 'Янина',
    name: 'Яна',
    lastname: 'Яновна',
    birthday: new Date(2002, 2, 2),
    studyStart: '2020',
    faculty: 'Информатика'
  },
  {
    surname: 'Петров',
    name: 'Петр',
    lastname: 'Петрович',
    birthday: new Date(1998, 9, 25),
    studyStart: '2015',
    faculty: 'ИМО'
  },
  {
    surname: 'Жанова',
    name: 'Жанна',
    lastname: 'Жановна',
    birthday: new Date(1976, 11, 10),
    studyStart: '2001',
    faculty: 'Биохимия'
  },
  {
    surname: 'Артуров',
    name: 'Артур',
    lastname: 'Артурович',
    birthday: new Date(2003, 7, 17),
    studyStart: '2023',
    faculty: 'Туризм'
  },
]

let studentsArr = [...studentsList],
    studentsArrCopy = [...studentsArr];

const today = new Date(),
      todayDate = today.getDate(),
      todayMonth = today.getMonth(),
      todayFullYear = today.getFullYear();

const form = document.getElementById('main-form'),
      surnameInput = document.getElementById('surname-input'),
      nameInput = document.getElementById('name-input'),
      lastnameInput = document.getElementById('lastname-input'),
      birthdayInput = document.getElementById('birthday-input'),
      studyStartInput = document.getElementById('studyStart-input'),
      facultyInput = document.getElementById('faculty-input');

let filterForm = document.getElementById('filter-form'),
    filterFIO = document.getElementById('filter-fio'),
    filterFaculty = document.getElementById('filter-faculty'),
    filterStudyStart = document.getElementById('filter-studyStart'),
    filterStudyFinish = document.getElementById('filter-studyFinish');

let studentTable = document.getElementById('tbody'),
    fioThead = document.getElementById('fio-thead'),
    facultyThead = document.getElementById('faculty-thead'),
    birthdayThead = document.getElementById('birthday-thead'),
    studyYearsThead = document.getElementById('studyYears-thead');

  document.querySelectorAll('th.thead-title').forEach(thead => {
  thead.setAttribute('type', 'button');
});

function getStudentItem(studentObj) {

  let studentTr = document.createElement('tr'),
      studentFullName = document.createElement('td'),
      studentFaculty = document.createElement('td'),
      studentBirthData = document.createElement('td'),
      studentStudyYears = document.createElement('td');

  studentTr.classList.add('trow');
  studentFullName.classList.add('tdata');
  studentFaculty.classList.add('tdata');
  studentBirthData.classList.add('tdata');
  studentStudyYears.classList.add('tdata');

  studentFullName.textContent = `${studentObj.surname} ${studentObj.name} ${studentObj.lastname}`;
  studentFaculty.textContent = `${studentObj.faculty}`;

  function getBirthDate() {
    const birthDay = studentObj.birthday.getDate(),
          birthMonth = studentObj.birthday.getMonth(),
          birthYear = studentObj.birthday.getFullYear(),
          birthDate = studentObj.birthday;

    function isYearsOld() {
      let age = todayFullYear - birthDate.getFullYear();

      const hasBirthdayPassed = todayMonth > birthMonth || (todayMonth === birthMonth && todayDate >= birthDay);
      if (!hasBirthdayPassed) {
        age--;
      }

      return age;
    }

    const age = isYearsOld();

    return {
      birthDay,
      birthMonth,
      birthYear,
      age
    };
  }

  // расчет слов лет/год/года для возраста
  function getAgeString(age) {
    let count = age % 100;

    if (count >= 10 && count <= 20) {
      return 'лет';
    } else {
      count = age % 10;
      if (count === 1) {
        return 'год';
      } else if (count >= 2 && count <= 4) {
        return 'года';
      } else {
        return 'лет';
      }
    }
  }

  studentBirthData.textContent = `${getBirthDate().birthDay}.${getBirthDate().birthMonth + 1}.${getBirthDate().birthYear} (${getBirthDate().age} ${getAgeString(getBirthDate().age)})`;

  function getStudyYears() {
    const studyStart = Number(studentObj.studyStart);
    const studyFinish = studyStart + 4;
    let studyCourse = '';

    if (todayFullYear > studyFinish) {
      studyCourse = 'закончил/а';
    } else {
      studyCourse = `${4 - (studyFinish - todayFullYear)} курс`;
    }

    return {
      studyStart,
      studyFinish,
      studyCourse
    }
  }
  studentStudyYears.textContent = `${getStudyYears().studyStart}-${getStudyYears().studyFinish} (${getStudyYears().studyCourse})`;

  studentTr.append(studentFullName);
  studentTr.append(studentFaculty);
  studentTr.append(studentBirthData);
  studentTr.append(studentStudyYears);

  return studentTr;
}

function renderStudentsTable(studentsArray) {
  studentTable.innerHTML = '';

  studentsArray.forEach(studentObj => {

    studentObj.fio = `${studentObj.surname} ${studentObj.name} ${studentObj.lastname}`;
    studentObj.birthYear = studentObj.birthday.getFullYear();
    studentObj.studyFinish = `${parseInt(studentObj.studyStart) + 4}`;

    let newTr = getStudentItem(studentObj);
    studentTable.append(newTr);
  });
}

renderStudentsTable(studentsArr);

function getStudentForm() {

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Валидация --------------------------------------------------
    let errorMessages = [];

    let surnameValue = surnameInput.value.trim(),
        nameValue = nameInput.value.trim(),
        lastnameValue = lastnameInput.value.trim(),
        birthdayValue = birthdayInput.value.trim(),
        studyStartValue = parseInt(studyStartInput.value.trim()),
        facultyValue = facultyInput.value.trim();

    if (surnameValue  === '' || nameValue === '' || lastnameValue === '' || birthdayValue === '' || studyStartValue === '' || facultyValue === '') {
      errorMessages.push("Все поля, помеченные звездочкой (*), обязательны для заполнения.");
    }

    let birthdateDate = new Date(birthdayValue);
    let minBirthdate = new Date("1900-01-01");
    if (isNaN(birthdateDate.getTime()) || birthdateDate > today || birthdateDate < minBirthdate) {
      errorMessages.push("Дата рождения должна быть валидной и в диапазоне от 01.01.1900 до текущей даты.");
    }

    let minStartYear = 2000;
    if (isNaN(studyStartValue) || studyStartValue < minStartYear || studyStartValue > todayFullYear) {
      errorMessages.push("Год начала обучения должен быть в диапазоне от 2000 до текущего года.");
    }

    let errorDiv = document.getElementById('error');

    if (errorMessages.length !== 0) {
      errorDiv.innerHTML = '';
      errorMessages.forEach(errorText => {
        let errEl = document.createElement('p');
        errEl.textContent = errorText
        errorDiv.append(errEl)
      })
    } else {
      // вывод сообщения об успешном добавлении нового студента
      let studentSuccessfullyAdded = document.querySelector('#submit-success');
      studentSuccessfullyAdded.style.visibility = 'visible';
      setTimeout(function() {
        studentSuccessfullyAdded.style.visibility = 'hidden';
      }, 1500);
      addNewStudent();
      document.querySelectorAll('input.main-input').forEach(input => {
        input.value = '';
      })
      errorDiv.textContent = '';
    }
    // Конец валидации -------------------------------------------------------------

    function addNewStudent() {
      let dateInput = new Date(birthdayInput.value).toLocaleDateString();

      function parseDate(dateString) {
        const parts = dateString.split('.'),
              day = parseInt(parts[0], 10),
              month = parseInt(parts[1], 10) - 1,
              year = parseInt(parts[2], 10);
        return {
          day,
          month,
          year
        };
      }

      // Исправление регистра символов в имени
      function correctNameLetterCase(input){
        return input.value
                .trim()
                .charAt(0)
                .toUpperCase()
                + input.value
                  .trim()
                  .slice(1)
                  .toLowerCase();
      }

      newStudentObj = {
        surname: correctNameLetterCase(surnameInput),
        name: correctNameLetterCase(nameInput),
        lastname: correctNameLetterCase(lastnameInput),
        birthday: new Date(parseDate(dateInput).year, parseDate(dateInput).month, parseDate(dateInput).day),
        studyStart: studyStartInput.value.trim(),
        faculty: facultyInput.value
                  .trim()
                  .charAt(0)
                  .toUpperCase()
                  + facultyInput.value
                    .trim()
                    .slice(1)
      }

      studentsArr.push(newStudentObj);
      studentsArrCopy.push(newStudentObj);
      renderStudentsTable(studentsArr);
    }
  })
}

getStudentForm();

let sortColumnFlag = 'fio',
    sortDirFlag = true;

function sortStudentsArr(arr) {

  let style = document.createElement('style');
  document.head.append(style);

  function sortColumn() {
    arr = arr.sort(function(a, b) {
      let sort = a[sortColumnFlag] > b[sortColumnFlag];
      if (sortDirFlag == false) {
        sort = a[sortColumnFlag] < b[sortColumnFlag];
      }
      if (sort) return -1;
    })
  }

  function showCorrectSortArrow(flag) {
    if (flag == true) {
      return style.innerHTML = `
        .thead-title:hover::before {
          border-color: #40404082 transparent;
        }

        .thead-title:hover::after {
          border-color: #404040 transparent;
        }
      `;
    } else {
      return style.innerHTML = `
        .thead-title:hover::before {
          border-color: #404040 transparent;
        }

        .thead-title:hover::after {
          border-color: #40404082 transparent;
        }
      `;
    }
  }

  fioThead.addEventListener('click', function() {
    sortColumnFlag = 'fio';
    showCorrectSortArrow(sortDirFlag);
    sortDirFlag = !sortDirFlag;
    sortColumn();
    renderStudentsTable(arr);
  })

  facultyThead.addEventListener('click', function() {
    sortColumnFlag = 'faculty';
    showCorrectSortArrow(sortDirFlag);
    sortDirFlag = !sortDirFlag;
    sortColumn();
    renderStudentsTable(arr);
  })

  birthdayThead.addEventListener('click', function() {
    sortColumnFlag = 'birthYear';
    showCorrectSortArrow(sortDirFlag);
    sortDirFlag = !sortDirFlag;
    sortColumn();
    renderStudentsTable(arr);
  })

  studyYearsThead.addEventListener('click', function() {
    sortColumnFlag = 'studyStart';
    showCorrectSortArrow(sortDirFlag);
    sortDirFlag = !sortDirFlag;
    sortColumn();
    renderStudentsTable(arr);
  })
}

function filterStudentsArr() {

  function filter(arr, prop, value) {
    return arr.filter(function(student) {
      if (student[prop].includes(value.trim())) return true;
    })
  }

  filterForm.addEventListener('submit', function(e) {
    e.preventDefault();

    document.querySelectorAll('input.filter-input').forEach(input => {
      input.value = '';
    })

    renderStudentsTable(studentsArr);
  })

  function runFilter(prop, inputValue) {

    if (studentsArrCopy.length == 0) {
      studentsArrCopy = [...studentsArr];
      studentsArrCopy = filter(studentsArrCopy, prop, inputValue.value);
      renderStudentsTable(studentsArrCopy);
      sortStudentsArr(studentsArrCopy);
    } else {

      if (filterFIO.value.trim() !== '') {
        studentsArrCopy = filter(studentsArrCopy, prop, inputValue.value);
        renderStudentsTable(studentsArrCopy);
        sortStudentsArr(studentsArrCopy);
      } else {
        renderStudentsTable(studentsArr);
        sortStudentsArr(studentsArrCopy);
      }
    }
  }

  filterFIO.addEventListener('input', function() {
    runFilter('fio', filterFIO);
  })

  filterFaculty.addEventListener('input', function() {
    runFilter('faculty', filterFaculty);
  })

  filterStudyStart.addEventListener('input', function() {
    runFilter('studyStart', filterStudyStart);
  })

  filterStudyFinish.addEventListener('input', function() {
    runFilter('studyFinish', filterStudyFinish);
  })
  sortStudentsArr(studentsArrCopy);
}

filterStudentsArr();
