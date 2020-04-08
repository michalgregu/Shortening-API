const input = document.querySelector('#input')
const submit = document.querySelector('#submit')
const error = document.querySelector('#error')
const featureWrapper = document.querySelector('.feature-wrapper')

async function createNewLink() {
  const newLink = await getNewLink(input.value)
  createNewLinkDom(newLink)
}

function getNewLink(input) {
  return fetch('https://rel.ink/api/links/', {
      method: 'POST',
      body: JSON.stringify({
        url: input
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(json => `https://rel.ink/${json.hashid}`)
}

function createNewLinkDom(url) {
  const newDiv = document.createElement('div')
  const oldLink = document.createElement('p')
  const newLink = document.createElement('p')
  const button = document.createElement('button')

  newDiv.classList.add('new-link-wrapper')

  oldLink.classList.add('old-link')
  oldLink.textContent = input.value

  newLink.classList.add('new-link')
  newLink.textContent = url

  button.classList.add('link-button')
  button.textContent = 'Copy!'

  newDiv.appendChild(oldLink)
  newDiv.appendChild(newLink)
  newDiv.appendChild(button)
  featureWrapper.appendChild(newDiv)
}


// Event listener
submit.addEventListener('click', e => {
  e.preventDefault()

  if (input.value === '') {
    error.style.display = 'inline'
    input.style.border = '2px solid hsl(0, 87%, 67%)'
    return
  }
  error.style.display = 'none'
  input.style.border = 'none'

  createNewLink()
})