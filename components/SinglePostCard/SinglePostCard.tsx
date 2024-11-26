import { BackgroundImage, Box, Text, Group, Flex } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import Link from 'next/link'
import { IconHeartFilled, IconMessageCircle2Filled } from '@tabler/icons-react'
import { PostProps } from '../../types'
interface SinglePostCardProps extends PostProps {
	size: number
	comments: number
}
const SinglePostCard = ({ image, likes, comments, id, size, hideLikes }: SinglePostCardProps) => {
	const { hovered, ref } = useHover()
	return (
		<div style={{ cursor: 'pointer' }}>
			<Link href={`/post/${id}`}>
				<Box maw={size} mah={size} ref={ref} pos='relative'>
					<BackgroundImage src={image}>
						<Box w={size} h={size}>
							{hovered ? (
								<Box
									sx={{
										backgroundColor: 'rgba(0, 0, 0, 0.35)',
										position: 'absolute',
										right: 0,
										left: 0,
										top: 0,
										bottom: 0,
									}}>
									<Flex justify='center' align='center' h='100%' gap='xl' style={{ color: 'white' }}>
										{!hideLikes && (
											<Group spacing='5px'>
												<IconHeartFilled size={20}></IconHeartFilled>
												<Text fw={600} fz={16}>
													{likes ? likes.length : 0}
												</Text>
											</Group>
										)}

										<Group spacing='5px'>
											<IconMessageCircle2Filled size={20}></IconMessageCircle2Filled>
											<Text fw={600} fz={16}>
												{comments ? comments : 0}
											</Text>
										</Group>
									</Flex>
								</Box>
							) : null}
						</Box>
					</BackgroundImage>
				</Box>
			</Link>
		</div>
	)
}

export default SinglePostCard
