import { Flex } from '@mantine/core'
import MoreSettingsIcon from './Icons/MoreSettingsIcon/MoreSettingsIcon'
import AddReaction from '../AddReaction/AddReaction'
import ReplyIcon from './Icons/ReplyIcon/ReplyIcon'
import { Dispatch, SetStateAction } from 'react'
import { ReplyDataProps, SingleMessageProps } from '../../../../../../types'
interface SingleMessageOnHoverProps {
	isLoggedUserId: boolean
	chatId: string
	messageId: string
	setReplyToUser: Dispatch<SetStateAction<ReplyDataProps>>
	message: SingleMessageProps
}
const SingleMessageOnHover = ({
	isLoggedUserId,
	chatId,
	messageId,
	setReplyToUser,
	message,
}: SingleMessageOnHoverProps) => {
	return (
		<Flex gap='5px' direction={isLoggedUserId ? 'row-reverse' : 'row'}>
			<AddReaction chatId={chatId} messageId={messageId} />
			<ReplyIcon setReplyToUser={setReplyToUser} message={message}></ReplyIcon>
			<MoreSettingsIcon />
		</Flex>
	)
}

export default SingleMessageOnHover
