// Handle login
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (data.success) {
    document.getElementById('loginApp').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    loadStudents();
  } else {
    errorMsg.textContent = data.message;
  }
});

// Handle signup
const signupForm = document.getElementById('signupForm');
const signupMsg = document.getElementById('signupMsg');
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  const response = await fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  signupMsg.textContent = data.message;
  if (data.success) {
    signupForm.reset();
  }
});

// Handle adding a student
const studentForm = document.getElementById('studentForm');
studentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const subject = document.getElementById('subject').value;
  const feePaid = document.getElementById('feePaid').value;
  const feeTotal = document.getElementById('feeTotal').value;

  const response = await fetch('http://localhost:5000/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, subject, feePaid, feeTotal }),
  });

  const data = await response.json();

  if (data.success) {
    loadStudents();
    studentForm.reset();
  }
});

// Load students list
async function loadStudents() {
  const response = await fetch('http://localhost:5000/students');
  const students = await response.json();

  const studentListDiv = document.getElementById('studentList');
  studentListDiv.innerHTML = '';

  students.forEach((student) => {
    const studentDiv = document.createElement('div');
    studentDiv.innerHTML = `<strong>${student.name}</strong> - ${student.subject} - Fee Paid: ${student.feePaid} / ${student.feeTotal}`;
    studentListDiv.appendChild(studentDiv);
  });
}

// Generate PDF
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text('Fee Report', 20, 20);
  let y = 30;
  const studentList = document.getElementById('studentList').children;

  Array.from(studentList).forEach((studentDiv) => {
    const text = studentDiv.innerText;
    doc.text(text, 20, y);
    y += 10;
  });

  doc.save('fee_report.pdf');
}

// Logout function
function logout() {
  document.getElementById('loginApp').style.display = 'block';
  document.getElementById('app').style.display = 'none';
}
