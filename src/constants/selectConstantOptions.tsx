export const selectorFrameworkOptions= [
        { value: 'React-Js', label: 'React Js' },
        { value: 'React-Vite', label: 'React Vite' },
        { value: 'Next-Js', label: 'Next Js' },
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'Html', label: 'HTML' },
        { value: 'Java', label: 'Java' },
        { value: 'Python', label: 'Python'},
        { value: 'C++', label: 'C++' },
        { value: 'C', label: 'C' },
        { value: 'Angular', label: 'Angular Js' },
        { value: 'Vue', label: 'Vue' },
         { value: 'Laravel', label: 'Laravel' },
         { value: 'Ruby', label: 'Ruby' },
         { value: 'Flask', label: 'Flask' },
         { value: 'Django', label: 'Django' },
         { value: 'Jquery', label: 'jQuery' },
         { value: 'Express', label: 'Express' },
]
export const selectorGenderOptions= [
        { value: 'Male', label: 'Male' },
        { value: 'Femail', label: 'Femail' },
        { value: 'Others', label: 'Others' }
]

export const selectBloodGroupOptions=[
        { value: 'A+', label: 'a+' },
        { value: 'A-', label: 'a-' },
        { value: 'AB+', label: 'ab+'},
        { value:'AB-', label: 'ab-'},
        { value: 'B+', label: 'b+' },
        { value: 'B-', label: 'b-' },
        { value: 'O+', label: 'o+' },
        { value: 'O-', label: 'o-' },     
]
export const selectPhotoGroupFolderOptions=[
        { value: 'profile', label: 'Profile' },
        { value: 'profile2', label: 'Profile1' },
        { value: 'Profile3', label: 'Profile2'},
         
]
export const selectImageUploadFolderName = [
  "folder11",
  "folder22",
  "folder33",
];

// export const apointmentdaysInWeeks=[
        
//     {value:'SATURDAY TO THURSDAY',label:'SATURDAY TO THURSDAY'},
//      {value:'SUNDAY TO WEDNESDAY',label:'SUNDAY TO WEDNESDAY'},
//      {value:'MONDAY TO THURSDAY',label:'MONDAY TO THURSDAY'},
//      {value:'TUESDAY TO FRIDAY',label:'TUESDAY TO FRIDAY'},
//      {value:'WEDNESDAY TO SATURDAY',label:'WEDNESDAY TO SATURDAY'},
//      {value:'THURSDAY TO SUNDAY',label:'THURSDAY TO SUNDAY'},
//      {value:'FRIDAY TO MONDAY',label:'FRIDAY TO MONDAY'},
//      {value:'7 DAYS',label:'7 DAYS'},
// ]
// export const facultyOptions = [
// 	{
// 		label: 'Engineering',
// 		value: 'engineering',
// 	},
// 	{
// 		label: 'Faculty of science and engineering',
// 		value: 'Faculty of science and engineering',
// 	},
// ]
// export const acDepartmentOptions = [
// 	{
// 		label: 'CSE',
// 		value: 'cse',
// 	},
// 	{
// 		label: 'Software Engineering',
// 		value: 'software engineering',
// 	},
// ]
// export const acSemesterOptions = [
// 	{
// 		label: 'Fall 2023',
// 		value: 'fall23',
// 	},
// 	{
// 		label: 'Autumn 2023',
// 		value: 'autumn2023',
// 	},
// 	{
// 		label: 'Summer 2023',
// 		value: 'summer23',
// 	},
// ]

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthOptions = months.map((month: string) => {
  return {
    label: month,
    value: month,
  };
});

export const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];
export const daysOptions = days.map((day: string) => {
  return {
    label: day,
    value: day,
  };
});

export const semesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];
export enum ExamType {
  FINAL = "FINAL",
  MIDTERM = "MIDTERM",
}