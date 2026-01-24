import { useMediaQuery, useTheme, Divider, Button, Link } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import JSZip from 'jszip'
import DrawerAppBar from '../AppBar/DrawerAppBar'
// Optimized image for display
// @ts-expect-error - vite-imagetools query parameters not recognized by TypeScript
import albumCover from '../../static/images/luce/cover.jpg?w=1600&format=webp&quality=85'
// Original images for downloads (keep original quality)
import albumCoverOriginal from '../../static/images/luce/cover.jpg'
import photoPress1Original from '../../static/images/luce/CousCous a colazione - Photopress01 (ph Martina Platone).jpg'
import photoPress2Original from '../../static/images/luce/CousCous a colazione - Photopress02 (ph Martina Platone).jpg'
import photoPress3Original from '../../static/images/luce/CousCous a colazione - Photopress03 (ph Martina Platone).jpg'
import photoPress4Original from '../../static/images/luce/CousCous a colazione - Photopress04 (ph Martina Platone).jpg'
import photoPress5Original from '../../static/images/luce/CousCous a colazione - Photopress05 (ph Martina Platone).jpg'
import photoPress6Original from '../../static/images/luce/CousCous a colazione - Photopress06 (ph Martina Platone).jpg'
import photoPress7Original from '../../static/images/luce/CousCous a colazione - Photopress07 (ph Martina Platone).jpg'
import photoPress8Original from '../../static/images/luce/CousCous a colazione - Photopress08 (ph Martina Platone).jpg'
import photoPress9Original from '../../static/images/luce/CousCous a colazione - Photopress09 (ph Martina Platone).jpg'
import lyric1 from '../../static/lyrics/luce/Luz.pdf?url'
import lyric2 from '../../static/lyrics/luce/Io sarei qui.pdf?url'
import lyric3 from '../../static/lyrics/luce/Misake.pdf?url'
import lyric4 from '../../static/lyrics/luce/Conquista.pdf?url'
import { useTranslation } from 'react-i18next'

const LucePressKit = () => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()

  const handleDownloadImage = () => {
    const link = document.createElement('a')
    link.href = albumCoverOriginal
    link.download = 'luce_album_cover.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadAllPhotos = async () => {
    try {
      const zip = new JSZip()
      const photos = [
        { url: albumCoverOriginal, name: 'cover.jpg' },
        { url: photoPress1Original, name: 'Photopress01.jpg' },
        { url: photoPress2Original, name: 'Photopress02.jpg' },
        { url: photoPress3Original, name: 'Photopress03.jpg' },
        { url: photoPress4Original, name: 'Photopress04.jpg' },
        { url: photoPress5Original, name: 'Photopress05.jpg' },
        { url: photoPress6Original, name: 'Photopress06.jpg' },
        { url: photoPress7Original, name: 'Photopress07.jpg' },
        { url: photoPress8Original, name: 'Photopress08.jpg' },
        { url: photoPress9Original, name: 'Photopress09.jpg' },
      ]

      // Fetch all images and add them to the zip
      const fetchPromises = photos.map(async (photo) => {
        const response = await fetch(photo.url)
        const blob = await response.blob()
        zip.file(photo.name, blob)
      })

      await Promise.all(fetchPromises)

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' })

      // Download the zip file
      const link = document.createElement('a')
      link.href = URL.createObjectURL(zipBlob)
      link.download = 'luce_press_photos.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Error creating zip file:', error)
    }
  }

  const handleDownloadLyrics = async () => {
    try {
      const zip = new JSZip()
      const lyrics = [
        { url: lyric1, name: 'Luz.pdf' },
        { url: lyric2, name: 'Io sarei qui.pdf' },
        { url: lyric3, name: 'Misake.pdf' },
        { url: lyric4, name: 'Conquista.pdf' },
      ]

      // Fetch all PDFs and add them to the zip
      const fetchPromises = lyrics.map(async (lyric) => {
        const response = await fetch(lyric.url)
        const blob = await response.blob()
        zip.file(lyric.name, blob)
      })

      await Promise.all(fetchPromises)

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' })

      // Download the zip file
      const link = document.createElement('a')
      link.href = URL.createObjectURL(zipBlob)
      link.download = 'luce_lyrics.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Error creating lyrics zip file:', error)
    }
  }

  return (
    <>
      <DrawerAppBar />
      <Box
        sx={{
          minHeight: window.innerHeight,
          width: matchesSM ? '100%' : '60%',
          margin: '0 auto',
          padding: matchesSM ? '2em' : '4em',
          paddingTop: '9.5em',
        }}
      >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2em',
        }}
      >
        <Typography variant="h6" component="h1" align="center">
          {t('lucePressKit.pressKit')}
        </Typography>
        <Divider sx={{ width: '100%' }} />
        <Typography variant="h1" component="h1" align="center">
          {t('lucePressKit.luce')}
        </Typography>
        <Typography variant="h5" component="h2" align="center">
          {t('lucePressKit.newEP')}
        </Typography>
        <Divider sx={{ width: '100%' }} />
        <Button variant="outlined" sx={{ marginTop: '1em' }}>
          <Link
            target="_blank"
            href="https://open.spotify.com/intl-it/album/0g7inclWQwCkDw3Dty6NYo?si=2QKb3b-TR2aD31cBQCz_mg"
            underline="none"
            variant="h6"
          >
            {t('lucePressKit.listenNow')}
          </Link>
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1em',
          }}
        >
          <Box
            sx={{
              maxWidth: matchesSM ? '100%' : '500px',
              width: '100%',
            }}
          >
            <img
              src={albumCover}
              alt="Luce EP Cover"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5em',
              alignItems: 'center',
            }}
          >
            <Link
              component="button"
              onClick={handleDownloadImage}
              sx={{ cursor: 'pointer' }}
            >
              Download Artwork
            </Link>
          </Box>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1em',
            width: '100%',
          }}
        >
          <Typography variant="h4" component="h2">
            Tracklist
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5em',
              width: '100%',
              maxWidth: '800px',
            }}
          >
            <Typography variant="body1" align="left">
              <strong>Luce</strong>
            </Typography>
            <Typography variant="body1" align="left">
              1) Luz
            </Typography>
            <Typography variant="body1" align="left">
              2) Io sarei qui (feat Ombra)
            </Typography>
            <Typography variant="body1" align="left">
              3) Misake
            </Typography>
            <Typography variant="body1" align="left">
              4) Conquista
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <Typography variant="body1" align="left" paragraph>
            {t('lucePressKit.releaseInfo')}
          </Typography>
          <Typography variant="body1" align="left" paragraph>
            {t('lucePressKit.introspectiveJourney')}
          </Typography>
          <Typography variant="body1" align="left" paragraph>
            {t('lucePressKit.trackInterpretations')}
          </Typography>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5em',
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <Typography variant="body1" align="left">
            {t('lucePressKit.productionCredits')}
          </Typography>
          <Typography variant="body1" align="left">
            {t('lucePressKit.mixMaster')}
          </Typography>
          <Typography variant="body1" align="left">
            {t('lucePressKit.photography')}
          </Typography>
          <Typography variant="body1" align="left">
            {t('lucePressKit.contribution')}
          </Typography>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Button sx={{ minWidth: '250px' }} variant="outlined" onClick={handleDownloadAllPhotos}>
          {t('lucePressKit.downloadPhotoPress')}
        </Button>
        <Button sx={{ minWidth: '250px' }} variant="outlined" onClick={handleDownloadLyrics}>
          {t('lucePressKit.downloadLyrics')}
        </Button>
        <Divider sx={{ width: '100%' }} />
      </Box>
    </Box>
    </>
  )
}

export default LucePressKit
