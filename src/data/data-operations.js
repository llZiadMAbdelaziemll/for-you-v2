// import { add } from "date-fns";

// function fromToday(numDays, withTime = false) {
//   const date = add(new Date(), { days: numDays });
//   if (!withTime) date.setUTCHours(0, 0, 0, 0);
//   return date.toISOString().slice(0, -1);
// }

// export const operations = [
//   // CABIN 001
//   {
//     created_at: fromToday(-20, true),
//     name: "ahmed",
//     doctor: "Dr.marc",
//     diseases: "cancer",
//     report: "take some drugs",
//     date: fromToday(0),
//     doctorId: 1,
//     patientId: 2,
//   },
//   {
//     created_at: fromToday(-33, true),
//     name: "Sara",
//     doctor: "Dr. Johnson",
//     diseases: "cancer",
//     report: "take some drugs",
//     date: fromToday(-23),
//     doctorId: 1,
//     patientId: 3,
//   },
//   {
//     created_at: fromToday(-27, true),
//     name: "John",
//     doctor: "Dr. Williams",
//     diseases: "cancer",
//     report: "take some drugs",
//     date: fromToday(12),
//     doctorId: 1,
//     patientId: 4,
//   },

//   // CABIN 002
//   {
//     created_at: fromToday(-45, true),
//     name: "Emily",

//     doctor: "Dr. Davis",
//     diseases: "cancer",
//     report: "take some drugs",

//     date: fromToday(-45),

//     doctorId: 2,
//     patientId: 5,
//   },
//   {
//     created_at: fromToday(-2, true),
//     name: "Michael",

//     doctor: "Dr. Wilson",
//     diseases: "cancer",
//     report: "take some drugs",

//     date: fromToday(15),

//     doctorId: 2,
//     patientId: 6,
//   },
//   {
//     created_at: fromToday(-5, true),
//     name: "Emma",

//     doctor: "Dr. Smith",
//     diseases: "cancer",
//     report: "take some drugs",

//     date: fromToday(33),

//     doctorId: 2,
//     patientId: 7,
//   },

//   // CABIN 003
//   // {
//   //   created_at: fromToday(-65, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",
//   //   date: "2024-02-12 06:40:08",
//   //   time: "06:38:15",
//   //   doctorId: 3,
//   //   patientId: 8,
//   // },
//   // {
//   //   created_at: fromToday(-2, true),
//   //   name: "Emma",
//   //   gender: "female",
//   //   mobile: "1112223334",
//   //   doctor: "Dr. Smith",
//   //   condition: "moderate",
//   //   email: "emma@example.com",
//   //   date: "2024-02-12 06:40:08",
//   //   time: "06:38:15",
//   //   doctorId: 3,
//   //   patientId: 9,
//   // },

//   // {
//   //   created_at: fromToday(-14, true),
//   //   name: "Emma",
//   //   gender: "female",
//   //   mobile: "1112223334",
//   //   doctor: "Dr. Smith",
//   //   condition: "moderate",
//   //   email: "emma@example.com",
//   //   date: "2024-02-12 06:40:08",
//   //   time: "06:38:15",
//   //   doctorId: 3,
//   //   patientId: 10,
//   // },

//   // // CABIN 004
//   // {
//   //   created_at: fromToday(-30, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 4,
//   //   patientId: 11,
//   // },
//   // {
//   //   created_at: fromToday(-1, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",
//   //   doctorId: 4,
//   //   patientId: 12,
//   // },
//   // {
//   //   created_at: fromToday(-3, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 4,
//   //   patientId: 13,
//   // },

//   // // CABIN 005
//   // {
//   //   created_at: fromToday(0, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 5,
//   //   patientId: 14,
//   // },
//   // {
//   //   created_at: fromToday(-6, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 5,
//   //   patientId: 15,
//   // },
//   // {
//   //   created_at: fromToday(-4, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 5,
//   //   patientId: 16,
//   // },

//   // // CABIN 006
//   // {
//   //   created_at: fromToday(-3, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 6,
//   //   patientId: 17,
//   // },
//   // {
//   //   created_at: fromToday(-16, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",
//   //   doctorId: 6,
//   //   patientId: 18,
//   // },
//   // {
//   //   created_at: fromToday(-18, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 6,
//   //   patientId: 19,
//   // },

//   // // CABIN 007
//   // {
//   //   created_at: fromToday(-2, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 7,
//   //   patientId: 20,
//   // },
//   // {
//   //   created_at: fromToday(-7, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",
//   //   doctorId: 7,
//   //   patientId: 21,
//   // },
//   // {
//   //   created_at: fromToday(-55, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 7,
//   //   patientId: 22,
//   // },

//   // // CABIN 008
//   // {
//   //   created_at: fromToday(-8, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 8,
//   //   patientId: 1,
//   // },
//   // {
//   //   created_at: fromToday(0, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",
//   //   doctorId: 8,
//   //   patientId: 23,
//   // },
//   // {
//   //   created_at: fromToday(-10, true),
//   //   name: "ahmed",
//   //   gender: "male",
//   //   mobile: "1234568979",
//   //   doctor: "Dr.marc",
//   //   condition: "sever",
//   //   email: "kjhgf@gmail.com",

//   //   doctorId: 8,
//   //   patientId: 24,
//   // },
// ];
