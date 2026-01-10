import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { Fragment, useRef, useEffect } from 'react'
import bgVideo from '../../static/bg_video2_hardcrop.mov'
import almaCover from '../../static/images/alma/album_cover.jpg'
import DrawerAppBar from '../AppBar/DrawerAppBar'
import Footer from '../Footer/Footer'

const Home = () => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleCanPlay = () => {
        video.playbackRate = 0.5 // Play at half speed
        video.play().catch((error) => {
          console.error('Error playing video:', error)
        })
      }

      const handleLoadedMetadata = () => {
        video.playbackRate = 0.5 // Set playback rate
      }

      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      
      // Set playback rate immediately if video is already loaded
      if (video.readyState >= 1) {
        video.playbackRate = 0.5
      }

      return () => {
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [])

  return (
    <Fragment>
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <DrawerAppBar />
      </Box>
      <Box
        sx={{
          height: window.innerHeight,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={(e) => {
            console.error('Video error:', e)
            const video = e.currentTarget
            console.error('Video error details:', {
              error: video.error,
              networkState: video.networkState,
              readyState: video.readyState,
              src: video.currentSrc || video.src
            })
          }}
          onLoadedData={() => {
            console.log('Video loaded successfully')
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
            zIndex: 0,
            backgroundColor: '#000',
          }}
        >
          <source src={bgVideo} type="video/quicktime" />
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box
            style={{
              display: 'flex',
              height: matchesSM ? '17em' : '33em',
              width: matchesSM ? '17em' : '33em',
              border: 'none',
            }}
          >
            <img
              alt={'CousCous a colazione Alma LP cover'}
              src={`${almaCover}?w=500px&h=500px&fit=crop&auto=format`}
            ></img>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Fragment>
  )
}

export default Home
