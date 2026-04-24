// Job Application Tracker JS

// Job data structure
let jobs = [
  {
    id: "first-job",
    company: "Mobile First Corp",
    role: "React Native Developer",
    location: "Remote • Full-time • $130,000 - $175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "not-applied", // not-applied, interview, rejected
  },
  {
    id: "second-job",
    company: "WebFlow Agency",
    role: "Web Designer & Developer",
    location: "Los Angeles, CA • Part-time • $80,000 - $120,000",
    description:
      "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    status: "not-applied",
  },
  {
    id: "third-job",
    company: "DataViz Solutions",
    role: "Data Visualization Specialist",
    location: "Boston, MA • Full-time • $125,000 - $165,000",
    description:
      "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "not-applied",
  },
  {
    id: "fourth-job",
    company: "CloudFirst Inc",
    role: "Backend Developer",
    location: "Seattle, WA • Full-time • $140,000 - $190,000",
    description:
      "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    status: "not-applied",
  },
  {
    id: "fifth-job",
    company: "Innovation Labs",
    role: "UI/UX Engineer",
    location: "Austin, TX • Full-time • $110,000 - $150,000",
    description:
      "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
    status: "not-applied",
  },
  {
    id: "sixth-job",
    company: "MegaCorp Solutions",
    role: "JavaScript Developer",
    location: "New York, NY • Full-time • $130,000 - $170,00",
    description:
      "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
    status: "not-applied",
  },
  {
    id: "seventh-job",
    company: "StartupXYZ",
    role: "Full Stack Engineer",
    location: "Remote • Full-time • $120,000 - $160,000",
    description:
      "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
    status: "not-applied",
  },
  {
    id: "eigth-job",
    company: "TechCorp Industries",
    role: "Senior Frontend Developer",
    location: "San Francisco, CA • Full-time • $130,000 - $175,000",
    description:
      "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
    status: "not-applied",
  },
];

let currentFilter = "all"; // all, interview, rejected

// Show notification
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background-color: ${type === "success" ? "#10B981" : "#EF4444"};
    color: white;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-weight: 500;
    z-index: 9999;
    animation: slideIn 0.3s ease-in-out;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-in-out";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Load jobs from localStorage if they exist, otherwise use default data
function loadJobsData() {
  const jobsData = localStorage.getItem("jobsData");
  if (jobsData) {
    const storedJobs = JSON.parse(jobsData);
    // Update status of existing jobs from localStorage, keep original jobs if missing
    jobs.forEach((job) => {
      const storedJob = storedJobs.find((j) => j.id === job.id);
      if (storedJob) {
        job.status = storedJob.status;
      }
    });
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  loadJobsData();
  setupFilterButtons();
  setupJobCards();
  updateCounts();
  setDefaultFilter();
});

// Set default filter to "All"
function setDefaultFilter() {
  const allBtn = document.querySelector(".btn-primary").parentElement;
  allBtn.querySelector(".btn").classList.add("btn-active");
  currentFilter = "all";
}

// Setup filter buttons
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(
    '[id="view-container"] > div:nth-child(2) .btn',
  );

  console.log("Filter buttons found:", filterButtons.length);

  filterButtons.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      console.log("Button clicked, index:", index);

      // Remove active class from all buttons
      filterButtons.forEach((b) => b.classList.remove("btn-active"));

      // Add active class to clicked button
      btn.classList.add("btn-active");

      // Save jobs to localStorage for separate pages
      localStorage.setItem("jobsData", JSON.stringify(jobs));

      // Set filter and navigate
      if (index === 0) {
        currentFilter = "all";
        filterJobs();
      } else if (index === 1) {
        currentFilter = "interview";
        window.location.href = "interview.html";
      } else if (index === 2) {
        currentFilter = "rejected";
        window.location.href = "reject.html";
      }
    });
  });
}

// Setup job card buttons
function setupJobCards() {
  const jobCards = document.querySelectorAll("[id$='-job']");

  jobCards.forEach((card) => {
    const interviewBtn = card.querySelector(".btn-success");
    const rejectedBtn = card.querySelector(".btn-error");
    const deleteBtn =
      card.querySelector(".fa-trash-can").parentElement.parentElement;
    const statusBtn = card.querySelector(".btn-primary.btn-soft");

    // Interview button
    interviewBtn.addEventListener("click", function () {
      const jobId = card.id;
      const job = jobs.find((j) => j.id === jobId);

      if (job) {
        job.status = "interview";
        updateJobCard(card, job);
        updateCounts();
        filterJobs();
        console.log(`✅ Interview marked for: ${job.company}`);
      }
    });

    // Rejected button
    rejectedBtn.addEventListener("click", function () {
      const jobId = card.id;
      const job = jobs.find((j) => j.id === jobId);

      if (job) {
        job.status = "rejected";
        updateJobCard(card, job);
        updateCounts();
        filterJobs();
        console.log(`❌ Rejected: ${job.company}`);
      }
    });

    // Delete button
    deleteBtn.addEventListener("click", function () {
      const jobId = card.id;
      const job = jobs.find((j) => j.id === jobId);

      if (job) {
        card.style.display = "none";
        console.log(`🗑️ Deleted: ${job.company}`);
      }
    });

    // Status button (for future use - to mark as applied)
    statusBtn.addEventListener("click", function () {
      const jobId = card.id;
      const job = jobs.find((j) => j.id === jobId);

      if (job && job.status === "not-applied") {
        statusBtn.textContent = "Applied";
        statusBtn.classList.remove("btn-primary");
        statusBtn.classList.add("btn-success");
      }
    });
  });
}

// Update job card display
function updateJobCard(card, job) {
  const statusBtn = card.querySelector(".btn-primary.btn-soft, .btn-success");

  if (job.status === "interview") {
    statusBtn.textContent = "Interview";
    statusBtn.classList.remove("btn-primary", "btn-error");
    statusBtn.classList.add("btn-success");
  } else if (job.status === "rejected") {
    statusBtn.textContent = "Rejected";
    statusBtn.classList.remove("btn-primary", "btn-success");
    statusBtn.classList.add("btn-error");
  } else {
    statusBtn.textContent = "Not Applied";
    statusBtn.classList.remove("btn-success", "btn-error");
    statusBtn.classList.add("btn-primary");
  }
}

// Show/hide no jobs message
function showNoJobsMessage(show = true) {
  let noJobsMsg = document.getElementById("no-jobs-message");

  if (show) {
    if (!noJobsMsg) {
      noJobsMsg = document.createElement("div");
      noJobsMsg.id = "no-jobs-message";
      noJobsMsg.style.cssText = `
        text-align: center;
        padding: 40px 20px;
        color: #64748B;
        font-size: 18px;
        font-weight: 500;
        margin-top: 20px;
      `;
      noJobsMsg.textContent = "❌ No Jobs Available";
      const jobContainer = document.querySelector(".job-container");
      if (jobContainer) {
        jobContainer.insertAdjacentElement("afterend", noJobsMsg);
      }
    }
    noJobsMsg.style.display = "block";
  } else if (noJobsMsg) {
    noJobsMsg.style.display = "none";
  }
}

// Filter jobs based on current filter
function filterJobs() {
  const jobCards = document.querySelectorAll("[id$='-job']");
  let visibleCount = 0;

  jobCards.forEach((card) => {
    const jobId = card.id;
    const job = jobs.find((j) => j.id === jobId);

    if (job) {
      if (currentFilter === "all") {
        card.style.display = "block";
        visibleCount++;
      } else if (currentFilter === "interview" && job.status === "interview") {
        card.style.display = "block";
        visibleCount++;
      } else if (currentFilter === "rejected" && job.status === "rejected") {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    }
  });

  // Show/hide no jobs message
  if (visibleCount === 0) {
    showNoJobsMessage(true);
  } else {
    showNoJobsMessage(false);
  }
}

// Update counter displays
function updateCounts() {
  const totalCount = jobs.length;
  const interviewCount = jobs.filter((j) => j.status === "interview").length;
  const rejectedCount = jobs.filter((j) => j.status === "rejected").length;

  // Update stat cards
  const statCards = document.querySelectorAll(
    '[id="title-container"] .shadow-md p.font-semibold',
  );
  if (statCards[0]) statCards[0].textContent = totalCount;
  if (statCards[1]) statCards[1].textContent = interviewCount;
  if (statCards[2]) statCards[2].textContent = rejectedCount;

  // Update available jobs count
  const jobCountText = document.querySelector(
    '[id="view-container"] > div:first-child p',
  );
  if (jobCountText) jobCountText.textContent = `${totalCount} Jobs`;
}
