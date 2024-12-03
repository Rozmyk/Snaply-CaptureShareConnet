import { Flex, Avatar, Text, FileButton, useMantineColorScheme } from '@mantine/core'
import CustomButton from '../../../../../CustomButton/CustomButton'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'
interface CustomPhotoProps {
	temporaryPhoto: File | null
	setTemporaryPhoto: Dispatch<SetStateAction<File | null>>
}
const ChangePhoto = ({ temporaryPhoto, setTemporaryPhoto }: CustomPhotoProps) => {
	const session = useSession()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const userPhoto = session?.data?.user?.image
	const username = session?.data?.user?.username
	const name = session?.data?.user?.name
	return (
		<Flex
			mt='md'
			mb='md'
			p='lg'
			sx={{
				backgroundColor: 'transparent',
				borderRadius: '15px',
				border: dark ? '1px solid #323539' : '1px solid  #dbdfE4 ',
			}}
			justify='space-between'
			align='center'>
			<Flex gap='md' align='center'>
				<Avatar
					sx={{ width: 56, height: 56, borderRadius: '50%' }}
					src={temporaryPhoto ? URL.createObjectURL(temporaryPhoto) : userPhoto}></Avatar>
				<Flex direction='column'>
					<Text fw={700} fz={16} color={dark ? 'white' : 'black'}>
						{username}
					</Text>
					<Text fz={14} color='#737373'>
						{name}
					</Text>
				</Flex>
			</Flex>
			<FileButton onChange={setTemporaryPhoto} accept='image/png,image/jpeg'>
				{props => <CustomButton {...props}>Change photo</CustomButton>}
			</FileButton>
		</Flex>
	)
}

export default ChangePhoto
