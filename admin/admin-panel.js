function addCourse() {
    const code = document.getElementById('courseCode').value;
    const name = document.getElementById('courseName').value;
    const credits = document.getElementById('courseCredits').value;

    if (!code || !name || !credits) {
        alert("Please fill in all course fields.");
        return;
    }

    const table = document.getElementById('coursesTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${code}</td>
        <td>${name}</td>
        <td>${credits}</td>
        <td class="action-btns">
            <button>Edit</button>
            <button>Delete</button>
        </td>
    `;

    alert("Course has been added!");
    document.getElementById('courseCode').value = "";
    document.getElementById('courseName').value = "";
    document.getElementById('courseCredits').value = "";
}

function searchStudent() {
    const searchId = document.getElementById('studentSearch').value.trim();

    const students = [
        { id: "2001", name: "Ayesha Rahman", email: "ayesha.rahman@example.com" },
        { id: "2002", name: "Tanvir Hasan", email: "tanvir.hasan@example.com" },
        { id: "2003", name: "Nadia Akter", email: "nadia.akter@example.com" }
    ];

    const enrollments = {
        "2001": [
            { code: "CS101", name: "Introduction to Computer Science", credits: 3 },
            { code: "MATH202", name: "Linear Algebra", credits: 3 }
        ],
        "2002": [
            { code: "PHY301", name: "Physics for Engineers", credits: 4 }
        ],
        "2003": []
    };

    const student = students.find(s => s.id === searchId);

    const studentTbody = document.getElementById('studentTbody');
    const coursesBody = document.getElementById('enrolledCoursesBody');
    const coursesSection = document.getElementById('enrolledCoursesSection');

    if (student) {
        studentTbody.innerHTML = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td class="action-btns">
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        `;

        const enrolledCourses = enrollments[student.id] || [];
        if (enrolledCourses.length > 0) {
            coursesBody.innerHTML = enrolledCourses.map(course => `
                <tr>
                    <td>${course.code}</td>
                    <td>${course.name}</td>
                    <td>${course.credits}</td>
                </tr>
            `).join('');
        } else {
            coursesBody.innerHTML = `<tr><td colspan="3">No enrolled courses found.</td></tr>`;
        }

        coursesSection.style.display = 'block';
    } else {
        studentTbody.innerHTML = `<tr><td colspan="4">Student not found.</td></tr>`;
        coursesBody.innerHTML = "";
        coursesSection.style.display = 'none';
    }
}

function updateSystem() {
    alert("**System has been updated**");
}