// iife
(() => {
  'use strict'
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
  const playerSubtitles = videoPlayer.textTracks[0]
  const arraySubtitleSpans = document.querySelectorAll('.transcript__sentence')
  const playerTimeSpan = document.querySelector('.player__time')

  /*
  + remove default controls with JS
  + so in the rare event a user has JS disabled
  + browser will use default controls
  */
  videoPlayer.removeAttribute('controls')

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
    // on click, toggle temp class
    this.classList.toggle('enter-fullscreen')
    // check for webkit
    if (typeof videoPlayer.webkitEnterFullscreen === 'function') {
      // if playerfullscreen classlist contains temp class
      if (this.classList.contains('enter-fullscreen')) {
        // go fullscreen
        mainPlayerWrap.webkitRequestFullScreen()
        // set video wrap to take entire view width
        mainPlayerWrap.style.width = '100vw'
      } else {
        // otherwise cancel fullscreen
        document.webkitCancelFullScreen()
      }
      // check for moz
    } else if (typeof videoPlayer.mozRequestFullScreen() === 'function') {
      // if playerfullscreen classlist contains temp class
      if (this.classList.contains('enter-fullscreen')) {
        // go fullscreen
        mainPlayerWrap.mozRequestFullScreen()
      } else {
        // otherwise cancel fullscreen
        document.mozCancelFullScreen()
      }
      // otherwise display alert that fullscreen isnt supported
    } else {
      window.alert('Browser does not support fullscreen.')
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
    playerTimeSpan.textContent = `${roundTwoDecimals(videoPlayer.currentTime)} / ${roundTwoDecimals(videoPlayer.duration)}`
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

  // transcript highlighting, on cue change
  playerSubtitles.addEventListener('cuechange', () => {
    /*
    + yes, I could shorten the following to one let but
    + wanted to show clearly that these are two
    + different things
    */
    // grab the active cue list
    let activeCueList = playerSubtitles.activeCues
    // grab the first active cue in the list
    let activeCue = activeCueList[0]
    // grab the ID of the active cue
    let activeCueIndex = activeCue.id
    // highlight the span that corresponds w/ active cue ID
    let highlightCurrentCue = () => {
      arraySubtitleSpans[activeCueIndex - 1].classList.add('highlighted')
      arraySubtitleSpans[activeCueIndex - 1].scrollIntoView()
    }
    highlightCurrentCue()
    // and remove highlighted class on cue exit
    activeCue.onexit = () => {
      arraySubtitleSpans[activeCueIndex - 1].classList.remove('highlighted')
    }
  }, false)
  // add transcript click jump functionality
  for (let i = 0; i < arraySubtitleSpans.length; i++) {
    // set a data attr to each span
    arraySubtitleSpans[i].setAttribute('data-index', i)
    // set event listener on each span element to listen for click
    arraySubtitleSpans[i].addEventListener('click', function () {
      /*
      + on click, grab the 'data-index' attr (a number)
      + from the particular span clicked
      + and pass it into the index of the cues[] array
      + which is part of the playerSubtitles, or textTrack[0]
      + which was grabbed and stored in a const named playerSubtitles
      + at the to of the script
      + AND THEN, store all of that in a let called clickedSpanCue
      + clickedSpanCue holds the CUE that corresponds to the clicked span's
      + 'data-index' attribute.
      */
      let clickedSpanCue = playerSubtitles.cues[arraySubtitleSpans[i].getAttribute('data-index')]
      videoPlayer.currentTime = clickedSpanCue.startTime
    }, false)
  }
})()
