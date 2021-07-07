/** npm packages */
import React from 'react';
import styled from 'styled-components';

/** themes */
import theme from '../../../config/theme';

/** ui library */
import Container from 'y-ui/dist/elements/Container';
import Row from 'y-ui/dist/elements/Row';
import Col from 'y-ui/dist/elements/Col';
import Button from 'y-ui/dist/components/Button';
import Link from 'y-ui/dist/elements/Link';

/** constant */
import ROUTES from '../../../constants/routes';

const Styles = styled.div`
	background: ${theme.baseStyle.colorPrimary};
`;

function HeaderDesktop({ currentRoute }) {
	return (
		<Styles>
			<Container py={3}>
				<Row justifyContent="flex-end">
					<Col isAutoWidth>&nbsp;</Col>
					<Col isAutoWidth>
						{currentRoute !== ROUTES.INDEX.href && (
							<Link
								link={{
									pathname: ROUTES.INDEX.href,
									query: {},
									asPath: `${ROUTES.INDEX.url}`,
								}}
							>
								<Button size="sm" variant="dark">
									Home
								</Button>
							</Link>
						)}
					</Col>
				</Row>
			</Container>
		</Styles>
	);
}

export default HeaderDesktop;
