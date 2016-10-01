(() => { // start iffe
  'use strict'
  // keys
  const keySpace = 32
  // store player and all buttons/inputs in consts
  const mainPlayerWrap = document.querySelector('.main__player-wrap')
  const playerButtonsWrap = document.querySelector('.player__buttons')
  const playerSeekWrap = document.querySelector('.bar__wrap')
  const videoPlayer = document.querySelector('.player')
  const playerRestart = document.querySelector('.btn__restart')
  const playerRewind = document.querySelector('.btn__rewind')
  const playerForward = document.querySelector('.btn__forward')
  const playerPlay = document.querySelector('.btn__play')
  const playerMute = document.querySelector('.btn__mute')
  const playerVolume = document.querySelector('.player__volume')
  const playerFullscreen = document.querySelector('.btn__fullscreen')
  const playerBar = document.querySelector('.player__bar')
  const playerBarFill = document.querySelector('.player__bar-fill')
  const playerBarBuffer = document.querySelector('.player__bar-buffer')
  const playerToggleSubs = document.querySelector('.btn__subtitles')
  const playerTimeSpan = document.querySelector('.player__time')
  const transcriptOutput = document.querySelector('.main__transcript')
  const playerSubtitles = videoPlayer.textTracks['0']
  console.log(playerSubtitles)

// TRANSCRIPT
  // CUE DATA
  const cueData = [
    { 'cueStart': '0.240', 'cueEnd': '4.130', 'cueText': 'Now that we\'ve looked at the architecture of the internet, let\'s see how you might ' },
    { 'cueStart': '4.130', 'cueEnd': '7.535', 'cueText': 'connect your personal devices to the internet inside your house. ' },
    { 'cueStart': '7.535', 'cueEnd': '11.270', 'cueText': 'Well there are many ways to connect to the internet, and ' },
    { 'cueStart': '11.270', 'cueEnd': '13.960', 'cueText': 'most often people connect wirelessly. ' },
    { 'cueStart': '13.960', 'cueEnd': '17.940', 'cueText': 'Let\'s look at an example of how you can connect to the internet. ' },
    { 'cueStart': '17.940', 'cueEnd': '22.370', 'cueText': 'If you live in a city or a town, you probably have a coaxial cable for ' },
    { 'cueStart': '22.370', 'cueEnd': '26.880', 'cueText': 'cable Internet, or a phone line if you have DSL, running to the outside of ' },
    { 'cueStart': '26.880', 'cueEnd': '30.920', 'cueText': 'your house, that connects you to the Internet Service Provider, or ISP. ' },
    { 'cueStart': '32.920', 'cueEnd': '34.730', 'cueText': 'If you live far out in the country, you\'ll more like have ' },
    { 'cueStart': '34.730', 'cueEnd': '39.430', 'cueText': 'a dish outside your house, connecting you wirelessly to your closest ISP, or ' },
    { 'cueStart': '39.430', 'cueEnd': '41.190', 'cueText': 'you might also use the telephone system. ' },
    { 'cueStart': '41.190', 'cueEnd': '46.300', 'cueText': 'Whether a wire comes straight from the ISP hookup outside your house, or ' },
    { 'cueStart': '46.300', 'cueEnd': '49.270', 'cueText': 'it travels over radio waves from your roof, ' },
    { 'cueStart': '49.270', 'cueEnd': '53.760', 'cueText': 'the first stop a wire will make once inside your house, is at your modem. ' },
    { 'cueStart': '53.760', 'cueEnd': '57.780', 'cueText': 'A modem is what connects the internet to your network at home. ' },
    { 'cueStart': '57.780', 'cueEnd': '60', 'cueText': 'A few common residential modems are DSL or' }
  ]
  // create transcript spans
  let arrangeTranscript = () => {
    let masterSpan
    for (let i = 0; i < cueData.length; i++) {
      masterSpan = document.createElement('span')
      masterSpan.cue = cueData[i]
      masterSpan.textContent = cueData[i].cueText
      masterSpan.classList.add('transcript__span')
      transcriptOutput.appendChild(masterSpan)
    }
  }
  // call it
  arrangeTranscript()
  // select all spans & store in variable
  const playerTranscriptSpans = document.querySelectorAll('.transcript__span')
  // transcript highlighting and clicking
  for (let i = 0; i < playerTranscriptSpans.length; i++) {
    playerTranscriptSpans[i].addEventListener('click', (e) => {
      videoPlayer.currentTime = e.target.cue.cueStart
      // console.log(videoPlayer.currentTime)
      // console.log(this.target)
      // console.log(this.target.cue.cueStart)
      videoPlayer.play()
      changePlayIcon()
    })
  }

  /*
  + remove default controls with JS
  + so in the rare event a user has JS disabled
  + browser will use default controls
  */
  videoPlayer.removeAttribute('controls')
  // set subs to hidden immediately
  playerSubtitles.mode = 'hidden'

// FUNCTIONS
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

  // detect fullscreen support & use proper method
  let enterFullscreen = (el) => {
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullScreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else if (!el.requestFullscreen || !el.mozRequestFullScreen || !el.webkitRequestFullScreen || !el.msRequestFullscreen) {
      window.alert('Your browser does not support fullscreen.')
    }
  }

  // detect exit fullscreen support & use proper method
  let exitFullscreen = (el) => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }

// EVENT LISTENERS
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
      // add the muted state to mute
      playerMute.classList.add('btn__mute--muted')
      // set video vovlume and volume bar to 0
      videoPlayer.volume = 0
      playerVolume.value = 0
    } else {
      videoPlayer.muted = false
      // remove the muted state from mute
      playerMute.classList.remove('btn__mute--muted')
      // set video volume and volume bar to 1
      videoPlayer.volume = 1
      playerVolume.value = 1
    }
  }, false)

  // volume change event
  playerVolume.addEventListener('change', () => {
    // on change event, modify the video volume
    videoPlayer.volume = playerVolume.value
    // if volume bar is all the way left (sound off)
    if (videoPlayer.volume === 0) {
      // change the mute btn icon to muted
      playerMute.classList.add('btn__mute--muted')
    } else {
      // else remove the muted icon from mute btn
      playerMute.classList.remove('btn__mute--muted')
    }
  }, false)

  // fullscreen button functionality
  playerFullscreen.addEventListener('click', function () {
    if (playerFullscreen.classList.contains('enter-fullscreen')) {
      playerFullscreen.classList.remove('enter-fullscreen')
      exitFullscreen(mainPlayerWrap)
    } else {
      playerFullscreen.classList.add('enter-fullscreen')
      enterFullscreen(mainPlayerWrap)
    }
  })

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
    // update player__time span
    let roundTwoDecimals = (num) => {
      // return the number given rounded to two decimal
      return `0:${Math.floor(num % 60)}`
    }
    // set time content
    playerTimeSpan.textContent = `${roundTwoDecimals(videoPlayer.currentTime)}
     / ${roundTwoDecimals(videoPlayer.duration)}`

     // set transcript highlighting
    cueData.forEach((element, index) => {
      if (videoPlayer.currentTime >= element.cueStart &&
        videoPlayer.currentTime <= element.cueEnd) {
        transcriptOutput.children[index].classList.add('highlighted')
      } else {
        transcriptOutput.children[index].classList.remove('highlighted')
      }
    })
  }, false)

  // buffer functionality
  videoPlayer.addEventListener('progress', () => {
    // if buffer length is greater than none
    if (videoPlayer.buffered.length > 0) {
      // calculate the percentage of buffered video
      let percent = (videoPlayer.buffered.end(0) / videoPlayer.duration) * 100
      // set buffer bar width to grabbed percentage
      playerBarBuffer.style.width = `${percent}%`
    }
  })

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

  // show controls for 0.5 secs on window load
  window.onload = () => {
    setTimeout(() => {
      // then hide buttons
      playerButtonsWrap.classList.add('player__buttons--hidden')
      // and lower seek bar
      playerSeekWrap.classList.add('bar__wrap--lowered')
    }, 500)
  }
  // on player hover show buttons, seek bar moves up with buttons
  mainPlayerWrap.addEventListener('mouseenter', () => {
    playerButtonsWrap.classList.remove('player__buttons--hidden')
  }, false)
  // on player leave hide buttons, seek bar remains on bottom
  mainPlayerWrap.addEventListener('mouseleave', () => {
    playerButtonsWrap.classList.add('player__buttons--hidden')
  }, false)

// SOME HACKY STUFF
  // check for ff
  const isFirefox = typeof InstallTrigger !== 'undefined'
  // fix firefox range input thumb being two pixels off
  if (isFirefox) {
    playerBar.classList.add('firefox-fix')
  }
})() // end iffe
