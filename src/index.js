let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toyJsonUrl = "http://localhost:3000/toys"
  fetch(toyJsonUrl)
    .then((resp) => resp.json())
    .then((data) => renderToyCards(data))

})

function renderToyCards(toyInfo) {
  toyInfo.forEach((toyObjs) => {
    let heading = document.createElement('h2')
    let img = document.createElement('img')
    let para = document.createElement('p')
    let btn = document.createElement('button')
    heading.textContent = toyObjs.name
    img.src = toyObjs.image
    img.className = 'toy-avatar'
    para.textContent = `${toyObjs.likes} Likes`
    btn.className = 'like-btn'
    btn.textContent = 'like'
    btn.id = toyObjs.id
    let div = document.createElement('div')
    div.className = 'card'
    document.body.appendChild(div)
    div.append(heading, img, para, btn)

    btn.addEventListener('click', likeButton)

    function likeButton() {
      toyObjs.likes++

      fetch(`http://localhost:3000/toys/${toyObjs.id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toyObjs)
      })
        .then((resp) => resp.json())
        .then((data) => para.textContent = `${toyObjs.likes} Likes`)
    }
  })

}


let form = document.querySelector(".add-toy-form")
console.log(form)

form.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e) {
  e.preventDefault();

  const newJsonObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: '0'
  }

  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newJsonObj)
  })
    .then((resp) => resp.json())
    .then((data) => renderToyCards([data]))

}