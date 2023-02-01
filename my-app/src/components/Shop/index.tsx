import React, { useEffect, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, Avatar, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Container, Grid, IconButton, InputLabel, MenuItem, Paper, SelectChangeEvent, styled, TextField, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Select as SelectMui } from '@mui/material'
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

import Copyright from '../Copyright';
import { IProduct, baseURL } from '../../types/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';


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
const ProductPreview: React.FC<any> = (product: IProduct) => {


	return (
		<>
			<Card sx={{ maxWidth: '100%', margin: '5px' }}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
							{product.Manufacturer}
						</Avatar>
					}

					title={product.Name}
					subheader={product.Price}
				/>
				<CardMedia
					component="img"
					height="400"
					image={baseURL + product.Image}
					alt="NO IMAGE"
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{product.ShortDescription}
					</Typography>
					<CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>

						<Button size="small"><Link to={`/${product.Name.split(' ').join('_')}`} >Buy</Link></Button>
					</CardActions>
				</CardContent>

			</Card>

		</>
	);
}
const Shop: React.FC = () => {

	// const { tags, allPosts } = useTypedSelector((store) => store.BlogReducer)
	// const { PostsGet } = useActions();
	// const options: OptionType[] = tags.map(i => {
	// 	return { value: i, label: i }
	// });
	// const [selectedOption, setSelectedOption] = useState<ValueType<OptionType>>();
	const [pageSize, setpageSize] = useState(5);
	const [FindInput, setFindInput] = useState("");
	const [page, setPage] = useState(0);

	// const handleChange = (option: any) => {

	// 	setSelectedOption(option);
	// 	LoadPosts()

	// };
	const PageSizeChange = (event: any) => {
		setpageSize(Number(event.target.value));

	};
	// const LoadPosts = () => {
	// 	const tags = selectedOption as any[];
	// 	const str: any[] = [];
	// 	tags?.forEach(element => {
	// 		str.push(element.value);
	// 	});

	// 	const getModel =
	// 	{
	// 		pageNumber: page,
	// 		pageSize: pageSize,
	// 		Tags: str,
	// 		Find: FindInput
	// 	};
	// 	console.log(getModel)
	// 	PostsGet(getModel);
	// }

	// useEffect(() => { LoadPosts() }, [, pageSize, page]);
	return (

		<Container maxWidth="lg">
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Box>
						{/* <Select
							value={selectedOption as ValueType<OptionType>}
							onChange={option => handleChange(option)}
							options={options}
							isMulti={true}
						/> */}

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
						{/* <Button onClick={() => { LoadPosts() }} >Search</Button> */}
					</Search>

				</Grid>
			</Grid>
			<Box sx={{ paddingBottom: '100px' }}>
				{/* {
					allPosts?.map((post: any) => (
						<PostPreview props={post} key={post.uuid} />))} */}

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
							<Button size="large" onClick={() => { setPage((currPage) => ++currPage) }} >+</Button>
							<Button size="large">{page}</Button>
							<Button size="large" disabled={page == 0 ? true : false} onClick={() => { setPage((currPage) => --currPage); }}>-</Button>




							<TextField

								value={pageSize.toString()}
								onChange={(e) => { PageSizeChange(e) }}
								select // tell TextField to render select
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