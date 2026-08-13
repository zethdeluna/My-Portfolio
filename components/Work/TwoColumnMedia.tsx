interface TCMProps {
	className?: '' | 'medium' | 'small';
	img1: string;
	alt1?: string;
	img2: string;
	alt2?: string;
}

export function TwoColumnMedia({
	className,
	img1,
	alt1,
	img2,
	alt2
}: TCMProps) {

	return (
		<div className={`two-column-media ${className ? className : ''}`}>
			<div className="image-wrapper">
				<div className="image-container">
					<img src={img1} alt={alt1} /> 
				</div>
				<div className="image-container">
					<img src={img2} alt={alt2} /> 
				</div>
			</div>
		</div>
	);

};