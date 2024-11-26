import React from 'react'
import { Flex, Anchor } from '@mantine/core'
import Image from 'next/image'
import NoPosts from '../NoPosts/NoPosts'
import { PostProps } from '../../../types'
import { useElementSize } from '@mantine/hooks'
interface UserPostsProps {
	userPost: PostProps[]
	username: string
}
const UserPosts = ({ userPost, username }: UserPostsProps) => {
	const { ref, width } = useElementSize()
	const photoSize = width / 3
	return (
		<Flex ref={ref} w={'100%'} mb='sm' gap='2px'>
			{userPost.length <= 0 ? (
				<NoPosts username={username} />
			) : (
				userPost.map((post, index) => (
					<Anchor href={`/post/${post.id}`} key={post.id}>
						<Image src={post.image} width={photoSize} height={photoSize} alt={`Post ${index}`} />
					</Anchor>
				))
			)}
		</Flex>
	)
}
export default UserPosts
