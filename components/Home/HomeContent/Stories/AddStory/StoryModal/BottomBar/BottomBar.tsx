import { Flex, UnstyledButton, Avatar, Text, Loader } from '@mantine/core'
import { useSession } from 'next-auth/react'
interface BottomBarProps {
	onClick: () => void
	isImageUploading: boolean
}
const BottomBar = ({ onClick, isImageUploading }: BottomBarProps) => {
	const session = useSession()
	const userImage = session?.data?.user?.image
	const buttonStyles = {
		backgroundColor: '#ececedcc',
		color: '#2c2d2d',
		borderRadius: '20px',
		fontWeight: 500,
		width: '100%',
	}
	return (
		<Flex justify='space-between' gap='md' p='sm' sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
			<UnstyledButton p='xs' sx={buttonStyles} onClick={onClick}>
				<Flex gap='xs' justify='center' align='center' p={0} m={0}>
					{isImageUploading ? (
						<Loader size='xs' color='gray' />
					) : (
						<>
							<Avatar sx={{ border: '2px solid #ececed' }} size='sm' radius={'50%'} src={userImage}></Avatar>
							<Text fz='sm' color='black'>
								Add to story
							</Text>
						</>
					)}
				</Flex>
			</UnstyledButton>
		</Flex>
	)
}

export default BottomBar
