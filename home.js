// const displaylevels = (arr)=>{
//     console.log(arr)
//     if(!arr || arr.length === 0){
//         return "";
//     }

//     return arr.map(el => console.log(el) `

//         <div class="badge badge-outline badge-error bg-red-200 text-lg p-4">
//             <i class="fa-solid fa-bug"></i> ${el}
//         </div>
//     `).join("");
// }

// get buttons
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

// get containers
const allContainer = document.getElementById("issues-card-container");
const openContainer = document.getElementById("open-issues-card-container");
const closedContainer = document.getElementById("closed-issues-card-container");
const countIssues = document.getElementById("issues");

// Highlight active button
function setActiveButton(activeBtn) {
  [allBtn, openBtn, closedBtn].forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });
  activeBtn.classList.add("btn-primary");
  activeBtn.classList.remove("btn-outline");
}

// Click button to perform
allBtn.addEventListener("click", () => {
  allContainer.classList.remove("hidden");
  openContainer.classList.add("hidden");
  closedContainer.classList.add("hidden");
  // number of all issues
  countIssues.innerText = allContainer.children.length;
  setActiveButton(allBtn);
});

openBtn.addEventListener("click", () => {
  allContainer.classList.add("hidden");
  openContainer.classList.remove("hidden");
  closedContainer.classList.add("hidden");
  // number of open issues
  countIssues.innerText = openContainer.children.length;
  setActiveButton(openBtn);
});

closedBtn.addEventListener("click", () => {
  allContainer.classList.add("hidden");
  openContainer.classList.add("hidden");
  closedContainer.classList.remove("hidden");
  // number of closed issues
  countIssues.innerText = closedContainer.children.length;
  setActiveButton(closedBtn);
});

// Load and display issues
const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const issues = data.data;
      displayIssues(issues);
      displayOpenIssues(issues);
      displayClosedIssues(issues);

      // initial count: show total issues
      countIssues.innerText = issues.length;
    });
};

// Search issues
document.getElementById("search-btn").addEventListener("click", () => {
  const searchText = document.getElementById("search-text").value.trim();
  if (!searchText) return loadIssues();

  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
  )
    .then((res) => res.json())
    .then((data) => {
      const issues = data.data;

      // Update all three containers with search results
      displayIssues(issues);
      displayOpenIssues(issues);
      displayClosedIssues(issues);

      // Update count issues
      if (!allContainer.classList.contains("hidden")) {
        countIssues.innerText = allContainer.children.length;
      } else if (!openContainer.classList.contains("hidden")) {
        countIssues.innerText = openContainer.children.length;
      } else if (!closedContainer.classList.contains("hidden")) {
        countIssues.innerText = closedContainer.children.length;
      }
    });
});

// open modal
const openModal = async (id) => {
  console.log(id);

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  // console.log(details.data);
  diplayModalDetails(details.data);
};

// display modal
const diplayModalDetails = (data) => {
  console.log(data);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";
  const modalDetails = document.createElement("div");
  modalDetails.innerHTML = `
      <h3 class="text-2xl font-bold text-[#1F2937]">${data.title}</h3>
      <div class="flex gap-3 items-center my-5">
      <div class="badge  badge-success bg-green-400 text-lg text-white ">Opened</div>
      <p class="text-lg font-medium text-[#64748B]">opened by ${data.author}</p>
      <p class="text-lg font-medium text-[#64748B]">  ${data.createdAt}</p>
      </div>

       ${
         data.labels?.[0]
           ? `<div class="badge badge-outline badge-error bg-red-200 text-lg p-4">
                <i class="fa-solid fa-bug"></i> ${data.labels[0]}
              </div>`
           : ""
       }

         ${
           data.labels?.[1]
             ? `<div class="badge badge-outline badge-warning bg-orange-200 text-lg p-4">
            <i class="fa-solid fa-life-ring"></i> ${data.labels[1]}
              </div>`
             : ""
         }
  
     <p class="my-4 text-lg font-medium text-[#64748B]">${data.description}</p>
     
             <div class="flex gap-20">
               <div>
            <h3 class="text-lg font-medium text-[#64748B]">Assignee:</h3>
     <h1 class="text-xl font-bold text-[#1F2937]">${data.assignee?data.assignee:"No Assignee"}</h1>
            </div>
         <div>
             <h3 class="text-lg font-medium text-[#64748B]">Priority:</h3>
     <h1 class="text-xl font-bold  badge badge-outline badge-error bg-red-500 text-white p-4">${data.priority}</h1>
         </div>
             </div>
     <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
     `;
  modalContainer.appendChild(modalDetails);
  my_modal_5.showModal();
};
// display all issues

const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-card-container");
  issuesContainer.innerHTML = "";
  issues.forEach((issue) => {
    const issueCard = document.createElement("div");
    issueCard.innerHTML = "";

    // console.log(issue)
    issueCard.innerHTML = `
         <div onclick="openModal(${issue.id})"  class=" bg-white h-[550px] shadow-lg p-8 rounded-lg border-t-6 ${issue.status === "open" ? "border-t-teal-600" : "border-t-purple-600"}">
                <div class="flex justify-between">
                     ${issue.status === "open" ? `<img class="border-green-500 bg-slate-200 h-12 w-12 p-2 rounded-full" src="./assets/Open-Status.png" alt=""></img>` : `<img class="border-purple-500 bg-slate-200 h-12 w-12 p-2 rounded-full"  src="./assets/Closed- Status .png" alt=""></img>`}
                    
                    <div class="badge badge-outline badge-error bg-red-200 ">${issue.priority}</div>
                </div>
                <div class="mt-10">
                    <h1  class="text-xl font-semibold my-4 text-[#1F2937]">${issue.title}</h1>
                <p class="mb-4 text-lg font-medium text-[#64748B]">${issue.description}</p>
              
            
                ${
                  issue.labels?.[0]
                    ? `<div class="badge badge-outline badge-error bg-red-200 text-lg p-4">
                <i class="fa-solid fa-bug"></i> ${issue.labels[0]}
              </div>`
                    : ""
                }

            ${
              issue.labels?.[1]
                ? `<div class="badge badge-outline badge-warning bg-orange-200 text-lg p-4">
            <i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}
              </div>`
                : ""
            }
  


                </div>
                <div class="my-10">
            <hr class=" border-gray-300 my-5">
            <p class="text-lg font-light text-[#64748B] pb-4">${issue.author}</p>
            <p class="text-lg font-light text-[#64748B]">${issue.createdAt}</p>
           </div>
            </div>
        `;

    issuesContainer.appendChild(issueCard);
  });
};

// display open issues
const displayOpenIssues = (issues) => {
  // console.log(issues.length)
  const issuesContainer = document.getElementById("open-issues-card-container");
  issuesContainer.innerHTML = "";

  issues
    .filter((issue) => issue.status === "open")
    .forEach((issue) => {
      // console.log(issue.length)

      const issueCard = document.createElement("div");

      issueCard.innerHTML = `
        <div class="bg-white h-[550px] shadow-lg p-8 rounded-lg border-t-6 border-t-teal-600">

            <div class="flex justify-between">
                <img class="border-green-500 bg-slate-200 h-12 w-12 p-2 rounded-full" src="./assets/Open-Status.png" alt="">

                <div class="badge badge-outline badge-error bg-red-200">
                    ${issue.priority}
                </div>
            </div>

            <div class="mt-10">
                <h1 class="text-xl font-semibold my-4 text-[#1F2937]">
                    ${issue.title}
                </h1>

                <p class="mb-4 text-lg font-medium text-[#64748B]">
                    ${issue.description}
                </p>

                ${
                  issue.labels?.[0]
                    ? `<div class="badge badge-outline badge-error bg-red-200 text-lg p-4">
                        <i class="fa-solid fa-bug"></i> ${issue.labels[0]}
                       </div>`
                    : ""
                }

                ${
                  issue.labels?.[1]
                    ? `<div class="badge badge-outline badge-warning bg-orange-200 text-lg p-4">
                        <i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}
                       </div>`
                    : ""
                }

            </div>

            <div class="my-10">
                <hr class="border-gray-300 my-5">

                <p class="text-lg font-light text-[#64748B] pb-4">
                    ${issue.author}
                </p>

                <p class="text-lg font-light text-[#64748B]">
                    ${issue.createdAt}
                </p>
            </div>

        </div>
        `;

      issuesContainer.appendChild(issueCard);
    });
};

// display closed issues
const displayClosedIssues = (issues) => {
  //  console.log(issues.length)
  const issuesContainer = document.getElementById(
    "closed-issues-card-container",
  );
  issuesContainer.innerHTML = "";

  issues
    .filter((issue) => issue.status === "closed")
    .forEach((issue) => {
      // console.log(issue.length)
      // console.log(issue)

      const issueCard = document.createElement("div");

      issueCard.innerHTML = `
        <div class="bg-white h-[550px] shadow-lg p-8 rounded-lg border-t-6 border-t-purple-600">

            <div class="flex justify-between">
                <img class="border-purple-500 bg-slate-200 h-12 w-12 p-2 rounded-full" src="./assets/Closed- Status .png" alt="">

                <div class="badge badge-outline badge-error bg-red-200">
                    ${issue.priority}
                </div>
            </div>

            <div class="mt-10">
                <h1 class="text-xl font-semibold my-4 text-[#1F2937]">
                    ${issue.title}
                </h1>

                <p class="mb-4 text-lg font-medium text-[#64748B]">
                    ${issue.description}
                </p>

                ${
                  issue.labels?.[0]
                    ? `<div class="badge badge-outline badge-error bg-red-200 text-lg p-4">
                        <i class="fa-solid fa-bug"></i> ${issue.labels[0]}
                       </div>`
                    : ""
                }

                ${
                  issue.labels?.[1]
                    ? `<div class="badge badge-outline badge-warning bg-orange-200 text-lg p-4">
                        <i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}
                       </div>`
                    : ""
                }

            </div>

            <div class="my-10">
                <hr class="border-gray-300 my-5">

                <p class="text-lg font-light text-[#64748B] pb-4">
                    ${issue.author}
                </p>

                <p class="text-lg font-light text-[#64748B]">
                    ${issue.createdAt}
                </p>
            </div>

        </div>
        `;

      issuesContainer.appendChild(issueCard);
    });
};
loadIssues();
