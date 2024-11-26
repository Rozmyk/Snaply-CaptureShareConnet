import { Flex, Divider } from '@mantine/core'
import RegisterHeader from '../RegisterHeader/RegisterHeader'
import RegisterForm from '../RegisterForm/RegisterForm'
import GoogleButtonReverse from '../../GoogleButton/GoogleButtonReverse/GoogleButtonReverse'
import LoginAnchor from '../LoginAnchor/LoginAnchor'
const RegisterContainer = () => {
	return (
		<Flex justify='center' align='center'>
			<Flex mt='sm' sx={{ maxWidth: '350px' }} justify='center' align='center' direction='column' gap='md'>
				<Flex direction='column' justify='center' align='center' p='xl' sx={{ border: '1px solid #DBDBDB' }}>
					<RegisterHeader />
					<GoogleButtonReverse />

					<Divider
						sx={{ fontWeight: 600, color: '#737373', width: '100%' }}
						my='xs'
						label='OR'
						labelPosition='center'
					/>
					<RegisterForm />
				</Flex>
				<LoginAnchor />
			</Flex>
		</Flex>
	)
}

export default RegisterContainer
