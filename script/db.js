var rJson = {
  table: [
    [1, 1, 3, 2, 2],
    [1, 1, 2, 5, 4],
    [1, 1, 2, 2, 2],
    [1, 1, 2, 1, 1, 4],
    [2, 2, 2, 4, 1],
    [1, 1, 2, 2, 4]],
  timeList: [
    "09:15AM",
    "10:10AM",
    "11:05AM",
    "12:00PM",
    "12:55PM",
    "01:45PM",
    "02:35PM",
    "03:25PM",
    "04:15PM",
  ],
  base: {
    "1": {
      name: "sub1",
      code: "SUB101",
      instructor: "Prof.SUB1",
      time: 1,
      color: "#f54251",
    },
    "2": {
      name: "sub2",
      code: "SUB102",
      instructor: "Prof.SUB2",
      time: 1,
      color: "#2a6df4",
    },
    "3": {
      name: "sub3",
      code: "SUB103",
      instructor: "Prof.SUB3",
      time: 1,
      color: "#ffd138",
    },
    "4": {
      name: "sub4",
      code: "SUB104",
      instructor: "Prof.SUB4",
      time: 3,
      color: "#79797c",
    },
    "5": {
      name: "sub5",
      code: "SUB105",
      instructor: "Prof.SUB5",
      time: 1,
      color: "#88c559",
    },
  },
};



const EventBlock = {
  "time_span": 1,
  "subjects": [
  ],
  /*
   *   classType
   *   0-> Normal Class
   *   1-> Lab Class
   *   2-> Notice
   */
  "class_type": 0
}

var sJson = {
  table: [
    [1, 1, 3, 2, 2],
    [1, 1, 2, 5, 4],
    [1, 1, 2, 2, 2],
    [1, 1, 2, 1, 1, 4],
    [2, 2, 2, 4, 1],
    [1, 1, 2, 2, 4]],
  timeList: [
    "555",
    "610",
    "665",
    "720",
    "775",
    "825",
    "875",
    "925",
    "975"
  ]
  ,
  base: {
    "1": {
      "time_span": 1,
      "class_number": 0,
      "subjects": [
        {
          "subject": "Discrete Mathematics",
          "subject_code": "DSC101",
          "teacher": "Prof. Adam K. Lee"
        }
      ],
      "class_type": 0,
      "notice": "Bring your textbook and notebook to class"
    },
    "2": {
      "time_span": 1,
      "class_number": 1,
      "subjects": [
        {
          "subject": "Programming in C",
          "subject_code": "PRG101",
          "teacher": "Prof. Victor M. Smith"
        }
      ],
      "class_type": 0,
      "notice": "Bring your laptop to class"
    },
    "3": {
      "time_span": 1,
      "class_number": 2,
      "subjects": [
        {
          "subject": "Digital Logic",
          "subject_code": "DIG101",
          "teacher": "Prof. James B. Taylor"
        }
      ],
      "class_type": 0,
      "notice": "Bring your logic textbook to class"
    },
    "4": {
      "time_span": 3,
      "class_number": 3,
      "subjects": [
        {
          "subject": "Operating Systems",
          "subject_code": "OS101",
          "teacher": "Prof. Sarah S. Johnson"
        },
        {
          "subject": "Operating Systems",
          "subject_code": "OS101",
          "teacher": "Prof. Sarah S. Johnson"
        }
      ],
      "class_type": 1,
      "notice": "Review chapters 1-3 before class"
    },
    "5": {
      "time_span": 1,
      "class_number": 4,
      "subjects": [
        {
          "subject": "Lunch Break",
          "subject_code": "LB101",
          "teacher": ""
        }
      ],
      "class_type": 2,
      "notice": "Enjoy your lunch!"
    },
    "6": {
      "time_span": 1,
      "class_number": 5,
      "subjects": [
        {
          "subject": "Database Management Systems",
          "subject_code": "DB101",
          "teacher": "Prof. Michael G. Smith"
        }
      ],
      "class_type": 0,
      "notice": "Bring your database textbook to class"
    },
    "7": {
      "time_span": 1,
      "class_number": 6,
      "subjects": [
        {
          "subject": "Computer Networks",
          "subject_code": "CN101",
          "teacher": "Prof. Brian B. Lee"
        }
      ],
      "class_type": 0,
      "notice": "Bring your networking textbook to class"
    },
  },
};
var Json = {
  table: [
    [],
    [],
    [],
    [],
    [],
    []],
  timeList: [
  ]
  ,
  base: {
  },
};
[
  "#b09a11",
  "#5778b3",
  "#fe1a54",
  "#37c729",
  "#b0820c",
  "#a7a321",
  "#5ff094",
  "#d436cb",
  "#b124c3",
  "#6a24aa"
]

function saveToBrowser() {
  localStorage.setItem("sjson", JSON.stringify(sJson));
  localStorage.setItem("color", colorTable.toString());
}

function loadFromBrowser() {
  loadContentToTable(JSON.parse(localStorage.getItem("sjson")),localStorage.getItem("color")?.split(","));
}

function loadContentToTable(json,color=undefined){
  sJson = json;
  subList = sJson["table"];
  timeList = sJson["timeList"];
  test_subs = sJson["base"];
  colorTable =  color || colorTable;
  drawTable();
  onEventSelect();
}