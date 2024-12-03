import DirectPageContainer from '../../../../../components/Direct/DirectPageContainer/DirectPageContainer'
import DirectMobile from '../../../../../components/Direct/DirectMobile/DirectMobile'
import { useMediaQuery } from '@mantine/hooks'

interface PageProps {
	params: {
		chatId: string
	}
}

export default async function Page({ params }: PageProps) {
	const { chatId } = params

	const chatExists = true

	if (!chatExists) {
		throw new Error('Chat not found')
	}

	const isSmallScreen = useMediaQuery('(max-width: 720px)')

	return isSmallScreen ? <DirectMobile chatId={chatId} /> : <DirectPageContainer chatId={chatId} />
}
