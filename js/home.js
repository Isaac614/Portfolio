initialize();

function initialize() {
    initializeBubbles();
    loadProjects();
}

function loadProjects() {
    fetch("js/data/projects.json")
        .then (response => {
            return response.json();
        })
        .then (projects => {
            projects.forEach(project => {
                createProjectCard(project);
            })
            
        })
        .catch(error => console.log(error));
}

function createProjectCard(project) {
    const template = document.createElement("template");
    template.innerHTML = 
    `
    <div class="projectPreview">
        <div class="previewInfo">
            <div class="previewImg">
                <img>
            </div>
            <div class="previewText">
                <h3 class="previewTitle"></h3>
                <p class="previewDescription"></p>
            </div>
        </div>
        <div class="previewTags">
        </div>
    </div>
    `;

    const preview = template.content.querySelector(".projectPreview");
    preview.querySelector("img").src = project.imageUrl
    preview.querySelector(".previewTitle").innerText = project.title;
    preview.querySelector(".previewDescription").innerText = project.description.slice(0, 70) + "...";
    
    const skills = project.skills;
    skills.forEach(skill => {
        const skillHtml = document.createElement("p");
        skillHtml.innerText = skill;
        skillHtml.classList.add("previewTag");
        preview.querySelector(".previewTags").appendChild(skillHtml);
    }) 
    
    document.querySelector(".projectPreviews").appendChild(preview);
}

function initializeBubbles() {
    const bubbleColors = [
        '#4facfe', '#00f2fe', '#f093fb',
        '#764ba2', '#667eea', '#ffffff'
    ];
    const bubbles = document.querySelectorAll(".bubble");
    bubbles.forEach(bubble => {
        
        const dimensions = (Math.random() * (150 - 25) + 25) + "px";
        const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        
        bubble.style.width = dimensions;
        bubble.style.height = dimensions;
        bubble.style.backgroundColor = color;
        
        
        const floatDistance = (Math.random() * (50 - 10) + 10) + "px"
        const floatDelay = (Math.random() * -3) + "s";
        const floatDuration = (Math.random() * (6 - 3) + 3) + "s";
        
        bubble.style.setProperty("--floatDistance", floatDistance);
        bubble.style.setProperty("--floatDelay", floatDelay);
        bubble.style.setProperty("--floatDuration", floatDuration);
    })
}