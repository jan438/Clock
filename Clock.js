/* global Deck */
var prefix = Deck.prefix
var transform = prefix('transform')
var translate = Deck.translate
var $container = document.getElementById('container')
var $topbar = document.getElementById('topbar')
var $Clock = document.createElement('button')
$Clock.textContent = 'Clock'
$topbar.appendChild($Clock)
var deck = Deck()
$Clock.addEventListener('click', function () {
  deck.queue(function (next) {
    deck.cards.forEach(function (card, i) {
      setTimeout(function () {
        card.setSide('back')
      }, i * 7.5)
    })
    next()
  })
  deck.shuffle()
  deck.shuffle()
  deck.Clock()
})
deck.mount($container)
deck.intro()
deck.sort()
