import { useMediaQuery, useTheme, Divider, Button, Link } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import JSZip from 'jszip'
import albumCover from '../../static/images/luce/cover.jpg'
import photoPress1 from '../../static/images/luce/CousCous a colazione - Photopress01 (ph Martina Platone).jpg'
import photoPress2 from '../../static/images/luce/CousCous a colazione - Photopress02 (ph Martina Platone).jpg'
import photoPress3 from '../../static/images/luce/CousCous a colazione - Photopress03 (ph Martina Platone).jpg'
import photoPress4 from '../../static/images/luce/CousCous a colazione - Photopress04 (ph Martina Platone).jpg'
import photoPress5 from '../../static/images/luce/CousCous a colazione - Photopress05 (ph Martina Platone).jpg'
import photoPress6 from '../../static/images/luce/CousCous a colazione - Photopress06 (ph Martina Platone).jpg'
import photoPress7 from '../../static/images/luce/CousCous a colazione - Photopress07 (ph Martina Platone).jpg'
import photoPress8 from '../../static/images/luce/CousCous a colazione - Photopress08 (ph Martina Platone).jpg'
import photoPress9 from '../../static/images/luce/CousCous a colazione - Photopress09 (ph Martina Platone).jpg'
import lyric1 from '../../static/lyrics/luce/Luz.pdf?url'
import lyric2 from '../../static/lyrics/luce/Io sarei qui.pdf?url'
import lyric3 from '../../static/lyrics/luce/Misake.pdf?url'
import lyric4 from '../../static/lyrics/luce/Conquista.pdf?url'

const LucePressKit = () => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDownloadImage = () => {
    const link = document.createElement('a')
    link.href = albumCover
    link.download = 'luce_album_cover.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadAllPhotos = async () => {
    try {
      const zip = new JSZip()
      const photos = [
        { url: albumCover, name: 'cover.jpg' },
        { url: photoPress1, name: 'Photopress01.jpg' },
        { url: photoPress2, name: 'Photopress02.jpg' },
        { url: photoPress3, name: 'Photopress03.jpg' },
        { url: photoPress4, name: 'Photopress04.jpg' },
        { url: photoPress5, name: 'Photopress05.jpg' },
        { url: photoPress6, name: 'Photopress06.jpg' },
        { url: photoPress7, name: 'Photopress07.jpg' },
        { url: photoPress8, name: 'Photopress08.jpg' },
        { url: photoPress9, name: 'Photopress09.jpg' },
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
          PRESS KIT
        </Typography>
        <Divider sx={{ width: '100%' }} />
        <Typography variant="h1" component="h1" align="center">
          Luce
        </Typography>
        <Typography variant="h5" component="h2" align="center">
          il nuovo EP dei CousCous a colazione
        </Typography>
        <Divider sx={{ width: '100%' }} />
        <Button variant="outlined" sx={{ marginTop: '1em' }}>
          <Link
            target="_blank"
            href="https://open.spotify.com/intl-it/album/0g7inclWQwCkDw3Dty6NYo?si=2QKb3b-TR2aD31cBQCz_mg"
            underline="none"
            variant="h6"
          >
            Ascolta ora il nuovo EP &quot;LUCE&quot;
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
            Luce è il nuovo EP dei CousCous a colazione, disponibile da venerdì 20 ottobre in rotazione radiofonica e su tutte le piattaforme di streaming digitale.
          </Typography>
          <Typography variant="body1" align="left" paragraph>
            Anticipato dal singolo Conquista, Luce è il punto d&apos;arrivo di un viaggio introspettivo alla ricerca di noi stessi durante il quale i CousCous a colazione interpretano in diverse accezioni il concetto di luce, che permea e fa da collante tra tutti i brani del nuovo EP: in &quot;Luz&quot;, la luce ha un valore positivo e viene intesa come quel momento lucido, nella frenetica vita moderna dove niente è facile e tutto pare effimero, in cui capiamo che è necessario fermarci un momento, trascurare la superficialità e concentrarci su ciò che è reale e concreto.
          </Typography>
          <Typography variant="body1" align="left" paragraph>
            In &quot;Io sarei qui&quot;, la luce è sinonimo un amore inaspettato che irradia l&apos;animo ed il cuore, come una spinta interiore che muove i sentimenti e le emozioni umane. Nel brano &quot;Misake&quot; la luce è accettazione a fronte dell&apos;incertezza e del caos in cui siamo quotidianamente avvolti e risucchiati. &quot;Conquista&quot; è un incoraggiamento a non arrendersi mai, a rialzarsi sempre e continuare a lottare alla ricerca del fine ultimo, la proverbiale luce in fondo al tunnel.
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
            Tutti i brani dell&apos;EP &quot;Luce&quot; sono stati scritti dai CousCous a colazione e prodotti da Mattia Mennella.
          </Typography>
          <Typography variant="body1" align="left">
            Il mix ed il master sono stati curati da Ivano Giovedì.
          </Typography>
          <Typography variant="body1" align="left">
            Le fotografie e l&apos;artwork sono di Martina Platone.
          </Typography>
          <Typography variant="body1" align="left">
            L&apos;EP è stato realizzato con il contributo di Centro Musica Modena (per il bando Encoder).
          </Typography>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Button sx={{ minWidth: '250px' }} variant="outlined" onClick={handleDownloadAllPhotos}>
          Download PhotoPress
        </Button>
        <Button sx={{ minWidth: '250px' }} variant="outlined" onClick={handleDownloadLyrics}>
          Download Lyrics
        </Button>
        <Divider sx={{ width: '100%' }} />
      </Box>
    </Box>
  )
}

export default LucePressKit
