/** npm packages */
import React from 'react';
import styled from 'styled-components';

/** ui library */
import Container from 'y-ui/dist/elements/Container';
import Row from 'y-ui/dist/elements/Row';
import Col from 'y-ui/dist/elements/Col';

/** helpers */
import { formatDate } from '../../helpers/customFunctions';

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
	background: #fff;
	padding: 0 15px;
	border-radius: 5px;
	display: block;
	box-sizing: border-box;
	width: 100%;
	border: 1px solid #ccc;
	height: 36px;
`;

const SelectDropdown = styled.select`
	background: #fff;
	padding: 0 15px;
	border-radius: 5px;
	display: block;
	box-sizing: border-box;
	width: 100%;
	border: 1px solid #ccc;
	height: 36px;
`;

function Index({
	searchKeyword,
	onChangeSearchKeyword,
	searchYear,
	onChangeSearchYear,
}) {
	const years = [];
	const start = formatDate(new Date(), 'yyyy');

	for (let i = start - 100; i <= start; i++) {
		years.push(i);
	}

	return (
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
							{(years &&
								years.length &&
								years.reverse().map((item, index) => (
									<option key={index} value={item}>
										{item}
									</option>
								))) ||
								null}
						</SelectDropdown>
					</Col>
				</Row>
			</Container>
		</MyBox>
	);
}

export default Index;
