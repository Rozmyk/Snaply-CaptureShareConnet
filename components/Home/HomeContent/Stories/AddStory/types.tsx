export type variantInputProps = 'transparent' | 'backgroundColor' | 'fontColor'
export type textAlignVariant = 'left' | 'center' | 'right'
export type allFontProps = 'Arial' | 'Impact' | 'American Typewriter' | 'Brush Script MT, cursive'
export type displayModeVariant = 'color' | 'font'
export interface coordinatesProps {
	x: number
	y: number
}
export interface temporaryColorsProps {
	color: string
	backgroundColor: string
}
export type allColorsProps =
	| '#fcca5c'
	| '#fd8d32'
	| '#d10968'
	| '#a207bb'
	| '#0095f6'
	| '#58c322'
	| '#000101'
	| '#ffffff'
