import { useMediaQuery, useTheme, Divider, Button, Link } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import JSZip from 'jszip'
import DrawerAppBar from '../AppBar/DrawerAppBar'
// Optimized images for display
// @ts-expect-error - vite-imagetools query parameters not recognized by TypeScript
import albumCover from '../../static/images/alma/album_cover.jpg?w=1600&format=webp&quality=85'
// @ts-expect-error - vite-imagetools query parameters not recognized by TypeScript
import photoPress3 from '../../static/images/alma/photopress3.jpg?w=1600&format=webp&quality=85'
// @ts-expect-error - vite-imagetools query parameters not recognized by TypeScript
import photoPress4 from '../../static/images/alma/photopress4.jpg?w=1600&format=webp&quality=85'
// Original images for downloads (keep original quality)
import albumCoverOriginal from '../../static/images/alma/album_cover.jpg'
import photoPress1Original from '../../static/images/alma/photopress1.jpg'
import photoPress2Original from '../../static/images/alma/photopress2.jpg'
import photoPress3Original from '../../static/images/alma/photopress3.jpg'
import photoPress4Original from '../../static/images/alma/photopress4.jpg'
import photoPress5Original from '../../static/images/alma/photopress5.jpg'
import lyric1 from '../../static/lyrics/alma/1.Lentamente.pdf?url'
import lyric2 from '../../static/lyrics/alma/2.Sempre solə.pdf?url'
import lyric3 from '../../static/lyrics/alma/3.Arco-iris.pdf?url'
import lyric4 from '../../static/lyrics/alma/4.Vent_anni.pdf?url'
import lyric5 from '../../static/lyrics/alma/5.Alma.pdf?url'
import lyric6 from '../../static/lyrics/alma/6.Noi.pdf?url'
import lyric7 from '../../static/lyrics/alma/7.Secoli.pdf?url'
import lyric8 from '../../static/lyrics/alma/8.Traz e leva.pdf?url'
import lyric9 from '../../static/lyrics/alma/9.Una vita a tre.pdf?url'
import { useTranslation } from 'react-i18next'

const AlmaPressKit = () => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()

  const handleDownloadImage = () => {
    const link = document.createElement('a')
    link.href = albumCoverOriginal
    link.download = 'alma_album_cover.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadAllPhotos = async () => {
    try {
      const zip = new JSZip()
      const photos = [
        { url: albumCoverOriginal, name: 'album_cover.jpg' },
        { url: photoPress1Original, name: 'photopress1.jpg' },
        { url: photoPress2Original, name: 'photopress2.jpg' },
        { url: photoPress3Original, name: 'photopress3.jpg' },
        { url: photoPress4Original, name: 'photopress4.jpg' },
        { url: photoPress5Original, name: 'photopress5.jpg' },
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
      link.download = 'alma_press_photos.zip'
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
        { url: lyric1, name: '1.Lentamente.pdf' },
        { url: lyric2, name: '2.Sempre solə.pdf' },
        { url: lyric3, name: '3.Arco-iris.pdf' },
        { url: lyric4, name: '4.Vent_anni.pdf' },
        { url: lyric5, name: '5.Alma.pdf' },
        { url: lyric6, name: '6.Noi.pdf' },
        { url: lyric7, name: '7.Secoli.pdf' },
        { url: lyric8, name: '8.Traz e leva.pdf' },
        { url: lyric9, name: '9.Una vita a tre.pdf' },
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
      link.download = 'alma_lyrics.zip'
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
            {t('almaPressKit.pressKit')}
          </Typography>
          <Divider sx={{ width: '100%' }} />
          <Typography variant="h1" component="h1" align="center">
            {t('almaPressKit.alma')}
          </Typography>
          <Typography variant="h5" component="h2" align="center">
          {t('almaPressKit.newLP')}
          </Typography>
          <Divider sx={{ width: '100%' }} />
          <Button variant="outlined" sx={{ marginTop: '1em' }}>
            <Link
              target="_blank"
              href="https://open.spotify.com/intl-it/album/3D447qEo17TYXOscz5PYGN?si=f64jM7UpTz-dlNOPEMnDSg"
              underline="none"
              variant="h6"
            >
              {t('almaPressKit.listenNow')}
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
                alt="Alma Album Cover"
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
                {t('almaPressKit.downloadArtwork')}
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
              {t('almaPressKit.tracklist')}
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
                <strong>Alma</strong>
              </Typography>
              <Typography variant="body1" align="left">
                1 - Lentamente
              </Typography>
              <Typography variant="body1" align="left">
                2 - Sempre solə
              </Typography>
              <Typography variant="body1" align="left">
                3 - Arco-íris
              </Typography>
              <Typography variant="body1" align="left">
                4 - Vent&apos;anni feat. David Mrakpor
              </Typography>
              <Typography variant="body1" align="left">
                5 - Alma
              </Typography>
              <Typography variant="body1" align="left">
                6 - Noi
              </Typography>
              <Typography variant="body1" align="left">
                7 - Secoli
              </Typography>
              <Typography variant="body1" align="left">
                8 - Traz e leva
              </Typography>
              <Typography variant="body1" align="left">
                9 - Una vita a tre
              </Typography>
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
            <Box
              sx={{
                maxWidth: matchesSM ? '100%' : '800px',
                width: '100%',
              }}
            >
              <img
                src={photoPress3}
                alt="Alma Press Photo"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
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
              {t('almaPressKit.description1')}
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              {t('almaPressKit.description2')}
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              {t('almaPressKit.description3')}
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              {t('almaPressKit.description4')}
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              {t('almaPressKit.description5')}
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              {t('almaPressKit.description6')}
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
              <strong>{t('almaPressKit.author')}</strong> CousCous a colazione
            </Typography>
            <Typography variant="body1" align="left">
              <strong>{t('almaPressKit.producer')}</strong> Mattia Mennella
            </Typography>
            <Typography variant="body1" align="left">
              <strong>{t('almaPressKit.mixMaster')}</strong> Waveroof Studio - Ivano Giovedì
            </Typography>
            <Typography variant="body1" align="left">
              <strong>{t('almaPressKit.coverPhoto')}</strong> Ilaria Roncucci - Martina platone
            </Typography>
            <Typography variant="body1" align="left">
              <strong>{t('almaPressKit.photoShooting')}</strong> Martina Platone
            </Typography>
            <Typography variant="body1" align="left">
              <strong>{t('almaPressKit.visualVideos')}</strong> Adriano Giotti
            </Typography>
          </Box>
          <Divider sx={{ width: '100%' }} />
          <Button sx={{ minWidth: '250px' }} variant="outlined" onClick={handleDownloadAllPhotos}>
            {t('almaPressKit.downloadPhotoPress')}
          </Button>
          <Button sx={{ minWidth: '250px' }} variant="outlined" onClick={handleDownloadLyrics}>
            {t('almaPressKit.downloadLyrics')}
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1em',
              width: '100%',
            }}
          >
            <Box
              sx={{
                maxWidth: matchesSM ? '100%' : '800px',
                width: '100%',
              }}
            >
              <img
                src={photoPress4}
                alt="Alma Press Photo"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
          <Divider sx={{ width: '100%' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5em',
              width: '100%',
              maxWidth: '800px',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1" align="center">
              {t('almaPressKit.couscousAlma')}
            </Typography>
            <Typography variant="body1" align="center">
              <strong>{t('almaPressKit.promotion')}</strong>{' '}
              <Link
                href="https://www.instagram.com/costellosagency/?igsh=MXdtM3MyaXkxbmhhbw%3D%3D#"
                target="_blank"
                underline="hover"
              >
                Costello Agency
              </Link>
            </Typography>
            <Typography variant="body1" align="center">
              <strong>{t('almaPressKit.info')}</strong> couscousacolazione@gmail.com
            </Typography>
          </Box>
          <Divider sx={{ width: '100%' }} />
        </Box>
      </Box>
    </>
  )
}

export default AlmaPressKit

