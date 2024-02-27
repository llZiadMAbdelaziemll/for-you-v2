import { add } from "date-fns";

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export const appointments = [
  // CABIN 001
  {
    created_at: fromToday(-20, true),
    // name: "ahmed",
    gender: "male",
    mobile: "1234568979",
    // doctor: "Dr.marc",
    condition: "sever",
    email: "kjhgf@gmail.com",
    startDate: fromToday(0),
    endDate: fromToday(7),
    isPaid: false,
    doctorId: 1,
    patientId: 1,
  },
  {
    created_at: fromToday(-33, true),
    // name: "Sara",
    gender: "female",
    mobile: "9876543210",
    // doctor: "Dr. Johnson",
    condition: "mild",
    email: "sara@example.com",
    startDate: fromToday(-23),
    endDate: fromToday(-13),
    isPaid: true,
    doctorId: 1,
    patientId: 2,
  },
  {
    created_at: fromToday(-27, true),
    // name: "John",
    gender: "male",
    mobile: "5555555555",
    // doctor: "Dr. Williams",
    condition: "moderate",
    email: "john@example.com",
    startDate: fromToday(12),
    endDate: fromToday(18),
    isPaid: true,
    doctorId: 2,
    patientId: 3,
  },

  // CABIN 002
  {
    created_at: fromToday(-45, true),
    // name: "Emily",
    gender: "female",
    mobile: "9998887776",
    // doctor: "Dr. Davis",
    condition: "severe",
    email: "emily@example.com",
    startDate: fromToday(-45),
    endDate: fromToday(-29),
    isPaid: true,
    doctorId: 2,
    patientId: 4,
  },
  {
    created_at: fromToday(-2, true),
    // name: "Michael",
    gender: "male",
    mobile: "4443332221",
    // doctor: "Dr. Wilson",
    condition: "mild",
    email: "michael@example.com",
    startDate: fromToday(15),
    endDate: fromToday(18),
    isPaid: true,
    doctorId: 3,
    patientId: 5,
  },
  {
    created_at: fromToday(-5, true),
    // name: "Emma",
    gender: "female",
    mobile: "1112223334",
    // doctor: "Dr. Smith",
    condition: "moderate",
    startDate: fromToday(33),
    endDate: fromToday(48),

    isPaid: true,
    doctorId: 3,
    patientId: 6,
  },

  // CABIN 003
  // {
  //   created_at: fromToday(-65, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",
  //   date: "2024-02-12 06:40:08",
  //   time: "06:38:15",
  //   doctorId: 3,
  //   patientId: 8,
  // },
  // {
  //   created_at: fromToday(-2, true),
  //   name: "Emma",
  //   gender: "female",
  //   mobile: "1112223334",
  //   doctor: "Dr. Smith",
  //   condition: "moderate",
  //   email: "emma@example.com",
  //   date: "2024-02-12 06:40:08",
  //   time: "06:38:15",
  //   doctorId: 3,
  //   patientId: 9,
  // },

  // {
  //   created_at: fromToday(-14, true),
  //   name: "Emma",
  //   gender: "female",
  //   mobile: "1112223334",
  //   doctor: "Dr. Smith",
  //   condition: "moderate",
  //   email: "emma@example.com",
  //   date: "2024-02-12 06:40:08",
  //   time: "06:38:15",
  //   doctorId: 3,
  //   patientId: 10,
  // },

  // // CABIN 004
  // {
  //   created_at: fromToday(-30, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 4,
  //   patientId: 11,
  // },
  // {
  //   created_at: fromToday(-1, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",
  //   doctorId: 4,
  //   patientId: 12,
  // },
  // {
  //   created_at: fromToday(-3, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 4,
  //   patientId: 13,
  // },

  // // CABIN 005
  // {
  //   created_at: fromToday(0, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 5,
  //   patientId: 14,
  // },
  // {
  //   created_at: fromToday(-6, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 5,
  //   patientId: 15,
  // },
  // {
  //   created_at: fromToday(-4, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 5,
  //   patientId: 16,
  // },

  // // CABIN 006
  // {
  //   created_at: fromToday(-3, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 6,
  //   patientId: 17,
  // },
  // {
  //   created_at: fromToday(-16, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",
  //   doctorId: 6,
  //   patientId: 18,
  // },
  // {
  //   created_at: fromToday(-18, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 6,
  //   patientId: 19,
  // },

  // // CABIN 007
  // {
  //   created_at: fromToday(-2, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 7,
  //   patientId: 20,
  // },
  // {
  //   created_at: fromToday(-7, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",
  //   doctorId: 7,
  //   patientId: 21,
  // },
  // {
  //   created_at: fromToday(-55, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 7,
  //   patientId: 22,
  // },

  // // CABIN 008
  // {
  //   created_at: fromToday(-8, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 8,
  //   patientId: 1,
  // },
  // {
  //   created_at: fromToday(0, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",
  //   doctorId: 8,
  //   patientId: 23,
  // },
  // {
  //   created_at: fromToday(-10, true),
  //   name: "ahmed",
  //   gender: "male",
  //   mobile: "1234568979",
  //   doctor: "Dr.marc",
  //   condition: "sever",
  //   email: "kjhgf@gmail.com",

  //   doctorId: 8,
  //   patientId: 24,
  // },
];
