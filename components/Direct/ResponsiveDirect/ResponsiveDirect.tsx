'use client'
import { useMediaQuery } from '@mantine/hooks'
import DirectMobile from '../DirectMobile/DirectMobile'
import DirectPageContainer from '../DirectPageContainer/DirectPageContainer'
const ResponsiveDirect = () => {
	const isSmallScreen = useMediaQuery('(max-width: 720px)')
	return <>{isSmallScreen ? <DirectMobile chatId={null} /> : <DirectPageContainer />}</>
}

export default ResponsiveDirect
