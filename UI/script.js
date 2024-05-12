function register() {
window.location="register.html"
}
function validate() {
    const input = document.getElementById('floatingInput');
    const password = document.getElementById('floatingPassword');
    if ((input.value === "username" || input.value === "username@gmail.com") && password.value === "password") {
      alert("Login Successful");
      window.location = "Calendar.html";
      event.preventDefault();
      return false;
    } else {
      alert("Invalid Username/Email or Password");
    }
  }
  function register1() {
    var name = document.getElementById('floatingName').value;
    var email = document.getElementById('floatingEmail').value;
    var confirmEmail = document.getElementById('floatingConfirmEmail').value;
    var password = document.getElementById('floatingPassword').value;
    var confirmPassword = document.getElementById('floatingConfirmPassword').value;

    if (!name || !email || !confirmEmail || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (email !== confirmEmail) {
        alert('Emails do not match.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    console.log('Registering:', name, email, password);
    alert('Registration successful!');

}

document.addEventListener('DOMContentLoaded', function() {
  generateCalendar();

  function generateCalendar() {
      const calendar = document.getElementById('calendar');
      calendar.innerHTML = ''; 
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let tableHTML = '<tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr><tr>';
      for (let i = 1; i <= daysInMonth; i++) {
          const day = new Date(year, month, i).getDay();
          if (i === 1) {
              tableHTML += '<td colspan="' + day + '"></td>'; 
          }
          tableHTML += '<td>' + i + '</td>';
          if (day === 6) { 
              tableHTML += '</tr><tr>';
          }
      }
      tableHTML += '</tr>';
      calendar.innerHTML = tableHTML;
  }

  function filterEvents(filter) {
      console.log("Filtering events for: " + filter);
      
  }
});
document.addEventListener('DOMContentLoaded', function() {
    const events = generateRandomEvents();
    generateCalendar(events);

    document.querySelector('select').addEventListener('change', function() {
        generateCalendar(events, this.value);
    });

    function generateCalendar(events, filter = 'all') {
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = ''; 
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let tableHTML = '<tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr><tr>';
        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(year, month, i).getDay();
            if (i === 1) {
                tableHTML += '<td colspan="' + day + '"></td>'; 
            }
            const dayEvents = events.filter(e => e.date.getDate() === i);
            const filteredEvents = dayEvents.filter(e => filter === 'all' || e.type === filter);
            const classList = filteredEvents.map(e => e.type).join(' ');
            tableHTML += `<td class="${classList}">${i}</td>`;
            if (day === 6) { 
                tableHTML += '</tr><tr>';
            }
        }
        tableHTML += '</tr>';
        calendar.innerHTML = tableHTML;
    }

    function generateRandomEvents() {
        const types = ['sunny', 'safelySurfable', 'risky', 'lowSurfers', 'highSurfers', 'eventOn'];
        const events = [];
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            if (Math.random() > 0.5) { 
                events.push({ date: new Date(year, month, i), type: type });
            }
        }
        return events;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const events = generateRandomEvents();
    generateCalendar(events);

    document.querySelector('select').addEventListener('change', function() {
        generateCalendar(events, this.value);
    });

    function generateCalendar(events, filter = 'all') {
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = ''; 
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let tableHTML = '<tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr><tr>';
        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(year, month, i).getDay();
            if (i === 1 && day !== 0) {
                tableHTML += '<td colspan="' + day + '"></td>'; 
            }
            const dayEvents = events.filter(e => e.date.getDate() === i);
            const filteredEvents = dayEvents.filter(e => filter === 'all' || e.type === filter);
            const classList = filteredEvents.map(e => e.type).join(' ');
            tableHTML += `<td class="${classList}" onclick="openModal(${i})">${i}</td>`;
            if (day === 6 && i !== daysInMonth) { 
                tableHTML += '</tr><tr>';
            }
        }
        tableHTML += '</tr>';
        calendar.innerHTML = tableHTML;
    }

    window.openModal = function(day) {
        const modal = document.getElementById('dateModal');
        modal.style.display = 'block';
        document.getElementById('modalDate').innerText = `Date: ${new Date().getFullYear()}-${new Date().getMonth()+1}-${day}`;
        document.getElementById('modalRisk').innerText = 'Risky: High tide, Experienced surfers only.';
        document.getElementById('modalEvents').innerText = 'No events on this day.';
        document.getElementById('modalSurfers').innerText = 'Not many surfers expected.';
        document.getElementById('modalWeather').innerText = 'Weather: Cloudy, Temp expected 11°';
        drawTideGraph();
    }

    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('dateModal').style.display = 'none';
    });

    function generateRandomEvents() {
        const types = ['sunny', 'safelySurfable', 'risky', 'lowSurfers', 'highSurfers', 'eventOn'];
        const events = [];
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            if (Math.random() > 0.5) { 
                events.push({ date: new Date(year, month, i), type: type });
            }
        }
        return events;
    }
});

function drawTideGraph() {
    const ctx = document.getElementById('tideChart').getContext('2d');
    const tideData = [];
    const labels = [];
    for (let hour = 0; hour < 24; hour += 3) {
        tideData.push(Math.floor(Math.random() * 10 + 1));  
        labels.push(`${hour}:00`);
    }


    window.tideChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tide Height (meters)',
                data: tideData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
