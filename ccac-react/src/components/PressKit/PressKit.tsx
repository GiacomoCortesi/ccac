import { Fragment } from 'react'
import { useMediaQuery, useTheme, Button, Typography, Box, Divider, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import DrawerAppBar from '../AppBar/DrawerAppBar'
import Footer from '../Footer/Footer'
import rassegnaStampaPDF from '../../static/media-coverage/CousCousAColazione_RassegnaStampa.pdf?url'
import rassegnaStampaAlmaPDF from '../../static/media-coverage/CousCousAColazione_RassegnaStampa_Alma.pdf?url'
import almaCover from '../../static/images/alma/album_cover.jpg'
import luceCover from '../../static/images/luce/cover.jpg'
import pressPhoto from '../../static/images/alma/photopress5.jpg'

const PressKit = () => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))

  const handleOpenRassegnaStampa = () => {
    window.open(rassegnaStampaPDF, '_blank')
  }

  const handleOpenRassegnaStampaAlma = () => {
    window.open(rassegnaStampaAlmaPDF, '_blank')
  }

  return (
    <Fragment>
      <DrawerAppBar />
      <Box
        sx={{
          minHeight: window.innerHeight,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
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
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <Typography variant="h3" component="h1" align="center">
            Media
          </Typography>
          <Divider sx={{ width: '100%' }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginBottom: '2em',
            }}
          >
            <Box
              sx={{
                maxWidth: matchesSM ? '100%' : '600px',
                width: '100%',
              }}
            >
              <img
                src={pressPhoto}
                alt="CousCous a colazione"
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
            }}
          >
            <Typography variant="body1" align="left" paragraph>
              I CousCous a colazione sono un progetto che fonde sonorità pop a influenze world, elettroniche e hip-hop/R&amp;B, creando una nuova sonorità che rifiuta di appartenere a un solo stile, dando vita al POLYPOP, non un genere ma mutevole espressione di loro stessi.
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              La nascita della band risale al 2020, dall&apos;incontro tra la cantante mozambicana Wilma Fatima Matsombe ed il produttore Mattia Mennella. A completare la formazione si aggiungono Gioele Cangini (chitarra e cori), Antonio Casalino (batteria e drum pad) e Giacomo Cortesi (basso e synthbass).
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              I brani dei CousCous a colazione, nelle prime pubblicazioni, sono caratterizzati da elementi che traggono origini dal sound mediterraneo e dall&apos;Africa, il culmine di questa sonorità si ha con l&apos;EP &quot;Luce&quot; (2023)
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              Il sound della Band poi si evolve con l&apos;Album &quot;Alma&quot; (2026) andando in una direzione più cupa e malinconica, influenze più R&amp;B e Dark, mescolando sempre sonorità elettroniche, tipiche del loro POLYPOP.
            </Typography>
            <Typography variant="body1" align="left" paragraph>
              Dopo la pubblicazione dell&apos;EP &quot;Luce&quot; (2023), i Couscous a colazione iniziano a farsi sentire davvero passando per Afrobix Festival, Memorabilia Festival, Festival del Suono Buono, A Cielo Aperto Festival, Bada Fest, Barezzi Festival, Sghetto Club, Argo 16, Covo Club, Binario69, Cisim, Bravo Caffè, Hanabi, Arena delle Balle di Paglia, La Tenda Club, Bronson Club, Vibra Club, Bachelite Club, Off Topic, Vivi Fortezza, Rumors, Rumagna Unite fino a Es Gremi a Palma Di Maiorca.
            </Typography>
          </Box>
          <Divider sx={{ width: '100%' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
              width: '100%',
            }}
          >
            <Typography variant="h4" component="h2" align="left">
              Timeline Pubblicazioni
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5em',
                width: '100%',
              }}
            >
              <Typography variant="body1" align="left">
                08/01/26: Alma (LP)
              </Typography>
              <Typography variant="body1" align="left">
                23/10/25: Una vita a tre (singolo)
              </Typography>
              <Typography variant="body1" align="left">
                08/09/25: Arco-íris (singolo)
              </Typography>
              <Typography variant="body1" align="left">
                19/06/25: Sempre solə (singolo)
              </Typography>
              <Typography variant="body1" align="left">
                16/05/25: Secoli (singolo)
              </Typography>
              <Typography variant="body1" align="left">
                16/06/23: Luce (EP)
              </Typography>
              <Typography variant="body1" align="left">
                22/09/23: Conquista (singolo)
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ width: '100%' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2em',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: '1em',
                }}
              >
                <Box
                  sx={{
                    maxWidth: matchesSM ? '100%' : '300px',
                    width: '100%',
                  }}
                >
                  <img
                    src={almaCover}
                    alt="Alma Album Cover"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/alma-presskit"
                    fullWidth
                  >
                    Alma Press Kit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    onClick={handleOpenRassegnaStampaAlma}
                    fullWidth
                  >
                    Alma Rassegna Stampa
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: '1em',
                }}
              >
                <Box
                  sx={{
                    maxWidth: matchesSM ? '100%' : '300px',
                    width: '100%',
                  }}
                >
                  <img
                    src={luceCover}
                    alt="Luce EP Cover"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/luce-presskit"
                    fullWidth
                  >
                    Luce Press Kit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    onClick={handleOpenRassegnaStampa}
                    fullWidth
                  >
                    Luce Rassegna Stampa
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Fragment>
  )
}

export default PressKit

