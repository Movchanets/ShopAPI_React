import { CardHeader, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactFragment, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useTypedSelector } from '../../../hooks/useTypedSelector';


import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { IProduct, baseURL } from '../../../types/types';
import NotFound from '../../NotFound';



function Product() {

	let { title } = useParams();
	//const { GetPost } = useActions();
	const { productOnPage } = useTypedSelector((state) => state.productReducer);
	const [Loading, setLoading] = useState(true);
	const useComponentWillMount = (cb: any) => {
		const willMount = useRef(true)

		if (willMount.current) cb()

		willMount.current = false;





	}

	useComponentWillMount(() => {
		let str: any = title?.toString();
		const fetchData = async () => {
			//	await GetProduct(str?.split('_').join(' '));
			setLoading(false);

		}
		fetchData();

	});
	if (productOnPage != null) {
		return (
			<Container>
				<Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>

					<Typography variant="h1" >{productOnPage.Name}</Typography>

					<div>
						<Grid container spacing={2}>

							<Grid item xs={4} md={4}>
								<Typography variant="body2" color="text.secondary">
									author : {productOnPage.Manufacturer}
								</Typography>
							</Grid>
							<Grid item xs={4} md={4}>
								<Typography variant="body2" color="text.secondary">
									{productOnPage.Price}
								</Typography>
							</Grid>
							<Grid item xs={4} md={4}>
								<Typography variant="body2" color="text.secondary">
									{productOnPage.Category}
								</Typography>
							</Grid>

						</Grid>

					</div>

				</Box>
				<CardMedia
					component="img"
					height="400"
					image={baseURL + + productOnPage.Image}
					alt="NO IMAGE"
				/>
				<Typography variant="body2" color="text.secondary">
					{productOnPage.ShortDescription}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{productOnPage.Description}
				</Typography>
				<div>
					{parse(productOnPage.HTMLbody)}
				</div>
			</Container >
		)
	}
	if (productOnPage == null && Loading == false) {
		return <NotFound />;
	}
	return (
		<> </>
	);
}
export default Product;

