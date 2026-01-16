// Sample data for 50 CSE students with mid-term marks
export const generateSampleStudents = () => {
  const firstNames = [
    'Rahul', 'Priya', 'Aditya', 'Anjali', 'Vikram', 'Shreya', 'Arjun', 'Disha',
    'Rohan', 'Neha', 'Karan', 'Pooja', 'Abhishek', 'Isha', 'Nitin', 'Kavya',
    'Mohit', 'Sakshi', 'Akshay', 'Zara', 'Varun', 'Divya', 'Sanjay', 'Riya',
    'Harsh', 'Ananya', 'Ravi', 'Sneha', 'Amit', 'Jiya', 'Aman', 'Shreya',
    'Naveen', 'Priyanka', 'Sumit', 'Vidya', 'Ashish', 'Meera', 'Pawan', 'Simran',
    'Gaurav', 'Nisha', 'Deepak', 'Rani', 'Sushant', 'Seema', 'Manish', 'Tanvi',
    'Yogesh', 'Chandana'
  ];

  const subjects = ['DSA', 'DBMS', 'OS', 'CN', 'COA'];
  const students = [];

  for (let i = 1; i <= 50; i++) {
    const marksObj = {};
    let total = 0;

    subjects.forEach((subject) => {
      // Generate marks between 15-30 (realistic mid-term marks)
      const marks = Math.floor(Math.random() * 16) + 15;
      marksObj[subject] = marks;
      total += marks;
    });

    students.push({
      id: i,
      rollNo: `CSE${String(i).padStart(3, '0')}`,
      name: firstNames[i - 1],
      branch: 'CSE',
      semester: 3,
      subjects: marksObj,
      total: total,
      createdAt: new Date(2024, 0, i).toISOString()
    });
  }

  return students;
};

export const SAMPLE_STUDENTS = generateSampleStudents();
