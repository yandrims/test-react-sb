/** npm packages */
import React from 'react';

/** ui library */
import Container from 'y-ui/dist/elements/Container';
import Box from 'y-ui/dist/elements/Box';
import Loader from 'y-ui/dist/elements/Loader';
import Button from 'y-ui/dist/components/Button';

/** constant */
import STATUS_TYPES from '../../../constants/statusTypes';

function Index({ storeMovieDetail, backPage }) {
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
				<Box>
					<Box textAlign="center" mb={10}>
						<h1>{storeMovieDetail.data.Title}</h1>
					</Box>
					<Box mt={5}>{JSON.stringify(storeMovieDetail)}</Box>
				</Box>
			)}
		</Container>
	);
}

export default Index;
