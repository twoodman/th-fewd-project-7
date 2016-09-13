// iife
(() => {
  'use strict'
  // store player and all buttons/inputs in consts
  const videoPlayer = document.querySelector('.player')
  const playerRestart = document.querySelector('.btn__restart')
  const playerRewind = document.querySelector('.btn__rewind')
  const playerForward = document.querySelector('.btn__forward')
  const playerPlay = document.querySelector('.btn__play')
  const playerMute = document.querySelector('.btn__mute')
  const playerBar = document.querySelector('.player__bar')

  // play function
  function playVideo () {
    // if video paused already
    if (videoPlayer.paused) {
      // play it
      videoPlayer.play()
      // change the play button icons to reflect that
      playerPlay.classList.add('btn__play--pause')
    } else {
      // else pause it
      videoPlayer.pause()
      // and again change the button icons
      playerPlay.classList.remove('btn__play--pause')
    }
  }

  // play & pause click event on play button
  playerPlay.addEventListener('click', () => {
    // call playVideo on play button click
    playVideo()
  }, false)

  // play & pause click event on player
  videoPlayer.addEventListener('click', () => {
    // call playVideo function on player click
    playVideo()
  }, false)

  // restart click event
  playerRestart.addEventListener('click', () => {
    // restart the video
    videoPlayer.currentTime = 0
  }, false)

  // rewind event
  playerRewind.addEventListener('click', () => {
    // go back ten seconds
    videoPlayer.currentTime -= 10
  }, false)

  // fast forward event
  playerForward.addEventListener('click', () => {
    // go forward ten seconds
    videoPlayer.currentTime += 10
  }, false)

  // mute event
  playerMute.addEventListener('click', () => {
    if (videoPlayer.muted === false) {
      videoPlayer.muted = true
      // remove & add classes for button icon
      playerMute.classList.add('btn__mute--muted')
    } else {
      videoPlayer.muted = false
      playerMute.classList.remove('btn__mute--muted')
    }
  }, false)

  // seek bar event listener (change)
  playerBar.addEventListener('change', () => {
    // calculate time
    let time = videoPlayer.duration * (playerBar.value / 100)
    // update the time on video
    videoPlayer.currentTime = time
    videoPlayer.play()
    playerPlay.classList.add('btn__play--pause')
  }, false)

  // seek bar event listener (as video plays)
  videoPlayer.addEventListener('timeupdate', () => {
    // calculate slider value
    let value = (100 / videoPlayer.duration) * videoPlayer.currentTime
    // set slider to value (current video time)
    playerBar.value = value
  }, false)

  // check if video has reached end
  videoPlayer.addEventListener('ended', () => {
    // set play button icon to default paused state
    playerPlay.classList.remove('btn__play--pause')
    // reset video to start
    videoPlayer.currentTime = 0
  }, false)

  // skipping while seeking fix
  playerBar.addEventListener('mousedown', () => {
    videoPlayer.pause()
  }, false)
  playerBar.addEventListener('mouseup', () => {
    videoPlayer.play()
  }, false)
})()
