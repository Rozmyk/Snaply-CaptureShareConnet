import { Flex, Indicator, Avatar, CloseButton } from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react'
import { Dispatch, SetStateAction } from 'react'
interface PhotoUploadProps {
	photoUrl: string
	setFile: Dispatch<SetStateAction<File | null>>
}
const PhotoUpload = ({ photoUrl, setFile }: PhotoUploadProps) => (
	<Flex gap='xs'>
		<Indicator
			offset={2}
			color='none'
			size='lg'
			label={<CloseButton onClick={() => setFile(null)} size='xs' radius={'50%'} sx={{ border: '1px solid white' }} />}>
			<Avatar color='#222527' src={photoUrl}></Avatar>
		</Indicator>
		<Avatar>
			<IconPhoto />
		</Avatar>
	</Flex>
)

export default PhotoUpload
