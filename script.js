const ACCESS_TOKEN = 103472649342428;
const BASE_URL = `https://superheroapi.com/api.php/${ACCESS_TOKEN}`

const imgCard = document.getElementById('img-body');
const heroInput = document.getElementById('hero-input')
const randomHeroBtn = document.getElementById('random-btn')
const searchHeroBtn = document.getElementById('search-btn')
// const name = document.getElementById('name')
// const stat = document.getElementById('stat')

const getRandomHero = (id) => {
  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
      console.log(json.powerstats)
      getStatsHTML(json)
    })
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♂️',
  power: '📊',
  combat: '⚔️',
}

const getStatsHTML = (character) => {
  const name = `<h2>${character.name}</h2>`
  const img =  `<img src="${character.image.url}" height=300 width=300/>`
  
 const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
 }).join("")
  
  imgCard.innerHTML = `${name.toUpperCase()}${img}${stats}`
}

const getSuperHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      console.log(json)
      getStatsHTML(hero)
    })
}

const randomHero = () => {
  return Math.floor(Math.random() * 731) + 1
}
randomHeroBtn.onclick = () => getRandomHero(randomHero())
searchHeroBtn.onclick = () => getSuperHero(heroInput.value)
