import { ActionIcon, Popover, useMantineColorScheme } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'
import { useState } from 'react'

const MoreSettingsIcon = () => {
	const [opened, setOpened] = useState(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Popover opened={opened} onChange={setOpened}>
			<Popover.Target>
				<ActionIcon onClick={() => setOpened(o => !o)} size='md'>
					<IconDots style={{ color: dark ? 'white' : '#000101' }} size='1.125rem' />
				</ActionIcon>
			</Popover.Target>

			<Popover.Dropdown>Unsend</Popover.Dropdown>
		</Popover>
	)
}

export default MoreSettingsIcon
