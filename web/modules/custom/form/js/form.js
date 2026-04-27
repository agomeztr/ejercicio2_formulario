document.addEventListener("DOMContentLoaded", () => {

    //get the form elements from the main page
    //title
    let title = document.getElementById('title');
    //description
    let description = document.getElementById('description');
    //email
    let email = document.getElementById('email');
    
    //array with categories
    let nameCategories = ['Música', 'Matemáticas', 'Lengua', 'Historia'];
    //get the select from the main page
    let select = document.getElementById('category');
    //foreach to print the options in the select
    nameCategories.forEach(c => {
        //create the element option 
        let option = document.createElement('option');
        option.value = c;
        option.textContent = c;
        select.appendChild(option);
    })

    //array with priority
    let levelPriority = [1, 2, 3, 4, 5];
    //get the div priority from the main page to print stars
    let priority = document.getElementById('priority');
    levelPriority.forEach(p => {
        let button = document.createElement("button");
        button.id  = p;
        button.innerHTML = '<i class="bi bi-star"></i>';
        priority.appendChild(button);
    })
})