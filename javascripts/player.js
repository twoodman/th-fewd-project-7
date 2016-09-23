// iife
(() => {
  'use strict'
  // store player and all buttons/inputs in consts
  const mainPlayerWrap = document.querySelector('.main__player-wrap')
  const videoPlayer = document.querySelector('.player')
  const playerRestart = document.querySelector('.btn__restart')
  const playerRewind = document.querySelector('.btn__rewind')
  const playerForward = document.querySelector('.btn__forward')
  const playerPlay = document.querySelector('.btn__play')
  const playerMute = document.querySelector('.btn__mute')
  const playerBar = document.querySelector('.player__bar')
  const playerBarFill = document.querySelector('.player__bar-fill')
  const playerToggleSubs = document.querySelector('.btn__subtitles')
  const playerSubtitles = videoPlayer.textTracks[0]

  // change play button icon
  let changePlayIcon = () => {
    if (!videoPlayer.paused) {
      playerPlay.classList.add('btn__play--pause')
    } else {
      playerPlay.classList.remove('btn__play--pause')
    }
  }

  // play function
  let playVideo = () => {
    // if video paused already
    if (videoPlayer.paused) {
      // play it
      videoPlayer.play()
      // change the play button icons to reflect that
      changePlayIcon()
    } else {
      // else pause it
      videoPlayer.pause()
      // and again change the button icons
      changePlayIcon()
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
    if (!videoPlayer.muted) {
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
    playVideo()
  }, false)

  // seek bar event listener (as video plays)
  videoPlayer.addEventListener('timeupdate', () => {
    // calculate slider value
    let value = (100 / videoPlayer.duration) * videoPlayer.currentTime
    // set slider to value (current video time)
    playerBar.value = value
    playerBarFill.style.width = `${playerBar.value}%`
  }, false)

  // check if video has reached end
  videoPlayer.addEventListener('ended', () => {
    // set play button icon to default paused state
    changePlayIcon()
    // reset video to start
    videoPlayer.currentTime = 0
  }, false)

  // check if player bar has been clicked
  playerBar.addEventListener('click', function (el) {
    // get position of click on bar
    let percent = el.offsetX / this.offsetWidth
    // set video time to position / duration
    videoPlayer.currentTime = percent * videoPlayer.duration
    // play it
    videoPlayer.play()
    // change the play icon to reflect state
    changePlayIcon()
  }, false)

  /*
  + skipping while seeking fix
  + pauses video on mousedown on playerbar
  + plays video on mouseup
  */
  playerBar.addEventListener('mousedown', () => {
    videoPlayer.pause()
    changePlayIcon()
  }, false)
  playerBar.addEventListener('mouseup', () => {
    videoPlayer.play()
    changePlayIcon()
  }, false)

  // subtitles
  // set subs to hidden immediately
  playerSubtitles.mode = 'hidden'
  // on subtitle button click
  playerToggleSubs.addEventListener('click', () => {
    // if subs arent hidden
    if (playerSubtitles.mode !== 'hidden') {
      // hide them
      playerSubtitles.mode = 'hidden'
      // change sub button to reflect state
      playerToggleSubs.classList.remove('btn__subtitles--showing')
    } else {
      // else show them
      playerSubtitles.mode = 'showing'
      // and change sub button to reflect state
      playerToggleSubs.classList.add('btn__subtitles--showing')
    }
  })
})()
