import { projectInfo } from "./components/projectInfo.js";

initialize();

// const projectContainers = document.querySelectorAll('.projectContainer');
// projectContainers.forEach(container => {
//     container.addEventListener("mousemove", (event) => {
//         if (event.currentTarget.className === "projectContainer") {
//             cardTilt(event);
//         }
//        
//     });
//     container.addEventListener("mouseleave", (event) => {
//         if (event.currentTarget.className === "projectContainer") {
//             const project = container.querySelector('.project');
//             project.style.transform = `rotateX(0deg)
//             rotateY(0deg)
//             translateX(0px)
//             translateY(0px)
//             translateZ(0px)`
//         }
//     })
// });


function initialize() {
    const container = document.querySelector(".projects");
    
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
            const projectContainers = document.querySelectorAll(".projectContainer");
            projectContainers.forEach(container => {
                container.addEventListener("mousemove", (event) => {
                    if (event.currentTarget.className === "projectContainer") {
                        cardTilt(event);
                    }

                });
                container.addEventListener("mouseleave", (event) => {
                    if (event.currentTarget.className === "projectContainer") {
                        const project = container.querySelector('.project');
                        project.style.transform = `rotateX(0deg)
            rotateY(0deg)
            translateX(0px)
            translateY(0px)
            translateZ(0px)`
                    }
                })
            });
        })
        .catch(error => console.log(error));
}


function CreateProjectCard(projectInfo, left) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML =
        `
        <div class="projectContainer">
            <div class="project left">
                <div class="projectImage">
                    <img src="" class="project-img">
                </div>
                <div class="projectInfo">
                    <h1 class="project-name"></h1>
                    <p class="project-description"></p>
                    <div class="projectLinks">
                        <a class="button" target="_blank">GitHub</a>
                        <a class="button" target="_blank">Demo</a>
                    </div>
                </div>
            </div>
        </div>`
    const projectCard = tempDiv.querySelector(".project");
    projectCard.classList.add(left ? "left" : "right");
    projectCard.querySelector('img').src = projectInfo.imageUrl;
    projectCard.querySelector('img').alt = `Image of ${projectInfo.title}`;
    projectCard.querySelector("h1").innerText = projectInfo.title;
    projectCard.querySelector('p').innerText = projectInfo.description;

    const buttons = projectCard.querySelectorAll(".button");
    buttons[0].href = projectInfo.github;
    buttons[1].href = projectInfo.demo;

    if (!projectInfo.hasDemo) {
        projectCard.querySelector(".projectInfo").querySelector(".projectLinks").removeChild(buttons[1]);
    }
    projectCard.addEventListener("click", () => {
        createModal(projectInfo);
    });
    return tempDiv.querySelector(".projectContainer");
}

function createModal(projectInfo) {
    const template = document.createElement("dialog");
    template.innerHTML =
        `
            <div class="project">
                <img class="project-img">
                <h1 class="project-name"></h1>
                <p class="project-description"></p>
                <a class="button" target="_blank">GitHub</a>
                <a class="button" target="_blank">Demo</a>
            </div>`
    const projectCard = template.querySelector(".project");
    
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
    document.querySelector(".projects").appendChild(template);
    template.showModal();
}

function cardTilt(event) {
    const card = event.currentTarget.querySelector(".project");
    const container = event.currentTarget;

    // Get container bounds
    const rect = container.getBoundingClientRect();

    // Calculate mouse position relative to container
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const cardWidth = container.offsetWidth;
    const cardHeight = container.offsetHeight;

    const cardCenterX = cardWidth / 2;
    const cardCenterY = cardHeight / 2;

    // Much more subtle rotation range - like in the video
    const rotationRange = 4;
    const percentX = (mouseX - cardCenterX) / cardCenterX;
    const percentY = (mouseY - cardCenterY) / cardCenterY;

    // Clamp values to prevent over-rotation
    const clampedPercentX = Math.max(-1, Math.min(1, percentX));
    const clampedPercentY = Math.max(-1, Math.min(1, percentY));

    const rotationX = -clampedPercentY * rotationRange;
    const rotationY = clampedPercentX * rotationRange;

    // Add subtle translation for more dynamic feel
    const translateX = clampedPercentX * 2;
    const translateY = clampedPercentY * 2;

    card.style.transform = `
        rotateX(${rotationX}deg) 
        rotateY(${rotationY}deg)
        translateX(${translateX}px)
        translateY(${translateY}px)
        translateZ(10px)
    `;
}
