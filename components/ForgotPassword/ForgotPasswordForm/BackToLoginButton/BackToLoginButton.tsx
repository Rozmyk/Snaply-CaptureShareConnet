import { Button } from '@mantine/core'
import { useRouter } from 'next/navigation'
const BackToLoginButton = () => {
	const router = useRouter()
	return (
		<Button
			size='lg'
			onClick={() => {
				router.push('/login')
			}}
			sx={{
				backgroundColor: '#fbfbfa',
				color: '#262727',
				border: '1px solid #DBDBDB',
				fontSize: 14,
				'&:hover': {
					backgroundColor: '#eee',
				},
			}}>
			Back to login
		</Button>
	)
}

export default BackToLoginButton
