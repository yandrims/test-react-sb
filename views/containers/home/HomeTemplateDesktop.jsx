/** npm packages */
import React from 'react';
import styled from 'styled-components';

/** ui library */
import Container from 'y-ui/dist/elements/Container';
import Box from 'y-ui/dist/elements/Box';
import Row from 'y-ui/dist/elements/Row';
import Col from 'y-ui/dist/elements/Col';
import Link from 'y-ui/dist/elements/Link';
import Loader from 'y-ui/dist/elements/Loader';

/** constant */
import STATUS_TYPES from '../../../constants/statusTypes';

/** components */
import Movie from '../../components/Movie';

const MyBox = styled.div`
	padding: 10px 0 0;
	border-bottom: 1px solid #ccc;
	background: #fff;
	margin-bottom: 20px;
	position: sticky;
	top: 0;
	z-index: 9;
`;

const TextField = styled.input`
	padding: 0 15px;
	border-radius: 5px;
	display: block;
	box-sizing: border-box;
	width: 100%;
	border: 1px solid #ccc;
	height: 36px;
`;

const SelectDropdown = styled.select`
	padding: 0 15px;
	border-radius: 5px;
	display: block;
	box-sizing: border-box;
	width: 100%;
	border: 1px solid #ccc;
	height: 36px;
`;

const Loading = styled.div`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(255, 255, 255, 0.5);
	z-index: 99;
`;

function Index({
	dispatch,
	years,
	storeMovieList,
	searchKeyword,
	onChangeSearchKeyword,
	searchYear,
	onChangeSearchYear,
	resetSearch,
	minimumKeyword,
}) {
	return (
		<Box py={5}>
			{storeMovieList.status === STATUS_TYPES.ERROR && (
				<Container>{storeMovieList.error}</Container>
			)}
			{storeMovieList.status === STATUS_TYPES.LOADING && (
				<Loading>
					<Loader />
				</Loading>
			)}
			<MyBox>
				<Container>
					<Row space={2}>
						<Col
							col={12}
							mb={4}
							responsive={{
								xxs: {
									col: 12,
								},
								xs: {
									col: 12,
								},
								sm: {
									col: 7,
								},
								md: {
									col: 8,
								},
								lg: {
									col: 9,
								},
								xl: {
									col: 10,
								},
								xxl: {},
							}}
						>
							<TextField
								type="text"
								placeholder="Search movie name"
								value={searchKeyword}
								onChange={onChangeSearchKeyword}
							/>
						</Col>
						<Col
							col={12}
							mb={4}
							responsive={{
								xxs: {
									col: 12,
								},
								xs: {
									col: 12,
								},
								sm: {
									col: 5,
								},
								md: {
									col: 4,
								},
								lg: {
									col: 3,
								},
								xl: {
									col: 2,
								},
								xxl: {},
							}}
						>
							<SelectDropdown
								onChange={onChangeSearchYear}
								value={searchYear || ''}
							>
								<option value="">Select Year</option>
								{years.map((item, index) => (
									<option key={index} value={item}>
										{item}
									</option>
								))}
							</SelectDropdown>
						</Col>
					</Row>
				</Container>
			</MyBox>
			<Container>
				{searchKeyword.length >= minimumKeyword ? (
					<>
						{(storeMovieList.status === STATUS_TYPES.SUCCESS && (
							<>
								{(storeMovieList.data.length && (
									<Row space={2}>
										<Col col={12} mb={5} textAlign="right">
											<Link onClick={resetSearch}>Reset</Link>
										</Col>
										{storeMovieList.data.map((item, index) => (
											<Col
												key={index}
												col={12}
												mb={4}
												responsive={{
													xxs: {
														col: 12,
													},
													xs: {
														col: 6,
													},
													sm: {
														col: 4,
													},
													md: {},
													lg: {
														col: 3,
													},
													xl: {},
													xxl: {},
												}}
											>
												<Movie
													id={item.imdbID}
													title={item.Title}
													year={item.Year}
													type={item.Type}
													imageUrl={item.Poster}
													dispatch={dispatch}
												/>
											</Col>
										))}
									</Row>
								)) || (
									<>
										No Movie Found! <Link onClick={resetSearch}>Reset</Link>
									</>
								)}
							</>
						)) ||
							null}
					</>
				) : (
					<>Enter the keyword to find movie</>
				)}
			</Container>
		</Box>
	);
}

export default Index;
