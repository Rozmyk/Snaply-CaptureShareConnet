'use client'
import useImage from 'use-image'
import { useElementSize } from '@mantine/hooks'
import { Stage, Layer, Image } from 'react-konva'
import React, { useEffect, useRef, useState } from 'react'
import TopActionBar from './TopActionBar/TopActionBar'
import BottomBar from './BottomBar/BottomBar'
interface BackgroundImageProps {
	imageUrl: string
	height: number
	width: number
}

interface StoryModalProps {
	isImageUploading: boolean
	fileUrl: string
	closeModal: () => void
	addStory: (dataURL: string) => void
}

const BackgroundImage = ({ imageUrl, height, width }: BackgroundImageProps) => {
	const [image] = useImage(imageUrl)
	const [scale, setScale] = useState(1)

	const [x, setX] = useState(0)
	const [y, setY] = useState(0)

	useEffect(() => {
		if (image) {
			const scaleX = width / image.width
			const scaleY = height / image.height
			const newScale = Math.max(scaleX, scaleY)

			setScale(newScale)
			setX((width - image.width * newScale) / 2)
			setY((height - image.height * newScale) / 2)
		}
	}, [image, width, height])

	return <Image image={image} alt='stories photo' x={x} y={y} scaleX={scale} scaleY={scale} crossOrigin='anonymous' />
}

const StoryModal = ({ fileUrl, closeModal, addStory, isImageUploading }: StoryModalProps) => {
	const stageRef = useRef<any>(null)
	const layerRef = useRef<any>(null)
	const { ref: containerRef, width: containerWidth, height: containerHeight } = useElementSize()
	const [newWidth, setNewWidth] = useState(0)

	useEffect(() => {
		setNewWidth(Math.round((containerHeight * 9) / 16))
	}, [containerWidth, containerHeight])

	const getStageImage = () => {
		try {
			const stage = stageRef.current
			if (stage) {
				const dataURL = stage.toDataURL({
					mimeType: 'image/png',
					quality: 0.8,
				})
				addStory(dataURL)
				return dataURL
			}
		} catch (error) {
			console.error(error)
			return null
		}
	}

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
			{containerWidth && (
				<Stage width={newWidth} maxW height={containerHeight} ref={stageRef}>
					<Layer ref={layerRef}>
						{fileUrl && <BackgroundImage height={containerHeight} width={newWidth} imageUrl={fileUrl} />}
					</Layer>
				</Stage>
			)}

			<TopActionBar closeModal={closeModal} />

			<BottomBar isImageUploading={isImageUploading} onClick={getStageImage} />
		</div>
	)
}

export default StoryModal
