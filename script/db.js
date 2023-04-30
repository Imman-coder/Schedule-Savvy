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
  "table": [
    [1, 2, 3, 4, 5, 6],
    [5, 4, 7, 8, 3, 1, 9, 10],
    [4, 8, 7, 1, 3, 11],
    [5, 9, 4, 12, 3, 1, 6, 10],
    [1, 13, 3, 8, 15, 5],
    [15, 5, 6, 8, 3]
  ],
  "timeList": [555, 610, 665, 720, 775, 825, 875, 925, 975],
  "base": {
    "1": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Design Analysis Algorithm",
          "subject_code": "",
          "teacher": "Sikheresh Barik"
        }
      ],
      "class_type": 0
    },
    "2": {
      "time_span": "3",
      "subjects": [
        {
          "subject": "Design Analysis Algorithm",
          "subject_code": "",
          "teacher": "Sikheresh Barik / S G"
        }
      ],
      "class_type": "1"
    },
    "3": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Lunch Break",
          "subject_code": "",
          "teacher": ""
        }
      ],
      "class_type": "2"
    },
    "4": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Java Programming",
          "subject_code": "",
          "teacher": "Mousami Acharya"
        }
      ],
      "class_type": 0
    },
    "5": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Theory Of Computation",
          "subject_code": "",
          "teacher": "Sudeep Gochayat"
        }
      ],
      "class_type": 0
    },
    "6": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Organizational Behavior",
          "subject_code": "",
          "teacher": "Sushant Kuma N"
        }
      ],
      "class_type": 0
    },
    "7": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Discrete Structure",
          "subject_code": "",
          "teacher": "Ranjak Kumar Jati"
        }
      ],
      "class_type": 0
    },
    "8": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Computer Architecture Organization",
          "subject_code": "",
          "teacher": "S T"
        }
      ],
      "class_type": 0
    },
    "9": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Soft Skill",
          "subject_code": "",
          "teacher": "Mamta Banarjee"
        }
      ],
      "class_type": 0
    },
    "10": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Library",
          "subject_code": "",
          "teacher": ""
        }
      ],
      "class_type": "2"
    },
    "11": {
      "time_span": "3",
      "subjects": [
        {
          "subject": "Java Programming",
          "subject_code": "",
          "teacher": "Mousami Acharya / R D"
        }
      ],
      "class_type": "1"
    },
    "12": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Constution Of India",
          "subject_code": "",
          "teacher": "Leena Patnaik"
        }
      ],
      "class_type": 0
    },
    "13": {
      "time_span": "3",
      "subjects": [
        {
          "subject": "M A T",
          "subject_code": "",
          "teacher": "S T / N T"
        }
      ],
      "class_type": "1"
    },
    "14": {
      "time_span": 1,
      "subjects": [],
      "class_type": 0
    },
    "15": {
      "time_span": 1,
      "subjects": [
        {
          "subject": "Discrete Structure",
          "subject_code": "",
          "teacher": "S K"
        }
      ],
      "class_type": 0
    }
  }
}
;
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
  if(localStorage.getItem("sjson")!=undefined)
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