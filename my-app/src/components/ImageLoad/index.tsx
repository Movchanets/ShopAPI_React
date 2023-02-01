import React, { useEffect, useState } from 'react';

function UploadFile() {
	const [file, setFile] = useState<string | undefined>("");
	const [dimensionWidth, setDimensionWidth] = useState(0);
	const [dimensionHeight, setDimensionHeight] = useState(0);

	const handleChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	): Promise<any> => {
		// const { target } = event;
		// const img = new Image();
		// const img = new Imaif (!e.target.files) return;ge();
		if (!event.target.files) return
		const ImageName = event.target.value.split('\\')[2];
		const Image = event.target.value;
		console.log('Imageon Kevel: ', Image); // Image on Kevel
		console.log('ImageName on Kevel: ', ImageName); // ImageName on Kevel
		console.log('ImageLink on Kevel: ', event.target.value); // ImageLink on Kevel
		console.log('event current Target files: ', event.target.files[0]);

		const fileLoaded = URL.createObjectURL(event.target.files[0]);
		const files = event.target.files;

		console.log('files: ', files);
		const dimensions = await someFunction(fileLoaded);
		setDimensionWidth(dimensionWidth);
		setDimensionHeight(dimensionHeight);
		console.log('dimensions: ', dimensions);
		console.log('dimensions width: ', dimensionWidth);
		console.log('dimensions height: ', dimensionHeight);
		setFile(fileLoaded);
	};
	const getHeightAndWidthFromDataUrl = (dataURL: string) =>
		new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				resolve({
					height: img.height,
					width: img.width,
				});
			};
			img.src = dataURL;
		});
	// Get dimensions
	const someFunction = async (file: any) => {
		console.log('file: ', file);
		const dimensions = await getHeightAndWidthFromDataUrl(file);
		return dimensions;
	};

	return (
		<div>
			<input
				type="file"
				onChange={handleChange}
				accept="image/jpg,.gif,.png,.svg,.webp audio/wav,.mp3"
			/>
			<img
				src={file}
				style={{
					display: 'flex',
					border: '2px solid tomato',
					maxWidth: '300px',
					maxHeight: '300px',
				}}
			/>
			{file && <p>Dimensions: {`${dimensionWidth} x ${dimensionHeight}`}</p>}
		</div>
	);
}

export default UploadFile;
export const ImagesUpload = () => {
	// const files = [];

	// const uploadImage = (e: any) => {
	// 	files.push(e.target.files[0]);
	// 	let id =0';
	// 	arr.push(<div><img src="" alt="" />
	// 		<input type="file" id={id+'file'} onChange={()=>uploadImage()} /></div>)
	// }
	// const arr = [<div><input type="file" onChange={uploadImage} /></div>]
	// return (
	// 	<>
	// 		{arr}
	// 	</>
	// );
};