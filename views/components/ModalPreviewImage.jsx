/** npm packages */
import React from 'react';
import styled from 'styled-components';

/** ui library */
import Box from 'y-ui/dist/elements/Box';

const Wrapper = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 9;
	padding: 30px;
	box-sizing: border-box;
`;

const Overlay = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	top: 0;
	left: 0;
	z-index: 0;
`;

const Image = styled.img`
	display: block;
	max-width: 100%;
`;

function Index({ imageUrl, onClose }) {
	return (
		<Wrapper>
			<Overlay onClick={onClose} />
			<Box css={{ zIndex: 1 }}>
				{(imageUrl && <Image src={imageUrl} />) || 'No Image'}
			</Box>
		</Wrapper>
	);
}

export default Index;
