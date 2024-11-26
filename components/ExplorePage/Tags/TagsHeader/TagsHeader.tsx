'use client'
import { Avatar, Flex, Text, useMantineColorScheme } from '@mantine/core'
import CustomButton from '../../../CustomButton/CustomButton'
import { PostProps } from '../../../../types'
interface TagsHeaderProps {
	tag: string
	postsLength: number
	lastPost: PostProps
}
const TagsHeader = ({ tag, postsLength, lastPost }: TagsHeaderProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex gap='xl' justify='center' align='center' maw={'100%'}>
			{lastPost.image && <Avatar size={152} radius={'50%'} src={lastPost.image}></Avatar>}
			<Flex direction='column' sx={{ width: '100%' }}>
				<Text sx={{ wordWrap: 'break-word' }} color={dark ? 'white' : 'black'} size={30}>{`#${tag}`}</Text>
				<Text color={dark ? 'white' : 'black'} mb='xl' fz={16}>
					<span style={{ fontWeight: 600 }}>{postsLength}</span> posts
				</Text>

				<CustomButton disabled onClick={() => {}}>
					Follow
				</CustomButton>
			</Flex>
		</Flex>
	)
}

export default TagsHeader
