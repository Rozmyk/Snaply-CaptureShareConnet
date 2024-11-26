'use client'
import { FileButton, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react'
import { Dispatch, SetStateAction } from 'react'
const SendPhoto = ({
	setFile,
	setPhotoUrl,
}: {
	setFile: Dispatch<SetStateAction<File | null>>
	setPhotoUrl: Dispatch<SetStateAction<string>>
}) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<FileButton
			onChange={(e: File) => {
				setFile(e)
				setPhotoUrl(URL.createObjectURL(e))
			}}
			accept='image/png,image/jpeg'>
			{props => (
				<ActionIcon {...props}>
					<IconPhoto style={{ color: dark ? 'white' : 'black' }} />
				</ActionIcon>
			)}
		</FileButton>
	)
}

export default SendPhoto
