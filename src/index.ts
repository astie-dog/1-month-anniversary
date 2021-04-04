import './index.scss'
import { FRIEND_LIST } from './list'

const container = document.getElementById('js-friends')
const list = document.getElementById('js-list')
const df = document.createDocumentFragment()
const photos: HTMLDivElement[] = []
const userList: HTMLLIElement[] = []

const arrowPrev = document.getElementById('js-prev')
const arrowNext = document.getElementById('js-next')
let currentIndex: number = -1

FRIEND_LIST.forEach((friend, i) => {
  const html = `
    <div class="photostack-number">No.${i + 1}</div>
    <div class="photostack-img">
      <img src="${friend.icon}" alt=""></a>
    </div>
    <div class="photostack-content">
      <h2 class="photostack-title">${friend.username}</h2>
      <div class="photostack-desc"><a href="https://twitter.com/${friend.id}" target="_blank" rel="noopener noreferrer">${friend.id}</a></div>
    </div>
  `
  const div = document.createElement('div')
  div.className = 'photostack'
  div.innerHTML = html

  const close = document.createElement('a')
  close.className = 'close-btn'
  close.innerHTML = '×'
  close.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    changeSelect(-1)
  })
  div.appendChild(close)

  div.style.position = 'absolute'
  updateRandomPosition(div)
  div.addEventListener('click', (e: MouseEvent) => {
    changeSelect(i)
  })
  div.addEventListener('mouseenter', () => {
    changeOrder(i)
  })
  div.setAttribute('data-index', String(FRIEND_LIST.length - i))
  div.style.zIndex = String(FRIEND_LIST.length - i)
  photos.push(div)
  df.appendChild(div)

  const li = document.createElement('li')
  li.className = "username"
  const a = document.createElement('a')
  a.addEventListener('click', (e) => {
    e.preventDefault()
    changeSelect(i)
  })
  a.innerHTML = friend.username
  li.appendChild(a)
  list.appendChild(li)
  userList.push(li)
})
container.appendChild(df)

function changeSelect(index: number) {
  const current = document.querySelector('.photostack.current') as HTMLDivElement
  if (current) {
    current.classList.remove('current')
  }
  const currentUserName = document.querySelector('.username.current') as HTMLDivElement
  if (currentUserName) {
    currentUserName.classList.remove('current')
  }
  photos[index]?.classList.add('current')
  userList[index]?.classList.add('current')
  userList[index]?.scrollIntoView({
    block: 'nearest',
    inline: 'nearest'
  })
  currentIndex = index
  changeOrder(index)
}
function changeOrder(index: number) {
  photos.forEach((photo, i) => {
    if (i === index) {
      photo.setAttribute('data-index', String(photos.length - 1))
      photo.style.zIndex = String(photos.length - 1)
    } else {
      const currentIndex = parseInt(photo.getAttribute('data-index') || '0', 10)
      if (currentIndex > index) {
        photo.setAttribute('data-index', String(currentIndex -1))
        photo.style.zIndex = String(currentIndex -1)
      }
    }
  })
}
function updateRandomPosition(element: HTMLDivElement) {
  const x = Math.floor(Math.random() * 80 + 10)
  const y = Math.floor(Math.random() * 80 + 10)
  const r = Math.floor(Math.random() * 120 - 60)
  element.style.top = y + '%'
  element.style.left = x + '%'
  element.style.transform = `translate(-50%, -50%) rotate(${r}deg) scale(0.4)`
}
function next() {
  if (currentIndex + 1 === photos.length) {
    changeSelect(0)
  } else {
    changeSelect(currentIndex + 1)
  }
}
function prev() {
  if (currentIndex - 1 < 0) {
    changeSelect(photos.length - 1)
  } else {
    changeSelect(currentIndex - 1)
  }
}

arrowNext?.addEventListener('click', () => {
  next()
})

arrowPrev?.addEventListener('click', () => {
  prev()
})
window.addEventListener('keydown', (e: KeyboardEvent) => {
  switch(e.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      next()
      break
    case 'ArrowUp':
    case 'ArrowLeft':
      prev()
      break
    default:
      break
  }
})

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.className = ''
  }, 2000)
})

