import { useMantineColorScheme } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { useDisclosure } from '@mantine/hooks'
import AccountModal from './AccountModal/AccountModal'
import UserMenu from './UserMenu/UserMenu'

const SwitchAccountButton = () => {
	const session = useSession()
	const username = session?.data?.user?.username
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'

	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<AccountModal opened={opened} close={close} dark={dark} />
			{username && <UserMenu username={username} dark={dark} open={open} />}
		</>
	)
}

export default SwitchAccountButton
