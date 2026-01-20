// CSV Upload & Email Extraction
const emailCSV = document.getElementById("emailCSV");
const attachmentInput = document.getElementById("attachment");

emailCSV.addEventListener("change", () => {
  const fr = new FileReader();
  fr.readAsText(emailCSV.files[0]);

  fr.onload = function () {
    const rows = fr.result.split(/\r?\n|\n/).map((row) => row.split(","));

    window.valMail = [];
    let invalNo = 0;

    const valTable = document.querySelector("table#val");
    const invalTable = document.querySelector("table#inval");
    valTable.innerHTML = `<tr><td><h2>Valid Emails: <span id="valcount">0</span></h2></td></tr>`;
    invalTable.innerHTML = `<tr><td><h2>Invalid Emails: <span id="invalCount">0</span></h2></td></tr>`;

    rows.forEach((e) => {
      if (e.join("").trim() === "") return;

      const email = e[0].trim();
      const isValid = isValidEmail(email);
      const rowHtml = e.map((cell) => `<td>${cell}</td>`).join("");

      const rowEl = document.createElement("tr");
      rowEl.innerHTML = rowHtml;

      if (isValid) {
        window.valMail.push(email);
        valTable.appendChild(rowEl);
      } else {
        invalTable.appendChild(rowEl);
        invalNo++;
      }
    });

    document.querySelector("#valcount").textContent = window.valMail.length;
    document.querySelector("#invalCount").textContent = invalNo;
  };
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Email Sending
async function sendEmail() {
  const from = document.getElementById("from").value;
  const subject = document.getElementById("subject").value;
  const body = document.getElementById("msg").value;

  const attachmentFile = attachmentInput.files[0];

  if (!window.valMail || window.valMail.length === 0) {
    alert("No valid emails to send to.");
    return;
  }

  if (attachmentFile) {
    const reader = new FileReader();

    reader.onload = async function () {
      const base64Data = reader.result.split(",")[1]; // Extract base64 string

      for (let email of window.valMail) {
        await sendSMTPMail(from, email, subject, body, {
          name: attachmentFile.name,
          data: base64Data,
        });
      }

      alert(`${window.valMail.length} emails sent with attachment.`);
    };

    reader.readAsDataURL(attachmentFile); // Read as Base64
  } else {
    // No attachment
    for (let email of window.valMail) {
      await sendSMTPMail(from, email, subject, body);
    }

    alert(`${window.valMail.length} emails sent successfully.`);
  }
}

// SMTP Send Helper
function sendSMTPMail(from, to, subject, body, attachment = null) {
  const emailOptions = {
    Host: "smtp.elasticemail.com", // ✅ Use this exactly
    Port: 2525, // ✅ Optional, Elastic supports 2525/587/465
    Username: "rajmalik8382@gmail.com", // ✅ Shown in your screenshot
    Password: "D7A32630C0D10C03FA3FC4BD150FF095A0B3", // 🔐 Insert full password here
    To: to,
    From: "\rajmalik8382@gmail.com", // ✅ Must match your verified sender email
    Subject: subject,
    Body: body,
  };

  if (attachment) {
    emailOptions.Attachments = [attachment];
  }

  return Email.send(emailOptions)
    .then((response) => {
      console.log(`✅ Sent to ${to}: ${response}`);
    })
    .catch((error) => {
      console.error(`❌ Failed to send to ${to}:`, error);
    });
}
