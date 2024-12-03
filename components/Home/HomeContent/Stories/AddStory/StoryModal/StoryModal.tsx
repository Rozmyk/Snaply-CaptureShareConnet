'use client'

import { useElementSize } from '@mantine/hooks'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import TopActionBar from './TopActionBar/TopActionBar'
import BottomBar from './BottomBar/BottomBar'

interface StoryModalProps {
	isImageUploading: boolean
	fileUrl: string
	closeModal: () => void
	addStory: () => void
}

const StoryModal = ({ fileUrl, closeModal, addStory, isImageUploading }: StoryModalProps) => {
	const { ref: containerRef, width: containerWidth, height: containerHeight } = useElementSize()
	const [newWidth, setNewWidth] = useState(0)

	useEffect(() => {
		setNewWidth(Math.round((containerHeight * 9) / 16))
	}, [containerWidth, containerHeight])

	return (
		<div
			ref={containerRef}
			style={{
				height: '90vh',
				maxWidth: '855px',
				width: newWidth,
				maxHeight: '850px',
				overflow: 'hidden',
				position: 'relative',
			}}>
			<Image alt='' src={fileUrl} layout='fill' objectFit='cover' objectPosition='center'></Image>

			<TopActionBar closeModal={closeModal} />

			<BottomBar isImageUploading={isImageUploading} onClick={addStory} />
		</div>
	)
}

export default StoryModal
