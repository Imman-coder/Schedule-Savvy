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
        "12:55AM",
        "01:45AM",
        "02:35AM",
        "03:25PM",
        "04:15AM",
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
    "start_time": "",
    "end_time": "",
    "class_number": -1,
    "subjects": [
      {
        "subject": "",
        "subject_code": "",
        "teacher": "",
        "teacher_full_name": ""
      }
    ],
    /*
     *   classType
     *   0-> Normal Class
     *   1-> Lab Class
     *   2-> Notice
     *   3-> Info
     */
    "class_type": -1,
    "notice": ""
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
        '555',
        '610', 
        '665', 
        '720', 
        '775', 
        '105', 
        '155', 
        '925', 
        '255',
    ],
    base: {
        "1": {
            "start_time": 540,
            "end_time": 660,
            "class_number": 0,
            "subjects": [
              {
                "subject": "Discrete Mathematics",
                "subject_code": "DSC101",
                "teacher": "AK",
                "teacher_full_name": "Prof. Adam K. Lee"
              }
            ],
            "class_type": 0,
            "notice": "Bring your textbook and notebook to class"
          },
          "2":{
            "start_time": 680,
            "end_time": 800,
            "class_number": 1,
            "subjects": [
              {
                "subject": "Programming in C",
                "subject_code": "PRG101",
                "teacher": "VM",
                "teacher_full_name": "Prof. Victor M. Smith"
              }
            ],
            "class_type": 0,
            "notice": "Bring your laptop to class"
          },
          "3":{
            "start_time": 820,
            "end_time": 940,
            "class_number": 2,
            "subjects": [
              {
                "subject": "Digital Logic",
                "subject_code": "DIG101",
                "teacher": "JB",
                "teacher_full_name": "Prof. James B. Taylor"
              }
            ],
            "class_type": 0,
            "notice": "Bring your logic textbook to class"
          },
          "4":{
            "start_time": 960,
            "end_time": 1020,
            "class_number": 3,
            "subjects": [
              {
                "subject": "Operating Systems",
                "subject_code": "OS101",
                "teacher": "SS",
                "teacher_full_name": "Prof. Sarah S. Johnson"
              }
            ],
            "class_type": 0,
            "notice": "Review chapters 1-3 before class"
          },
          "5":{
            "start_time": 1050,
            "end_time": 1110,
            "class_number": 4,
            "subjects": [
              {
                "subject": "Lunch Break",
                "subject_code": "LB101",
                "teacher": "",
                "teacher_full_name": ""
              }
            ],
            "class_type": 2,
            "notice": "Enjoy your lunch!"
          },
          "6":{
            "start_time": 1130,
            "end_time": 1250,
            "class_number": 5,
            "subjects": [
              {
                "subject": "Database Management Systems",
                "subject_code": "DB101",
                "teacher": "MG",
                "teacher_full_name": "Prof. Michael G. Smith"
              }
            ],
            "class_type": 0,
            "notice": "Bring your database textbook to class"
          },
          "7":{
            "start_time": 1270,
            "end_time": 1390,
            "class_number": 6,
            "subjects": [
              {
                "subject": "Computer Networks",
                "subject_code": "CN101",
                "teacher": "BB",
                "teacher_full_name": "Prof. Brian B. Lee"
              }
            ],
            "class_type": 0,
            "notice": "Bring your networking textbook to class"
          },
    },
};