import { Flex, Text, CloseButton } from '@mantine/core'
import { ReplyDataProps } from '../../../../../../../types'
import { Dispatch, SetStateAction } from 'react'
interface ReplyInfoProps {
	replyToUser: ReplyDataProps
	setReplyToUser: Dispatch<SetStateAction<ReplyDataProps>>
	dark: boolean
	replyToYourself: boolean
}
const ReplyInfo = ({ replyToUser, dark, replyToYourself, setReplyToUser }: ReplyInfoProps) => (
	<Flex justify='space-between' sx={{ borderTop: `1px solid ${dark ? '#232323' : '#dadbda'}` }} p='xs'>
		<Flex direction='column'>
			<Text fz={14}>
				Replying to <span style={{ fontWeight: 500 }}>{replyToYourself ? 'yourself' : replyToUser.username}</span>
			</Text>
			<Text fz='sm' color='#B0B3B8'>
				{replyToUser.attachments ? 'attachment' : replyToUser.content}
			</Text>
		</Flex>
		<CloseButton
			style={{ color: dark ? 'white' : 'black' }}
			onClick={() =>
				setReplyToUser({
					content: '',
					isReplyToMessage: false,
					attachments: null,
					sender: '',
					messageType: '',
					messageId: '',
					username: '',
				})
			}
		/>
	</Flex>
)

export default ReplyInfo
