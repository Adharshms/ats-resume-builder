// script.js

document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const loading = document.getElementById("loading");
  const output = document.getElementById("output");
  const resumeDisplay = document.getElementById("resumeDisplay");
  const selectedLayout = document.getElementById("layoutSelector").value;
  const selectedFont = document.getElementById("fontSelector").value;

  loading.classList.remove("hidden");
  output.classList.add("hidden");

  setTimeout(() => {
    loading.classList.add("hidden");
    output.classList.remove("hidden");
    window.scrollTo({ top: output.offsetTop, behavior: 'smooth' });

    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const linkedin = document.getElementById("linkedin").value;
    const portfolio = document.getElementById("portfolio").value;
    const skills = document.getElementById("skills").value;
    const certifications = document.getElementById("certifications").value;
    const summary = document.getElementById("summary").value;
    const experience = document.getElementById("experience").value;
    const education = document.getElementById("education").value;

 
    const reader = new FileReader();

    reader.onloadend = function () {
      const profileImageHTML = profileImageFile
        ? `<img src="${reader.result}" class="profile" alt="Profile Photo" />`
        : "";

      resumeDisplay.innerHTML = `
        <div class="${selectedLayout} font-${selectedFont}">
          ${profileImageHTML}
          <h1>${name}</h1>
          <div class="contact-info">
            <span><strong>${title}</strong></span>
            <span>${email}</span>
            <span>${phone}</span>
            <span>LinkedIn: ${linkedin}</span>
            <span>Portfolio: ${portfolio}</span>
          </div>

          <h2>Summary</h2>
          <p>${summary}</p>

          <h2>Skills</h2>
          <ul>${skills
            .split("\n")
            .map((skill) => `<li>${skill}</li>`)
            .join("")}</ul>

          <h2>Certifications / Projects</h2>
          <p>${certifications}</p>

          <h2>Experience</h2>
          <p>${experience}</p>

          <h2>Education</h2>
          <p>${education}</p>
        </div>
      `;
    };

    if (profileImageFile) {
      reader.readAsDataURL(profileImageFile);
    } else {
      reader.onloadend();
    }
  }, 1000);
});

function downloadAsJPG() {
  const resumeDisplay = document.getElementById("resumeDisplay");
  html2canvas(resumeDisplay, { scale: 2 }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "resume.jpg";
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.click();
  });
}

function downloadAsDocx() {
  const doc = new docx.Document();
  const resumeText = document.getElementById("resumeDisplay").innerText;
  doc.addSection({
    children: [new docx.Paragraph(resumeText)]
  });
  docx.Packer.toBlob(doc).then((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.docx";
    link.click();
  });
}
