const weatherForm = document.querySelector('form')
const MessageOne = document.getElementById('message-one')
const MessageTwo = document.getElementById('message-two')



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = weatherForm.querySelector('input').value

  MessageOne.textContent = "Loading weather..."
  MessageTwo.textContent = ''
  
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        MessageOne.textContent = 'Error: ' + data.error
      } else {
        MessageOne.textContent = data.location
        MessageTwo.textContent = data.forecast
      }
      
    })
  })

})