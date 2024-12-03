'use client'
import DirectPageContainer from '../../../../../components/Direct/DirectPageContainer/DirectPageContainer'
import { useMediaQuery } from '@mantine/hooks'
import DirectMobile from '../../../../../components/Direct/DirectMobile/DirectMobile'

export default function Page({ params }: { params: { chatId: string } }) {
	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	return params.chatId && isSmallScreen ? (
		<DirectMobile chatId={params.chatId} />
	) : (
		<DirectPageContainer chatId={params.chatId} />
	)
}
