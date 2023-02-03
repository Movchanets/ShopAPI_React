import React, { useEffect, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, Avatar, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Container, Grid, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, TextField, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Select as SelectMui } from '@mui/material'
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Copyright from '../Copyright';
import { IProduct, ISearch, baseURL } from '../../types/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../store/Action-Creators/useActions';
import { string } from 'yup';
import { display } from '@mui/system';
import { toast } from 'react-toastify';


type OptionType = {
	value: string;
	label: string;
};
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '30ch',
			'&:focus': {
				width: '40ch',
			},
		},
	},
}));
const ProductPreview: React.FC<any> = (product: any) => {

	const src = product.name.split(' ').join('_');

	return (
		<>
			<Card sx={{ width: '18%', margin: '5px' }}>
				<CardHeader

					sx={{ height: '15%' }}
					title={product.name}
					subheader={product.price + "₴"}
				/>
				{product.image == null ? <CardMedia
					component="img"
					height="200"
					image={'https://via.placeholder.com/150'}
					alt="NO IMAGE"
				/> : <CardMedia
					component="img"
					height="150"
					image={baseURL + product.image}
					alt="NO IMAGE"
				/>}

				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{product.shortDescription}
					</Typography>
					<CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>

						<Button size="small"><Link to={src} >Buy</Link></Button>
					</CardActions>
				</CardContent>

			</Card>

		</>
	);
}
const Shop: React.FC = () => {

	const { products, categories } = useTypedSelector((store) => store.productReducer)
	const { Products, Categories } = useActions();



	const [search, setSearch] = useState<ISearch>({ pageNumber: 0, pageSize: 5, Find: "", Category: "" });



	const PageSizeChange = (event: any) => {
		setSearch({
			...search, pageSize: Number(event.target.value)
		});

	};
	const handleCategoryChange = (event: any) => {
		setSearch({
			...search, pageSize: event.target.value
		});
	}
	const LoadProducts = async () => {
		console.log(search)
		Products(search);

	}
	const setFindInput = (str: string) => {
		setSearch({
			...search, Find: str
		});
	}
	const setPageNum = (n: number) => {
		setSearch({
			...search, pageNumber: n
		});
	}
	// useEffect(() => { Categories() });
	useEffect(() => {
		LoadProducts()
	}, [search]);
	return (

		<Container maxWidth="lg">
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Box>
						<Select
							value={""}
							label="Category"
							onChange={handleCategoryChange}
						>
							{categories.map((page) => (
								<MenuItem key={page}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}

						</Select>

					</Box>
				</Grid>
				<Grid item xs={6}>
					<Search >
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							onChange={(e) => {
								setFindInput(e.target.value);

							}}
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
						{<Button onClick={() => { LoadProducts() }} >Search</Button>}
					</Search>

				</Grid>
			</Grid>
			<Box sx={{ paddingBottom: '100px', width: '100%', display: 'flex', flexWrap: 'wrap' }}>

				{
					products?.map((product: IProduct) => (

						<ProductPreview {...product} key={uuidv4()} />
					))}


			</Box>
			<ButtonGroup aria-label="medium outlined button group"
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',

				}}>
				<Paper sx={{ position: 'fixed', marginTop: '50px', bottom: 0, left: 0, right: 0 }} elevation={3}>
					<Container>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',

							}}
						>
							<Button size="large" onClick={() => { setPageNum(search.pageNumber + 1) }} >+</Button>
							<Button size="large">{search.pageNumber}</Button>
							<Button size="large" disabled={search.pageNumber == 0 ? true : false} onClick={() => { setPageNum(search.pageNumber - 1) }}>-</Button>




							<TextField

								value={search.pageNumber.toString()}
								onChange={(e) => { PageSizeChange(e) }}
								select
								style={{ width: '20%' }}
								label="Size"
							>

								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={20}>20</MenuItem>
							</TextField>

						</div>
					</Container>
					<Copyright style={{ display: 'flex', justifyContent: 'center' }} />
				</Paper>
			</ButtonGroup>
		</Container >
	);
}
export default Shop;