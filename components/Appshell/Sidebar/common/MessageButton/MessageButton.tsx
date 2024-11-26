import NavbarItemDesktop from '../../NavbarItem/NavbarItemDesktop'
import NavbarItemTablet from '../../NavbarItem/NavbarItemTablet'
import MessageIcon from './MessageIcon/MessageIcon'
interface MessageButtonProps {
	variant: string
	onClick: () => void
}
const MessageButton = ({ variant, onClick }: MessageButtonProps) => {
	return (
		<>
			{variant === 'tablet' && <NavbarItemTablet onClick={onClick} label='Messages' icon={MessageIcon} />}
			{variant === 'desktop' && <NavbarItemDesktop onClick={onClick} label='Messages' icon={MessageIcon} />}
		</>
	)
}

export default MessageButton
