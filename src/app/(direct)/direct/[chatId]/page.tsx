'use client'
import DirectPageContainer from '../../../../../components/Direct/DirectPageContainer/DirectPageContainer'
import DirectMobile from '../../../../../components/Direct/DirectMobile/DirectMobile'
import { useMediaQuery } from '@mantine/hooks'

interface PageProps {
	params: {
		chatId: string
	}
}

export default function Page({ params }: PageProps) {
	const { chatId } = params

	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	return isSmallScreen ? <DirectMobile chatId={chatId} /> : <DirectPageContainer chatId={chatId} />
}
