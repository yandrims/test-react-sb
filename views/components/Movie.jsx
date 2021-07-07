/** npm packages */
import React from 'react';
import styled from 'styled-components';

/** ui library */
import Box from 'y-ui/dist/elements/Box';
import Link from 'y-ui/dist/elements/Link';

/** constant */
import ROUTES from '../../constants/routes';
import IMAGES from '../../constants/images';

/** themes */
import theme from '../../config/theme';

const {
	baseStyle: { colorPrimary },
} = theme;

const Wrapper = styled.div`
	padding: 15px;
	box-shadow: 1px 2px 10px #ccc;
	height: 100%;
	box-sizing: border-box;
	border-radius: 4px;
	transition: 0.3s;
	border: 8px solid transparent;
	&:hover {
		border-color: ${colorPrimary};
	}
`;

const Title = styled.div`
	font-weight: 600;
	font-size: 16px;
	color: #000;
	&:hover {
		color: ${colorPrimary};
	}
`;

const Type = styled.div`
	font-style: italic;
	color: #aaa;
`;

const Image = styled.img`
	display: block;
	width: 100%;
`;

function Index({ id, title, year, type, imageUrl }) {
	const link = {
		pathname: ROUTES.MOVIE.href,
		query: {
			id,
		},
		asPath: `${ROUTES.MOVIE.url}/${id}`,
	};

	let imgUrl = IMAGES.NO_IMAGE;
	if (imageUrl && imageUrl !== 'N/A') {
		imgUrl = imageUrl;
	}

	return (
		<Wrapper>
			<Box>
				{imageUrl && (
					<Box mb={4}>
						<Link link={link} isBlock>
							<Image src={imgUrl} />
						</Link>
					</Box>
				)}
				<Link link={link} isBlock>
					<Title>
						{title}
						{year && ` (${year})`}
					</Title>
				</Link>
				{type && <Type>{type}</Type>}
			</Box>
		</Wrapper>
	);
}

export default Index;
