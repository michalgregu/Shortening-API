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

  const newLink = fetchNewLink()
  console.log(newLink)

})

async function fetchNewLink() {
  const newLinkId = await getNewLink(input.value)
  const newShortLink = `https://rel.ink/${newLinkId}`
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
    .then(json => json.hashid)
}