'use client'
import { useEventListener } from '@mantine/hooks'
import { useState } from 'react'
import { IconHeartFilled } from '@tabler/icons-react'
import { Box, useMantineColorScheme } from '@mantine/core'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface PostContentProps {
	image: string
	addLikeToPost: () => void
	isLiked: boolean
}

const PostContent = ({ image, addLikeToPost, isLiked }: PostContentProps) => {
	const [showIcon, setShowIcon] = useState(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const handleDoubleClick = async () => {
		{
			!isLiked && (await addLikeToPost())
			setShowIcon(true)
			setTimeout(() => {
				setShowIcon(false)
			}, 1500)
		}
	}

	const ref = useEventListener('dblclick', handleDoubleClick)

	return (
		<Box
			sx={{
				position: 'relative',
				border: `1px solid ${dark ? '#272726' : '#efeeee'}`,
				borderRadius: '5px',
				overflow: 'hidden',
				width: '100%',
			}}>
			<AnimatePresence>
				{showIcon && (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							position: 'absolute',
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
							zIndex: 5,
						}}>
						<motion.div
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							transition={{ duration: 0.15 }}>
							<IconHeartFilled style={{ color: '#FF3040' }} size='5em' />
						</motion.div>
					</Box>
				)}
			</AnimatePresence>
			<div style={{ position: 'relative', width: '100%', height: 450 }}>
				<Image fill alt='user photo' ref={ref} src={image} />
			</div>
		</Box>
	)
}

export default PostContent
