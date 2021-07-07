/** npm packages */
import React /* useState, useEffect */ /* createContext */ from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

/** constant */
import MESSAGES from '../../constants/messages';

/** ui package */
import Box from 'y-ui/dist/elements/Box';
// import Toast from '../ui_library/components/Toast';

/** helpers */
// import { setToastNotification } from '../../helpers/utils';

/** components */
import Header from './header/Header';
import Footer from './footer/Footer';

function MainLayout({
	children,
	storeGeneral,
	storeGeneral: {
		device: { isMobile },
		toast,
	},
	dispatch,
	queryParams,

	isHeader = true,
	isFooter = true,
}) {
	const props = {
		isMobile,
		dispatch,
		queryParams,
		storeGeneral,
	};

	return (
		<>
			{isHeader && <Header {...props} />}

			<Box>{children}</Box>

			{isFooter && <Footer {...props} />}

			{toast && toast.content && toast.type && (
				<>
					{toast.type === 'success' && toast.content.label ? (
						<>
							{/** TODO: remove this after Toast component exist  */}
							<div className="toast-success">{toast.content.label}</div>

							{/** TODO: create toast component */
							/* <Toast
								type={toast.type}
								fontSizeVariant="sm"
								autoCloseDuration={3000}
								onClose={resetToastNotification}
							>
								{toast.content.label}
							</Toast> */}
						</>
					) : (
						<>
							{/** TODO: remove this after Toast component exist  */}
							<div className="toast-error">
								{toast.content.label || MESSAGES.GLOBAL_ERROR}
							</div>

							{/** TODO: create toast component */}
							{/* 
							<Toast
								type={toast.type}
								fontSizeVariant="sm"
								autoCloseDuration={3000}
								onClose={resetToastNotification}
							>
								{toast.type === 'danger' && toast.content.label || MESSAGES.GLOBAL_ERROR}
							</Toast> 
							*/}
						</>
					)}
				</>
			)}
		</>
	);

	/* function resetToastNotification() {
		setToastNotification({ dispatch });
	} */
}

MainLayout.propTypes = {
	children: propTypes.oneOfType([
		propTypes.node,
		propTypes.arrayOf(propTypes.node),
	]).isRequired,
};

export default connect((state) => state)(MainLayout);
