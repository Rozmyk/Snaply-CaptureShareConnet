import { Anchor, Text, Flex, useMantineColorScheme } from '@mantine/core'
import { IconLink } from '@tabler/icons-react'
interface DescriptionLinkProps {
	link: string
}
const DescriptionLink = ({ link }: DescriptionLinkProps) => {
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Anchor target='_blank' fw={700} href={`https://${link}`} fz={14} color={dark ? '#E0F1FF' : '#00376B'}>
			<Flex justify='center' align='center'>
				<IconLink color={dark ? '#E0F1FF' : '#00376B'} size={14} />
				<Text ml='5px'>{link}</Text>
			</Flex>
		</Anchor>
	)
}

export default DescriptionLink
