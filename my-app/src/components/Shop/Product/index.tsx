import { CardHeader, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactFragment, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useTypedSelector } from '../../../hooks/useTypedSelector';


import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { IProduct, baseURL } from '../../../types/types';
import NotFound from '../../NotFound';
import { useActions } from '../../../store/Action-Creators/useActions';



function Product() {

	let { title } = useParams();
	const { Product } = useActions();
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

			Product(str);
			setLoading(false);

		}
		fetchData();

	});
	if (productOnPage != null) {
		return (
			<Container>
				<Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
					<Typography variant="h1" >{productOnPage.name}</Typography>
					<div>
						<Grid container spacing={2}>
							<Grid item xs={4} md={4}>
								<Typography variant="body2" color="text.secondary">
									author : {productOnPage.manufacturer}
								</Typography>
							</Grid>
							<Grid item xs={4} md={4}>
								<Typography variant="body2" color="text.secondary">
									{productOnPage.price}
								</Typography>
							</Grid>
							<Grid item xs={4} md={4}>
								<Typography variant="body2" color="text.secondary">
									{productOnPage.category}
								</Typography>
							</Grid>

						</Grid>

					</div>

				</Box>
				<CardMedia
					component="img"
					height="400"
					image={baseURL + productOnPage.image}
					alt="NO IMAGE"
				/>
				<Typography variant="body2" color="text.secondary">
					{productOnPage.shortDescription}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{productOnPage.description}
				</Typography>
				{/* <div>
					{parse(productOnPage.hTMLbody)}
				</div> */}
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

