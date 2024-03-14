import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/doctor-images/`;

export const doctors = [
  {
    image: imageUrl + "1.jpg",
    name: "Dr.Amira Ahmed",
    department: "Cardiology",
    specialization: "Heart Health",
    degree: "MD",
    price: 320,
    mobile: "01098765432",
    email: "drahmedhassan@example.com",
    description:
      "Dr.Amira Ahmed is a skilled cardiologist specializing in heart health. With a Doctor of Medicine (MD) degree, he brings expertise in diagnosing and treating cardiovascular conditions. Dr. Hassan joined our medical team on August 22, 2017, and has been a key contributor to our cardiology department.",
    additionalInfo:
      "Dr. Ahmed is passionate about promoting heart-healthy lifestyles and preventive cardiology. He actively engages in research to contribute to advancements in cardiovascular medicine. Dr. Ahmed Hassan is dedicated to providing personalized care to his patients, focusing on both prevention and treatment.",
    joiningDate: "08/22/2017",
  },
  {
    image: imageUrl + "10.jpg",
    name: "Dr.Mohamed Hassan",
    department: "Dermatology",
    specialization: "Skin Care",
    degree: "DO",
    price: 200,
    mobile: "01055556666",
    email: "drhassan@example.com",
    description:
      "Dr.Mohamed Hassan is a dermatologist specializing in skin care. With a Doctor of Osteopathic Medicine (DO) degree, she provides expert care for various dermatological conditions. Dr. Abdelaziz joined our medical team on October 10, 2019, and has been a valued member of our dermatology department.",
    additionalInfo:
      "Dr. Hassan is dedicated to promoting skin health and beauty. She believes in a holistic approach to dermatology, considering both medical and cosmetic aspects. Dr. Leila Abdelaziz actively participates in community events to educate the public about skin care and dermatological wellness.",

    joiningDate: "08/22/2017",
  },
  {
    image: imageUrl + "4.png",
    name: "Dr.Ziad Mehreb",
    department: "Neurology",
    specialization: "Brain Health",
    degree: "MD",
    price: 350,
    mobile: "01111223344",
    email: "drziad@example.com",
    description:
      "Dr.Ziad Mehreb is a highly skilled neurologist specializing in the diagnosis and treatment of neurological disorders. With a Doctor of Medicine (MD) degree, he brings extensive experience in managing various neurological conditions. Dr. Ahmed joined our medical team on November 8, 2018, and has been a key member of our neurology department.",
    additionalInfo:
      "Dr.Mehreb is dedicated to providing comprehensive and compassionate care for patients with neurological challenges. He actively engages in ongoing education to stay updated on the latest advancements in neurology. Dr. Karim Ahmed is committed to improving the quality of life for individuals affected by neurological disorders.",

    joiningDate: "03/10/2019",
  },
  {
    image: imageUrl + "14.png",
    name: "Dr.Ahmed El-Masry",
    department: "Pediatrics",
    specialization: "Child Neurology",
    degree: "MD",
    price: 250,
    mobile: "01012345678",
    email: "drelmasry@example.com",
    description:
      "Dr. Ahmed El-Masry is a skilled pediatric neurologist specializing in child neurology. With a Doctor of Medicine (MD) degree, he brings expertise in diagnosing and treating neurological conditions in children. Dr. El-Masry joined our medical team on March 5, 2017, and has been a key contributor to our pediatric neurology department.",
    additionalInfo:
      "Dr. El-Masry is passionate about providing specialized care for children with neurological disorders. He actively engages in research to advance the understanding of pediatric neurology. Dr. Ahmed El-Masry is committed to improving the quality of life for young patients with neurological challenges.",
    joiningDate: "11/05/2015",
  },
  {
    image: imageUrl + "6.jpg",
    name: "Dr.Yasmine Abdelaziz",
    department: "Ophthalmology",
    specialization: "Eye Care",
    degree: "OD",
    price: 250,
    mobile: "01098765432",
    email: "dryasmine@example.com",
    description:
      "Dr.Yasmine Abdelaziz is an optometrist specializing in eye care. With a Doctor of Optometry (OD) degree, she provides expert vision care services. Dr. Hassan joined our medical team on July 18, 2020, and has been a valuable member of our ophthalmology department.",
    additionalInfo:
      "Dr.Abdelaziz is dedicated to preserving and enhancing vision for her patients. She actively engages in community eye health programs to raise awareness about vision care. Dr. Laila Hassan is committed to providing personalized and comprehensive eye care services.",

    joiningDate: "07/18/2020",
  },
  {
    image: imageUrl + "12.jpg",
    name: "Dr.Kareem Samy",
    department: "Gastroenterology",
    specialization: "Digestive Health",
    degree: "MD",
    price: 320,
    mobile: "01122334455",
    email: "drkareem@example.com",
    description:
      "Dr. Kareem Samy is a gastroenterologist specializing in digestive health. With a Doctor of Medicine (MD) degree, he brings expertise in diagnosing and treating gastrointestinal conditions. Dr. Samy joined our medical team on February 14, 2016, and has been a key member of our gastroenterology department.",
    additionalInfo:
      "Dr. Samy is dedicated to providing compassionate care for patients with digestive disorders. He actively engages in continuing education to stay updated on the latest advancements in gastroenterology. Dr. Karim Samy is committed to promoting digestive health through personalized treatment plans.",

    joiningDate: "02/14/2016",
  },
  {
    image: imageUrl + "8.png",
    name: "Dr.Leila Ahmed",
    department: "Family Medicine",
    specialization: "Primary Care",
    degree: "MD",
    price: 200,
    mobile: "01099887766",
    email: "drleila@example.com",
    description:
      "Dr. Leila Ahmed is a family medicine physician specializing in primary care. With a Doctor of Medicine (MD) degree, she provides comprehensive health services for individuals and families. Dr. Ahmed joined our medical team on August 14, 2020, and has been a valuable member of our family medicine department.",
    additionalInfo:
      "Dr. Ahmed is dedicated to promoting overall health and preventive medicine for individuals and families. She actively engages in community health initiatives to educate the public about maintaining a healthy lifestyle. Dr. Leila Ahmed is committed to providing personalized and compassionate care for her patients.",
    joiningDate: "08/14/2020",
  },
  {
    image: imageUrl + "9.png",
    name: "Dr.Tamer Mohamed",
    department: "Endocrinology",
    specialization: "Hormone Health",
    degree: "MD",
    price: 300,
    mobile: "01199887766",
    email: "drtamer@example.com",
    description:
      "Dr. Tamer Mohamed is an endocrinologist specializing in hormone health. With a Doctor of Medicine (MD) degree, he brings expertise in diagnosing and treating endocrine disorders. Dr. Mohamed joined our medical team on April 3, 2018, and has been a valuable member of our endocrinology department.",
    additionalInfo:
      "Dr. Mohamed is dedicated to improving hormone health and overall well-being. He actively engages in community education programs to raise awareness about endocrine health. Dr. Tamer Mohamed is committed to providing personalized and comprehensive care for patients with endocrine disorders.",

    joiningDate: "04/03/2018",
  },
  {
    image: imageUrl + "2.png",
    name: "Dr.Hana Ali",
    department: "Pulmonology",
    specialization: "Respiratory Health",
    degree: "MD",
    price: 270,
    mobile: "01055443322",
    email: "drhana@example.com",
    description:
      "Dr. Hana Ali is a pulmonologist specializing in respiratory health. With a Doctor of Medicine (MD) degree, she provides expert care for patients with pulmonary conditions. Dr. Ali joined our medical team on October 12, 2019, and has been a valuable member of our pulmonology department.",
    additionalInfo:
      "Dr. Ali is passionate about improving respiratory health and lung function. She actively engages in research to contribute to advancements in pulmonology. Dr. Hana Ali is dedicated to providing personalized care, focusing on both prevention and treatment of respiratory conditions.",

    joiningDate: "10/12/2019",
  },
  {
    image: imageUrl + "11.jpg",
    name: "Dr.Karim Samir",
    department: "Oncology",
    specialization: "Cancer Care",
    degree: "MD",
    price: 350,
    mobile: "01098765432",
    email: "drkarim@example.com",
    description:
      "Dr.Karim Samir is an oncologist specializing in cancer care. With a Doctor of Medicine (MD) degree, she provides comprehensive care for individuals with cancer. Dr. Salah joined our medical team on August 22, 2017, and has been a key contributor to our oncology department.",
    additionalInfo:
      "Dr.Samir is dedicated to providing compassionate care and support for cancer patients and their families. She actively engages in community awareness programs to promote early detection and cancer prevention. Dr. Amira Salah is committed to advancing cancer care through research and personalized treatment plans.",
    joiningDate: "08/22/2017",
  },
  {
    image: imageUrl + "5.png",
    name: "Dr.Salma Ahmed",
    department: "Rheumatology",
    specialization: "Joint Health",
    degree: "MD",
    price: 250,
    mobile: "01099887766",
    email: "drsalma@example.com",
    description:
      "Dr. Salma Ahmed is a rheumatologist specializing in joint health. With a Doctor of Medicine (MD) degree, she provides expert care for patients with rheumatic conditions. Dr. Ahmed joined our medical team on January 8, 2017, and has been a valuable member of our rheumatology department.",
    additionalInfo:
      "Dr. Ahmed is dedicated to improving joint health and quality of life for patients with rheumatic disorders. She actively participates in research to contribute to advancements in rheumatology. Dr. Salma Ahmed is committed to providing personalized and compassionate care for her patients.",

    joiningDate: "01/08/2017",
  },
  {
    image: imageUrl + "13.png",
    name: "Dr.Adel Mohamed",
    department: "Dentistry",
    specialization: "Oral Health",
    degree: "DDS",
    price: 180,
    mobile: "01122334455",
    email: "dradel@example.com",
    description:
      "Dr. Adel Mohamed is a dentist specializing in oral health. With a Doctor of Dental Surgery (DDS) degree, he provides expert care for various dental conditions. Dr. Mohamed joined our medical team on August 14, 2020, and has been a valuable member of our dentistry department.",
    additionalInfo:
      "Dr. Mohamed is dedicated to promoting oral health and ensuring a bright smile for his patients. He actively engages in community outreach programs to educate the public about dental care. Dr. Adel Mohamed is committed to providing personalized and comprehensive dental services.",

    joiningDate: "08/14/2020",
  },
  {
    image: imageUrl + "3.png",
    name: "Dr. Yara Mostafa",
    department: "Hematology",
    specialization: "Blood Health",
    degree: "MD",
    price: 320,
    mobile: "01234567890",
    email: "dryara@example.com",
    description:
      "Dr. Yara Mostafa is a hematologist specializing in blood health. With a Doctor of Medicine (MD) degree, she provides expert care for various hematological conditions. Dr. Mostafa joined our medical team on February 14, 2016, and has been a valuable member of our hematology department.",
    additionalInfo:
      "Dr. Mostafa is dedicated to improving blood health and quality of life for patients with hematological disorders. She actively engages in research to contribute to advancements in hematology. Dr. Yara Mostafa is committed to providing personalized and comprehensive care for individuals with blood-related concerns.",
    joiningDate: "02/14/2016",
  },
  {
    image: imageUrl + "15.png",
    name: "Dr.Ahmed Ragab",
    department: "Urology",
    specialization: "Urinary Health",
    degree: "MD",
    price: 250,
    mobile: "01188776655",
    email: "drahmed@example.com",
    description:
      "Dr.Ahmed Ragab is a urologist specializing in urinary health. With a Doctor of Medicine (MD) degree, he provides expert care for various urological conditions. Dr. Samir joined our medical team on June 15, 2018, and has been a valuable member of our urology department.",
    additionalInfo:
      "Ragab is dedicated to improving urinary health and quality of life for his patients. He actively participates in research to contribute to advancements in urology. Dr. Mahmoud Samir is committed to providing personalized and comprehensive care for individuals with urological concerns.",

    joiningDate: "09/22/2019",
  },
  {
    image: imageUrl + "7.jpg",
    name: "Dr.Fatma Wilson",
    department: "Orthopedics",
    specialization: "Musculoskeletal",
    degree: "MD",
    price: 250,
    mobile: "01234567890",
    email: "drfatma@example.com",
    description:
      "Dr.Fatma Wilson is an orthopedic surgeon specializing in musculoskeletal health. With a Doctor of Medicine (MD) degree, he provides expert care for various orthopedic conditions. Dr. Ibrahim joined our medical team on February 14, 2016, and has been a key member of our orthopedics department.",
    additionalInfo:
      "Dr.Wilson is dedicated to improving musculoskeletal health and mobility for his patients. He actively engages in research to contribute to advancements in orthopedics. Dr. Youssef Ibrahim is committed to providing personalized and comprehensive care for individuals with orthopedic concerns.",

    joiningDate: "11/30/2016",
  },
];
