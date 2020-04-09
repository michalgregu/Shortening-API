const input = document.querySelector('#input')
const submit = document.querySelector('#submit')
const error = document.querySelector('#error')
const featureWrapper = document.querySelector('.feature-wrapper')
const toggleMenu = document.querySelector('#toggle-menu')
const modalBox = document.querySelector('.modal')

// Fetch new link and create a DOM element
async function createNewLink() {
  const newLink = await getNewLink(input.value)
  createNewLinkDom(newLink)
}

// Fetch new link
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

// Create DOM element
function createNewLinkDom(url) {
  const newDiv = document.createElement('div')
  const oldLink = document.createElement('p')
  const newLink = document.createElement('p')
  const button = document.createElement('button')

  newDiv.classList.add('new-link-wrapper')

  oldLink.classList.add('old-link')
  oldLink.textContent = truncate(input.value, 50)

  newLink.classList.add('new-link')
  newLink.textContent = url

  button.classList.add('link-button')
  button.textContent = 'Copy!'

  newDiv.appendChild(oldLink)
  newDiv.appendChild(newLink)
  newDiv.appendChild(button)
  featureWrapper.appendChild(newDiv)

  button.addEventListener('click', e => {
    button.classList.add('link-button-clicked')
    button.textContent = 'Copied!'

    Clipboard_CopyTo(url)
  })
}

// Copy to clipboard
function Clipboard_CopyTo(value) {
  var tempInput = document.createElement("input");
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

// Shorten the link 
function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
}

// Event listener - link shortener
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

// Event listener - modal box
toggleMenu.addEventListener('click', e => {
  modalBox.classList.toggle('modal-clicked')
})