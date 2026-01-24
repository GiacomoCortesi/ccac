import { useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { Fragment, useRef, useEffect } from 'react'
import bgVideo from '../../static/bg_video2_hardcrop.mov'
// Optimized image for display
// @ts-expect-error - vite-imagetools query parameters not recognized by TypeScript
import almaCover from '../../static/images/alma/album_cover.jpg?w=1000&format=webp&quality=85'
import DrawerAppBar from '../AppBar/DrawerAppBar'
import Footer from '../Footer/Footer'

const Home = () => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5 // Play at half speed
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error)
      })
    }
  }, [])

  return (
    <Fragment>
      <DrawerAppBar />
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
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={bgVideo} type="video/mp4" />
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
              src={almaCover}
              alt={'CousCous a colazione Alma LP cover'}
            ></img>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Fragment>
  )
}

export default Home
