'use client'
import MessageSection from '../DirectPageContainer/MessagesSection/MessageSection'
import DirectPageContainer from '../DirectPageContainer/DirectPageContainer'
interface DirectMobileProps {
	chatId: string | null
}
const DirectMobile = ({ chatId }: DirectMobileProps) => {
	return chatId ? <DirectPageContainer chatId={chatId} /> : <MessageSection />
}

export default DirectMobile
