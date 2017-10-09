function createElement(tag, attributes, children) {
  const $element = document.createElement(tag)
  for (let key in attributes) {
    $element.setAttribute(key, attributes[key])
  }
  children.forEach(child => {
    child instanceof Node
      ? $element.appendChild(child)
      : $element.appendChild(document.createTextNode(child))
  })
  return $element
}

function renderAddNote() {
  const $addNote = createElement('div', {'class': 'main view'}, [
    createElement('form', {
      'action': '/',
      'method': 'post',
      'id': 'note-add'
    }, [
      createElement('h1', {}, ['Add a Note']),
      createElement('input', {
        'name': 'message',
        'type': 'text',
        'value': 'Type note here'
      }, []),
      createElement('button', {}, ['Add Note'])
    ])
  ])
  return $addNote
}

document.body.appendChild(renderAddNote())
const $main = document.body.querySelector('.main')
console.log($main)
fetch('/notes')
