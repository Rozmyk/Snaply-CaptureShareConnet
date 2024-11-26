import { Flex, Text, useMantineColorScheme, Box } from '@mantine/core'
import Link from 'next/link'
import getTimeDifference from '../../../utils/getTimeDifference'
import ShowUserDetails from '../../ShowUserDetails/ShowUserDetails'
import UserAvatar from '../../UserAvatar/UserAvatar'
import HighlightText from '../../HighlightText.tsx/HighlightText'
import { DescriptionDataProps } from '../../../types'
import { useElementSize } from '@mantine/hooks'
interface DetailsDescriptionProps {
	maxWidth: number
	descriptionData: DescriptionDataProps
}
const DetailsDescription = ({ descriptionData, maxWidth }: DetailsDescriptionProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	const { ref: avatarRef, width: avatarWidth } = useElementSize()
	return (
		<Box maw={maxWidth} mb='xs' mt='xs'>
			<Flex justify='space-between' align='flex-start' w='100%' pr='sm' pl='sm'>
				<Flex justify='center' align='flex-start'>
					<div ref={avatarRef}>
						<Box mr='sm'>
							<ShowUserDetails userDetailsId={descriptionData.addedBy}>
								<UserAvatar
									size={35}
									src={descriptionData.userImage}
									alt={`${descriptionData.username} profile photo`}></UserAvatar>
							</ShowUserDetails>
						</Box>
					</div>
					<Flex direction='column'>
						<Box>
							<Text fz='sm' sx={{ maxWidth: maxWidth - avatarWidth - 30, overflowWrap: 'break-word' }}>
								<ShowUserDetails userDetailsId={descriptionData.addedBy}>
									<Text
										fz='sm'
										color={dark ? '#f5f5f5' : '#262626'}
										fw={700}
										mr='5px'
										component={Link}
										href={`/profile/${descriptionData.username}`}>
										{`${descriptionData.username} `}
									</Text>
								</ShowUserDetails>

								<HighlightText
									mentionedUsers={descriptionData.mentionedUsers}
									mentionedTags={descriptionData.mentionedTags}
									text={descriptionData.caption}></HighlightText>
							</Text>
							<Flex mt='xs' direction='row' justify='flex-start' align='center' gap='sm'>
								<Text color='dark.2' fz='xs'>
									{getTimeDifference(descriptionData.createdAt)}
								</Text>
							</Flex>
						</Box>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}

export default DetailsDescription
