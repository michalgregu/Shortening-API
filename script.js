const input = document.querySelector('#input')
const submit = document.querySelector('#submit')
const error = document.querySelector('#error')

submit.addEventListener('click', e => {
  e.preventDefault()

  if (input.value === '') {
    error.style.display = 'inline'
    input.style.border = '2px solid hsl(0, 87%, 67%)'
    return
  }
  error.style.display = 'none'
  input.style.border = 'none'

  fetchNewLink()
})

async function fetchNewLink() {

  let newLinkJson = await postLink(input.value)


  let newLink = await getShortLink(newLinkJson)
  console.log(newLink)
}

function postLink(input) {
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
    .then(json => json)
}

function getShortLink(response) {
  return fetch('https://rel.ink/api/links/' + response.hashid)
    .then(result => result.json())
    .then(newLink => newLink)
}