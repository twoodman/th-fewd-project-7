// iife
(function () {
  'use strict'
  // store player and all buttons in consts
  const videoPlayer = document.querySelector('.player')
  const playerRestart = document.querySelector('.btn__restart')
  const playerRewind = document.querySelector('.btn__rewind')
  const playerForward = document.querySelector('.btn__forward')
  const playerPlay = document.querySelector('.btn__play')

  // // only show player controls on videoplayer hover
  // videoPlayer.addEventListener('mouseover', () => {
  //   if(playerButtons.classList) {
  //     playerButtons.classList.add('player__buttons--show');
  //   } else {
  //     playerButtons.classList += ' ' + 'player__buttons--show';
  //   }
  // }, false);

  // videoPlayer.addEventListener('mouseleave', () => {
  //   if(playerButtons.classList) {
  //     playerButtons.classList.remove('player__buttons--show');
  //   } else {
  //     playerButtons.classList -= ' ' + 'player__buttons--show';
  //   }
  // }, false);

  // play function
  function playVideo () {
    if (videoPlayer.paused) {
      videoPlayer.play()
      playerPlay.classList.remove('btn__play--play')
      playerPlay.classList.add('btn__play--pause')
    } else {
      videoPlayer.pause()
      playerPlay.classList.remove('btn__play--pause')
      playerPlay.classList.add('btn__play--play')
    }
  }

  // play & pause click event on play button
  playerPlay.addEventListener('click', () => {
    playVideo()
  }, false)

  // play & pause click event on player
  videoPlayer.addEventListener('click', () => {
    playVideo()
  }, false)

  // restart click event
  playerRestart.addEventListener('click', () => {
    videoPlayer.currentTime = 0
  }, false)

  // rewind event
  playerRewind.addEventListener('click', () => {
    videoPlayer.currentTime -= 10
  }, false)

  // fast forward event
  playerForward.addEventListener('click', () => {
    videoPlayer.currentTime += 10
  }, false)
}())
