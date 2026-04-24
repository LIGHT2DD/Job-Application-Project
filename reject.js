// Rejected Jobs Page

let jobs = [];

document.addEventListener("DOMContentLoaded", function () {
  // Fetch jobs data from localStorage
  const jobsData = localStorage.getItem("jobsData");
  if (jobsData) {
    jobs = JSON.parse(jobsData);
  }

  // Update stat cards
  const totalCount = jobs.length;
  const interviewCount = jobs.filter((j) => j.status === "interview").length;
  const rejectedCount = jobs.filter((j) => j.status === "rejected").length;

  const statCards = document.querySelectorAll(
    '[id="title-container"] .shadow-md p.font-semibold',
  );
  if (statCards[0]) statCards[0].textContent = totalCount;
  if (statCards[1]) statCards[1].textContent = interviewCount;
  if (statCards[2]) statCards[2].textContent = rejectedCount;

  // Filter rejected jobs
  const rejectedJobs = jobs.filter((job) => job.status === "rejected");

  // Update job count
  const jobCountText = document.querySelector(
    '[id="view-container"] > div:first-child p',
  );
  if (jobCountText) {
    jobCountText.textContent = `${rejectedJobs.length} Jobs`;
  }

  // Display jobs or "No Jobs Available" message
  const jobContainer = document.querySelector(".job-container");
  const noJobsMessage = document.getElementById("no-jobs-message");

  if (rejectedJobs.length === 0) {
    noJobsMessage.style.display = "block";
    jobContainer.innerHTML = "";
  } else {
    noJobsMessage.style.display = "none";
    jobContainer.innerHTML = rejectedJobs
      .map(
        (job) => `
      <div
        id="${job.id}"
        class="border-white shadow-md rounded-md p-5 gap-2 flex flex-col mb-4"
      >
        <h2 class="font-medium flex flex-col sm:flex-row md:flex-row lg:flex-row sm:justify-between md:justify-between lg:justify-between gap-2">
          ${job.company}
          <button class="btn">
            <span><i class="fa-regular fa-trash-can"></i></span>
          </button>
        </h2>
        <p class="text-[#64748B]">${job.role}</p>
        <p class="text-[#64748B]">${job.location}</p>
        <button class="btn btn-error w-[150px]">
          Rejected
        </button>
        <p class="text-[#323B49]">${job.description}</p>
        <div class="btns flex flex-col sm:flex-row md:flex-row lg:flex-row gap-3">
          <button class="btn btn-soft btn-success rounded-lg">
            Interview
          </button>
          <button class="btn btn-soft btn-error rounded-lg" disabled>
            Rejected
          </button>
        </div>
      </div>
    `,
      )
      .join("");

    // Setup delete buttons
    const deleteButtons = jobContainer.querySelectorAll(".fa-trash-can");
    deleteButtons.forEach((deleteBtn) => {
      deleteBtn.parentElement.parentElement.addEventListener("click", () => {
        const card = deleteBtn.closest("[id$='-job']");
        const jobId = card.id;
        const index = jobs.findIndex((j) => j.id === jobId);
        if (index > -1) {
          jobs.splice(index, 1);
          localStorage.setItem("jobsData", JSON.stringify(jobs));
          card.remove();
          location.reload();
        }
      });
    });

    // Setup interview buttons
    const interviewButtons = jobContainer.querySelectorAll(
      ".btn-soft.btn-success",
    );
    interviewButtons.forEach((interviewBtn) => {
      interviewBtn.addEventListener("click", () => {
        const card = interviewBtn.closest("[id$='-job']");
        const jobId = card.id;
        const job = jobs.find((j) => j.id === jobId);
        if (job) {
          job.status = "interview";
          localStorage.setItem("jobsData", JSON.stringify(jobs));
          card.remove();
          if (jobContainer.children.length === 0) {
            noJobsMessage.style.display = "block";
          }
        }
      });
    });
  }
});
