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
import ModalPreviewImage from '../../components/ModalPreviewImage';
import SearchBar from '../../components/SearchBar';

const LoaderWrapper = styled.div`
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
	storeMovieList,
	searchKeyword,
	onChangeSearchKeyword,
	searchYear,
	onChangeSearchYear,
	resetSearch,
	minimumKeyword,
	isModalPreviewImageShow,
	previewImageUrl,
	openModalPreviewImage,
	closeModalPreviewImage,
}) {
	return (
		<>
			<Box py={5}>
				{storeMovieList.status === STATUS_TYPES.ERROR && (
					<Container>{storeMovieList.error}</Container>
				)}
				{storeMovieList.status === STATUS_TYPES.LOADING && (
					<LoaderWrapper>
						<Loader />
					</LoaderWrapper>
				)}
				<SearchBar
					searchKeyword={searchKeyword}
					onChangeSearchKeyword={onChangeSearchKeyword}
					searchYear={searchYear}
					onChangeSearchYear={onChangeSearchYear}
				/>
				<Container css={{ position: 'relative' }} pb={30}>
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
														onPreviewImageClick={openModalPreviewImage}
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
						<>
							Enter the keyword to find movie, minimum {minimumKeyword}{' '}
							characters
						</>
					)}
					{storeMovieList.statusLoadMore === STATUS_TYPES.LOADING && (
						<Box
							textAlign="center"
							py={5}
							css={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}
						>
							<Loader />
						</Box>
					)}
				</Container>
			</Box>
			{isModalPreviewImageShow && (
				<ModalPreviewImage
					imageUrl={previewImageUrl}
					onClose={closeModalPreviewImage}
				/>
			)}
		</>
	);
}

export default Index;
