'use strict'

let act = document.querySelector('#act')
let request = new XMLHttpRequest()
let response
let fragment = document.createDocumentFragment()
let githubURL = 'https://api.github.com/users/priucodes/events?per_page=1'

function addData(data) {
  let date = new Date(data.created_at)
  let formatedDate =
    date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

  let event = data.type.split('Event')[0]
  let repo = data.repo

  let elm = document.createElement('p')
  elm.innerHTML =
    formatedDate +
    ' _> <span class="action">' +
    event +
    '</span> to ' +
    '<a target="_blank" href="https://github.com/' +
    repo.name +
    '">' +
    repo.name +
    '</a>'

  fragment.appendChild(elm)
  act.appendChild(fragment)
}

request.onreadystatechange = function() {
  if (request.status === 200) {
    response = JSON.parse(request.responseText)
    addData(response[0])
  }
}

request.open('GET', githubURL, false)
request.send()
