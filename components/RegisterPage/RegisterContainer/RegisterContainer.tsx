import { Flex } from '@mantine/core'
import RegisterHeader from '../RegisterHeader/RegisterHeader'
import RegisterForm from '../RegisterForm/RegisterForm'

import LoginAnchor from '../LoginAnchor/LoginAnchor'
const RegisterContainer = () => {
	return (
		<Flex justify='center' align='center'>
			<Flex mt='sm' sx={{ maxWidth: '350px' }} justify='center' align='center' direction='column' gap='md'>
				<Flex direction='column' justify='center' align='center' p='xl' sx={{ border: '1px solid #DBDBDB' }}>
					<RegisterHeader />

					<RegisterForm />
				</Flex>
				<LoginAnchor />
			</Flex>
		</Flex>
	)
}

export default RegisterContainer
