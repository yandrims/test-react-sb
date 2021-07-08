/** npm packages */
import React from 'react';
import styled from 'styled-components';

/** ui library */
import Container from 'y-ui/dist/elements/Container';
import Row from 'y-ui/dist/elements/Row';
import Col from 'y-ui/dist/elements/Col';
import Box from 'y-ui/dist/elements/Box';
import Loader from 'y-ui/dist/elements/Loader';
import Button from 'y-ui/dist/components/Button';

/** constant */
import STATUS_TYPES from '../../../constants/statusTypes';
import IMAGES from '../../../constants/images';

const PageTitle = styled.h1`
	font-weight: 600;
	font-size: 22px;
`;

const Image = styled.img`
	display: block;
	width: 100%;
	max-width: 100%;
`;

function Index({ storeMovieDetail, backPage }) {
	const {
		data: {
			Poster,
			Title,
			Year,
			Rated,
			Released,
			Runtime,
			Genre,
			Director,
			Writer,
			Actors,
			Plot,
			Language,
			Country,
			Awards,
			Ratings = [],
			Metascore,
			imdbRating,
			imdbVotes,
			imdbID,
			Type,
			DVD,
			BoxOffice,
			Production,
			Website,
		},
	} = storeMovieDetail;

	let imgUrl = IMAGES.NO_IMAGE;
	if (Poster && Poster !== 'N/A') {
		imgUrl = Poster;
	}

	return (
		<Container py={5}>
			<Button onClick={backPage} isOutlined>
				Back
			</Button>
			{storeMovieDetail.status === STATUS_TYPES.ERROR && (
				<Box>{storeMovieDetail.error}</Box>
			)}
			{storeMovieDetail.status === STATUS_TYPES.LOADING && (
				<Box textAlign="center" py={10}>
					<Loader />
				</Box>
			)}
			{storeMovieDetail.status === STATUS_TYPES.SUCCESS && (
				<Box mt={10}>
					<Row space={5}>
						<Col
							col={3}
							responsive={{
								xxs: {
									col: 12,
								},
								xs: {
									col: 12,
								},
								sm: {
									col: 6,
								},
								md: {
									col: 5,
								},
								lg: {
									col: 4,
								},
								xl: {},
								xxl: {},
							}}
							mb={10}
						>
							<Image src={imgUrl} />
						</Col>
						<Col>
							<Box textAlign="center">
								<PageTitle>{Title}</PageTitle>
							</Box>
							<Box mt={4}>
								{Year && (
									<p>
										<strong>Year</strong>: {Year}
									</p>
								)}
								{Rated && (
									<p>
										<strong>Rated</strong>: {Rated}
									</p>
								)}
								{Released && (
									<p>
										<strong>Released</strong>: {Released}
									</p>
								)}
								{Runtime && (
									<p>
										<strong>Runtime</strong>: {Runtime}
									</p>
								)}
								{Genre && (
									<p>
										<strong>Genre</strong>: {Genre}
									</p>
								)}
								{Director && (
									<p>
										<strong>Director</strong>: {Director}
									</p>
								)}
								{Writer && (
									<p>
										<strong>Writer</strong>: {Writer}
									</p>
								)}
								{Actors && (
									<p>
										<strong>Actors</strong>: {Actors}
									</p>
								)}
								{Plot && (
									<p>
										<strong>Plot</strong>: {Plot}
									</p>
								)}
								{Language && (
									<p>
										<strong>Language</strong>: {Language}
									</p>
								)}
								{Country && (
									<p>
										<strong>Country</strong>: {Country}
									</p>
								)}
								{Awards && (
									<p>
										<strong>Awards</strong>: {Awards}
									</p>
								)}
								{Metascore && (
									<p>
										<strong>Metascore</strong>: {Metascore}
									</p>
								)}
								{imdbRating && (
									<p>
										<strong>imdbRating</strong>: {imdbRating}
									</p>
								)}
								{imdbVotes && (
									<p>
										<strong>imdbVotes</strong>: {imdbVotes}
									</p>
								)}
								{imdbID && (
									<p>
										<strong>imdbID</strong>: {imdbID}
									</p>
								)}
								{Type && (
									<p>
										<strong>Type</strong>: {Type}
									</p>
								)}
								{DVD && (
									<p>
										<strong>DVD</strong>: {DVD}
									</p>
								)}
								{BoxOffice && (
									<p>
										<strong>BoxOffice</strong>: {BoxOffice}
									</p>
								)}
								{Production && (
									<p>
										<strong>Production</strong>: {Production}
									</p>
								)}
								{Website && (
									<p>
										<strong>Website</strong>: {Website}
									</p>
								)}
							</Box>
							{(Ratings && Ratings.length && (
								<Box mt={4}>
									<p>
										<strong> Ratings</strong>
									</p>
									{Ratings.map((item, index) => (
										<Box key={index} mb={3}>
											<p>Source: {item.Source}</p>
											<p>Value: {item.Value}</p>
										</Box>
									))}
								</Box>
							)) ||
								null}
						</Col>
					</Row>
				</Box>
			)}
		</Container>
	);
}

export default Index;
