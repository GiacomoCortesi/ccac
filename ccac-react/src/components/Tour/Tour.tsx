import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import { IEvent } from '../../models/event'
import { useGetAllEvents } from '../../services/api-event-service'
import DrawerAppBar from '../AppBar/DrawerAppBar'
import Concert from '../Concert/Concert'
import Loading from '../Loading/Loading'
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay'

const Tour = () => {
  const { data, error, isLoading } = useGetAllEvents()
  return (
    <div>
      <>
        {isLoading && <Loading />}
        {error && <ErrorDisplay error={error} />}
        <DrawerAppBar />
        {/*<Box style={{ backgroundImage: `url(${bgCous})`}} sx={{height: window.innerHeight, width: "100%"}}>*/}
        {/*    <TableContainer component={Box} sx={{flexDirection: "column", margin: "auto", width: "75%", padding: "7.5em"}}>*/}
        {/*        <Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
        {/*            <TableBody>*/}
        {/*        {data && Array.isArray(data.events) && data.events.map((item:IEvent, index)=> (*/}
        {/*            <Concert key={index} event={item}></Concert>*/}
        {/*        ))}*/}
        {/*            </TableBody>*/}
        {/*        </Table>*/}
        {/*    </TableContainer>*/}
        {/*</Box>*/}
        <Box sx={{ height: window.innerHeight, width: '100%' }}>
          <Box sx={{ padding: '9.5em' }}>
            {data &&
              Array.isArray(data.events) &&
              data.events.map((item: IEvent, index) => (
                <div key={index}>
                  <>
                    <Concert event={item} />
                    <Divider />
                  </>
                </div>
              ))}
          </Box>
        </Box>
      </>
    </div>
  )
}

export default Tour
