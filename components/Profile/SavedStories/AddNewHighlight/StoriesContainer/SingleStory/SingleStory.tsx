'use client'
import React, { useState } from 'react'
import { Box, Flex, Text } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { Timestamp } from 'firebase-admin/firestore'

interface SingleStoryProps {
	image: string
	createdAt: Timestamp
	onClick: () => void
	storySize: number
}

const SingleStory = ({ image, createdAt, onClick, storySize }: SingleStoryProps) => {
	const [isSelected, setIsSelected] = useState(false)
	const date = createdAt.toDate()
	const monthName = date.toLocaleString('en-us', { month: 'short' })
	const day = date.getDate()

	const handleClick = () => {
		setIsSelected(!isSelected)
		onClick()
	}

	return (
		<Box onClick={handleClick} w={storySize} h={200} sx={{ position: 'relative' }}>
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					right: 0,
					left: 0,
					backgroundImage: `url(${image})`,
					backgroundOrigin: 'border-box',
					width: '100%',
					height: '100%',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}></div>
			<Box
				sx={{
					position: 'absolute',
					zIndex: 10,
					width: '100%',
					height: '100%',
					backgroundColor: isSelected ? 'rgba(255,255,255,0.5)' : 'none',
				}}>
				<Flex justify='space-between' w='100%'>
					<Flex
						m='5px'
						w={42}
						h={42}
						direction='column'
						gap='none'
						justify='center'
						align='center'
						sx={{ backgroundColor: 'black', borderRadius: '10px' }}>
						<Text fz='md' fw={600}>
							{day}
						</Text>
						<Text tt='uppercase' fz='10px'>
							{monthName}
						</Text>
					</Flex>
					<Flex
						justify='center'
						align='center'
						m={5}
						sx={{
							borderRadius: '50%',
							border: '1.5px solid white',
							width: 20,
							height: 20,
							backgroundColor: isSelected ? '#0095f6' : 'none',
						}}>
						{isSelected && <IconCheck stroke={2} size={12} />}
					</Flex>
				</Flex>
			</Box>
		</Box>
	)
}

export default SingleStory
