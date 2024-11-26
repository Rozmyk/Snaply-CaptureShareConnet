import { Flex, Text, useMantineColorScheme } from '@mantine/core'
import DescriptionLink from './DescriptionLink/DescriptionLink'

interface ProfileDescriptionProps {
	name: string
	description: string
	descriptionLink: string
}
const ProfileDescription = ({ name, description, descriptionLink }: ProfileDescriptionProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex direction='column' gap={0} justify='flex-start' align='flex-start'>
			<Text fz={14} fw={600} color={dark ? 'white' : 'black'}>
				{name}
			</Text>
			<Text fz={14} fw={500} maw='100%' w='100%' color={dark ? 'white' : 'black'}>
				{description}
			</Text>
			{descriptionLink && <DescriptionLink link={descriptionLink} />}
		</Flex>
	)
}

export default ProfileDescription
