import { Flex } from '@mantine/core'
import MessageStarter from './MessageStarter/MessageStarter'
import { ReactNode } from 'react'

interface LoadingWrapperProps {
	chatId: string
	messagesLength: number
	children: ReactNode
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ chatId, messagesLength, children }) => {
	return (
		<Flex h='100%' direction='column' justify='center' align='center'>
			{!chatId && !messagesLength ? <MessageStarter /> : children}
		</Flex>
	)
}

export default LoadingWrapper
