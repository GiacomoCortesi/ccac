import React, { Fragment, useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import DrawerAppBar from '../AppBar/DrawerAppBar'
import { useMediaQuery, useTheme } from '@mui/material'
import lentamenteVideo from '../../static/video/lentamente canvas.mp4'
import sempreSolaVideo from '../../static/video/sempre sola canvas.mp4'
import arcoIrisVideo from '../../static/video/arcoiris canvas.mp4'
import ventAnniVideo from '../../static/video/Vent\'anni.mp4'
import almaVideo from '../../static/video/alma canvas.mp4'
import noiVideo from '../../static/video/noi canvas.mp4'
import secoliVideo from '../../static/video/secoli canvas.mp4'
import trazELevaVideo from '../../static/video/traz e leva canvas.mp4'
import unaVitaATreVideo from '../../static/video/una vita a tre canvas.mp4'

interface VideoTrack {
  id: string
  title: string
  videoSrc: string
  soundcloudUrl: string
  soundcloudTrackUrl: string
  soundcloudTitle: string
}

const videoTracks: VideoTrack[] = [
  {
    id: 'lentamente',
    title: 'Lentamente',
    videoSrc: lentamenteVideo,
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2212384778%3Fsecret_token%3Ds-xEBQX28pZVy&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    soundcloudTrackUrl:
      'https://soundcloud.com/couscous-a-colazione/lentamente/s-xEBQX28pZVy',
    soundcloudTitle: 'Lentamente',
  },
  {
    id: 'sempre-sola',
    title: 'Sempre solə',
    videoSrc: sempreSolaVideo,
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2216584076%3Fsecret_token%3Ds-i9sDPf82bZn&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    soundcloudTrackUrl:
      'https://soundcloud.com/couscous-a-colazione/47c91835-76cb-445b-90cb-ad9d5fde2b10/s-i9sDPf82bZn',
    soundcloudTitle: 'Sempre solə',
  },
  {
    id: 'arco-iris',
    title: 'Arco-íris',
    videoSrc: arcoIrisVideo,
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2216583521%3Fsecret_token%3Ds-a6Rc1Kpo6xr&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    soundcloudTrackUrl:
      'https://soundcloud.com/couscous-a-colazione/53d74088-ac3e-4d6e-ae1f-f69b931d409b/s-a6Rc1Kpo6xr',
    soundcloudTitle: 'Arco-íris',
  },
  {
    id: 'ventanni',
    title: "Vent'anni",
    videoSrc: ventAnniVideo,
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2212385525%3Fsecret_token%3Ds-g64ijbMJt6j&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    soundcloudTrackUrl:
      'https://soundcloud.com/couscous-a-colazione/ventanni/s-g64ijbMJt6j',
    soundcloudTitle: "Vent'anni feat. David Mrakpor",
  },
  {
    id: 'alma',
    title: 'Alma',
    videoSrc: almaVideo,
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2213933237%3Fsecret_token%3Ds-cX07TL5FA9F&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    soundcloudTrackUrl:
      'https://soundcloud.com/couscous-a-colazione/alma/s-cX07TL5FA9F',
    soundcloudTitle: 'Alma',
  },
  {
    id: 'noi',
    title: 'Noi',
    videoSrc: noiVideo,
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2212384508%3Fsecret_token%3Ds-PPVPrB33RS4&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    soundcloudTrackUrl:
      'https://soundcloud.com/couscous-a-colazione/c6f8d625-0ce8-49c9-b620-099f88239057/s-PPVPrB33RS4',
    soundcloudTitle: 'Noi',
  },
  {
    id: 'secoli',
    title: 'Secoli',
    videoSrc: secoliVideo,
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2213934677%3Fsecret_token%3Ds-dsE9iBr7TJ8&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    soundcloudTrackUrl:
      'https://soundcloud.com/couscous-a-colazione/7e453d17-cc7e-4a08-a4a3-40e150c602ac/s-dsE9iBr7TJ8',
    soundcloudTitle: 'Secoli',
  },
  {
    id: 'traz-e-leva',
    title: 'Traz e leva',
    videoSrc: trazELevaVideo,
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2212383932%3Fsecret_token%3Ds-PEDRBzrzGKF&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    soundcloudTrackUrl:
      'https://soundcloud.com/couscous-a-colazione/traz-e-leva/s-PEDRBzrzGKF',
    soundcloudTitle: 'Traz e Leva',
  },
  {
    id: 'una-vita-a-tre',
    title: 'Una vita a tre',
    videoSrc: unaVitaATreVideo,
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2216585174%3Fsecret_token%3Ds-8CrOSgwsnXR&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    soundcloudTrackUrl:
      'https://soundcloud.com/couscous-a-colazione/eb4683ed-b825-4b2f-95f2-a467c43e56ee/s-8CrOSgwsnXR',
    soundcloudTitle: 'Una vita a tre',
  },
]

const Video = () => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const [selectedIndex, setSelectedIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleVideoSelect = (index: number) => {
    setSelectedIndex(index)
  }

  useEffect(() => {
    // Reset video playback when switching tracks
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play()
    }
  }, [selectedIndex])

  // Scroll to selected video on mobile
  useEffect(() => {
    if (matchesSM && scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [selectedIndex, matchesSM])

  const currentTrack = videoTracks[selectedIndex]

  return (
    <Fragment>
      <DrawerAppBar />
      {/* Video display area - full screen */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Main video - full screen */}
        <video
          ref={videoRef}
          key={currentTrack.id}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        >
          <source src={currentTrack.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video menu bar - overlay in bottom 25% of video */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '25vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: matchesSM ? '1em 0' : '1.5em 0',
            overflowX: 'auto',
            overflowY: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: matchesSM ? 'flex-start' : 'flex-start',
            gap: matchesSM ? '1em' : '2em',
            scrollBehavior: 'smooth',
            zIndex: 5,
            paddingLeft: matchesSM ? '1em' : '2em',
            paddingRight: matchesSM ? '1em' : '2em',
            '&::-webkit-scrollbar': {
              height: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.1)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.secondary.main,
              borderRadius: '2px',
            },
          }}
          ref={scrollContainerRef}
        >
          {videoTracks.map((track, index) => (
            <Box
              key={track.id}
              onClick={() => handleVideoSelect(index)}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                flexShrink: 0,
                width: matchesSM ? '200px' : selectedIndex === index ? '300px' : '150px',
                height: matchesSM ? '112px' : selectedIndex === index ? '169px' : '84px',
                transition: 'all 0.3s ease',
                opacity: selectedIndex === index ? 1 : 0.6,
                border:
                  selectedIndex === index
                    ? `3px solid ${theme.palette.secondary.main}`
                    : '3px solid transparent',
                borderRadius: '8px',
                overflow: 'hidden',
                '&:hover': {
                  opacity: 1,
                  transform: 'scale(1.05)',
                },
              }}
            >
              <video
                src={track.videoSrc}
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Video title overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  padding: '0.5em',
                  color: 'white',
                  fontFamily: 'couscous-regular',
                  fontSize: matchesSM ? '0.875rem' : selectedIndex === index ? '1.1rem' : '0.9rem',
                  textAlign: 'center',
                }}
              >
                {track.title}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* SoundCloud player - below video, visible only when scrolling */}
      <Box
        sx={{
          width: '100%',
          minHeight: '50vh',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          padding: matchesSM ? '1em' : '2em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <iframe
            key={currentTrack.id}
            id={`soundcloud-widget-${currentTrack.id}`}
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay; encrypted-media"
            src={currentTrack.soundcloudUrl}
            style={{
              borderRadius: '8px',
            }}
          />
            <Box
              sx={{
                fontSize: '10px',
                color: '#cccccc',
                lineBreak: 'anywhere',
                wordBreak: 'normal',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                fontFamily:
                  'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
                fontWeight: 100,
                marginTop: '8px',
                textAlign: 'center',
              }}
            >
              <a
                href="https://soundcloud.com/couscous-a-colazione"
                title="CousCous a colazione"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#cccccc', textDecoration: 'none' }}
              >
                CousCous a colazione
              </a>{' '}
              ·{' '}
              <a
                href={currentTrack.soundcloudTrackUrl}
                title={currentTrack.soundcloudTitle}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#cccccc', textDecoration: 'none' }}
              >
                {currentTrack.soundcloudTitle}
              </a>
            </Box>
          </Box>
        </Box>
    </Fragment>
  )
}

export default Video
