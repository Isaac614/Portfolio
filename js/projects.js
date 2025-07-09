import { projectInfo } from "./components/projectInfo.js";

initialize();
// openModal(new projectInfo("Title", "lorem ipsum", "images/sudoku-solver.png", "#", "#", "#", true));

function initialize() {
    // Get container element
    const container = document.querySelector(".projects");
    
    // for (let i = 0; i < 3; i++) {
    //     const project = new projectInfo("Reminders", "lorem ipsum", "https://placehold.co/400", "none", "N/A");
    // }
    
    
    
    fetch("js/data/projects.json")
        .then (response => {
            return response.json();
        })
        .then (projects => {
            let left = true;
            projects.forEach(project => {
                const p = new projectInfo(
                    project.title,
                    project.description,
                    project.imageUrl,
                    project.imageAlt,
                    project.github,
                    project.demo,
                    project.hasDemo
                )
                const projectCard = CreateProjectCard(p, left);
                container.appendChild(projectCard);
                left = !left;
            })
        })
        .catch(error => console.log(error));
}


function CreateProjectCard(projectInfo, left)
{
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = 
        `<div>
            <img class="project-img">
            <h1 class="project-name"></h1>
            <p class="project-description"></p>
            <a class="button" target="_blank">GitHub</a>
            <a class="button" target="_blank">Demo</a>
        </div>`
    const projectCard = tempDiv.querySelector("div");
    
    projectCard.classList.add(left ? "project-box-left" : "project-box-right");
    projectCard.querySelector('img').src = projectInfo.imageUrl;
    projectCard.querySelector('img').alt = `Image of ${projectInfo.title}`;
    projectCard.querySelector("h1").innerText = projectInfo.title;
    projectCard.querySelector('p').innerText = projectInfo.description;
    
    const buttons = projectCard.querySelectorAll(".button");
    buttons[0].href = projectInfo.github;
    buttons[1].href = projectInfo.demo;
    
    if (!projectInfo.hasDemo) {
        projectCard.removeChild(buttons[1]);
    }
    projectCard.addEventListener("click", () => {
        createModal(projectInfo);//new projectInfo("Title", "lorem ipsum", "images/sudoku-solver.png", "#", "#", "#", true));
    });
    return projectCard;
}

function createModal(projectInfo) {
    const left = true;
    const template = document.createElement("dialog");
    template.innerHTML =
        `<div>
            <img class="project-img">
            <h1 class="project-name"></h1>
            <p class="project-description"></p>
            <a class="button" target="_blank">GitHub</a>
            <a class="button" target="_blank">Demo</a>
        </div>`
    const projectCard = template.querySelector("div");

    projectCard.classList.add(left ? "project-box-left" : "project-box-right");
    projectCard.querySelector('img').src = projectInfo.imageUrl;
    projectCard.querySelector('img').alt = `Image of ${projectInfo.title}`;
    projectCard.querySelector("h1").innerText = projectInfo.title;
    projectCard.querySelector('p').innerText = projectInfo.description;

    const buttons = projectCard.querySelectorAll(".button");
    buttons[0].href = projectInfo.github;
    buttons[1].href = projectInfo.demo;

    if (!projectInfo.hasDemo) {
        projectCard.removeChild(buttons[1]);
    }
    
    
    document.querySelector("main").appendChild(template);
    template.showModal();
}
