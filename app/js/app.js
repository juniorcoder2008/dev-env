const PROJECTLIST = document.querySelector('#projects .project-list');

const createProject = (name, link, description) => {
     // Create parts of project-container
     const githubIcon = document.createElement('i');
     githubIcon.classList.add('fab');
     githubIcon.classList.add('fa-github');

     const projectTitle = document.createElement('a');
     projectTitle.innerHTML = `<a href="${link}">${name}</a>`;

     const projectDescription = document.createElement('p');
     projectDescription.innerText = description;

     // Create the inside-containers of a project div
     const projectDiv = document.createElement('div');
     projectDiv.classList.add('project');
     
     const projectHeading = document.createElement('div');
     projectHeading.classList.add('heading');

     const projectInformation = document.createElement('div');
     projectInformation.classList.add('info');

     // Append all childs to the different div's
     projectHeading.appendChild(githubIcon);
     projectHeading.appendChild(projectTitle);

     projectInformation.appendChild(projectDescription);

     projectDiv.appendChild(projectHeading);
     projectDiv.appendChild(projectDescription);
};