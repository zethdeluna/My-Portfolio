"use client";

interface FWMProps {
	mediaType: 'image' | 'video';
	src: string;
	alt?: string;
}

export function FullWidthMedia({
	mediaType,
	src,
	alt
}: FWMProps) {

	return (
		<div className="full-width-media" data-type={mediaType}>
			<div className="media-container">
				{mediaType === 'image' 
					? <img src={src} alt={alt} />
					: <video autoPlay loop muted><source src={src} type="video/mp4"/>Your browser does not support the video tag.</video>
				}
			</div>
		</div>
	);

};