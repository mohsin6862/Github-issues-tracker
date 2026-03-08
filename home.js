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
// load all issues by fetching api 
const loadIssues = ()=>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data =>{
        displayIssues(data.data)
         displayOpenIssues(data.data);
         displayClosedIssues(data.data);
    })
}

// display all issues 

const displayIssues =(issues)=>{
    const issuesContainer = document.getElementById('issues-card-container')
     issuesContainer.innerHTML=""
    issues.forEach(issue => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML="";

        console.log(issue)
        issueCard.innerHTML =`
         <div class=" bg-white h-[550px] shadow-lg p-8 rounded-lg border-t-6 ${issue.status === "open" ? "border-t-teal-600" : "border-t-purple-600"}">
                <div class="flex justify-between">
                     ${issue.status==="open"? `<img class="border-green-500 bg-slate-200 h-12 w-12 p-2 rounded-full" src="./assets/Open-Status.png" alt=""></img>`  : `<img class="border-purple-500 bg-slate-200 h-12 w-12 p-2 rounded-full"  src="./assets/Closed- Status .png" alt=""></img>`}
                    
                    <div class="badge badge-outline badge-error bg-red-200 ">${issue.priority}</div>
                </div>
                <div class="mt-10">
                    <h1 class="text-xl font-semibold my-4 text-[#1F2937]">${issue.title}</h1>
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
        `
        
        issuesContainer.appendChild(issueCard)
    });


}

// display open issues 
const displayOpenIssues =(issues)=>{
    console.log(issues.length)
    const issuesContainer = document.getElementById('open-issues-card-container')
    issuesContainer.innerHTML=""

    issues
    .filter(issue => issue.status === "open")
    .forEach(issue => {
        console.log(issue.length)

        const issueCard = document.createElement('div');

        issueCard.innerHTML =`
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
        `

        issuesContainer.appendChild(issueCard)
    });
}

// display closed issues 
const displayClosedIssues =(issues)=>{
     console.log(issues.length)
    const issuesContainer = document.getElementById('closed-issues-card-container')
    issuesContainer.innerHTML=""

    issues
    .filter(issue => issue.status === "closed")
    .forEach(issue => {
        console.log(issue.length)
        console.log(issue)

        const issueCard = document.createElement('div');

        issueCard.innerHTML =`
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
        `

        issuesContainer.appendChild(issueCard)
    });

}
loadIssues()
