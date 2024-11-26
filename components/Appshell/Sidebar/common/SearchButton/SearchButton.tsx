import NavbarItemDesktop from '../../NavbarItem/NavbarItemDesktop'
import NavbarItemTablet from '../../NavbarItem/NavbarItemTablet'
import { IconSearch } from '@tabler/icons-react'
interface SearchButtonProps {
	variant: string
	onClick: () => void
}
const SearchButton = ({ variant, onClick }: SearchButtonProps) => {
	return (
		<>
			{variant === 'tablet' && <NavbarItemTablet onClick={onClick} label='Search' icon={IconSearch} />}
			{variant === 'desktop' && <NavbarItemDesktop onClick={onClick} label='Search' icon={IconSearch} />}
		</>
	)
}

export default SearchButton
