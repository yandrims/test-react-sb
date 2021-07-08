/* eslint-disable radix */
/** npm packages */
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import propTypes from 'prop-types';

/** constant */
import STATUS_TYPES from '../../../constants/statusTypes';
import ROUTES from '../../../constants/routes';

/** helpers */
import { formatDate } from '../../../helpers/customFunctions';
import { paramsToString } from '../../../helpers/utils';

/** components */
import HomeTemplateDesktop from './HomeTemplateDesktop';

function Index({
	isMobile,
	queryParams,
	dispatch,

	storeMovieList,
}) {
	const { q = '', year = null } = queryParams;
	const [searchKeyword, setSearchKeyword] = useState(q);
	const [searchYear, setSearchYear] = useState(parseInt(year));
	const [isModalPreviewImageShow, setModalPreviewImageShow] = useState(false);
	const [previewImageUrl, setPreviewImageUrl] = useState('');
	const minimumKeyword = 3;

	useEffect(() => {
		applySearch();
	}, [searchKeyword]);

	useEffect(() => {
		applySearch();
	}, [searchYear]);

	useEffect(() => {
		if (storeMovieList.status === STATUS_TYPES.SUCCESS && searchKeyword !== q) {
			applySearch();
		}
	}, [storeMovieList.status]);

	const props = {
		isMobile,
		queryParams,
		dispatch,

		years: getYearRange().reverse(),
		storeMovieList,
		searchKeyword,
		onChangeSearchKeyword,
		searchYear,
		onChangeSearchYear,
		applySearch,
		resetSearch,
		minimumKeyword,
		isModalPreviewImageShow,
		previewImageUrl,
		openModalPreviewImage,
		closeModalPreviewImage,
	};

	return <HomeTemplateDesktop {...props} />;

	function getYearRange() {
		const yearRange = [];
		const start = formatDate(new Date(), 'yyyy');

		for (let i = start - 100; i <= start; i++) {
			yearRange.push(i);
		}

		return yearRange;
	}

	function onChangeSearchKeyword(e) {
		if (e) {
			setSearchKeyword(e.target.value);
		}
	}

	function onChangeSearchYear(e) {
		if (e) {
			setSearchYear(e.target.value);
		}
	}

	function applySearch() {
		if (
			searchKeyword.length >= minimumKeyword &&
			storeMovieList.status !== STATUS_TYPES.LOADING
		) {
			Router.push(
				{
					pathname: ROUTES.INDEX.url,
					query: {
						...queryParams,
						q: searchKeyword,
						year: searchYear,
					},
				},
				`${ROUTES.INDEX.url}${paramsToString({
					...queryParams,
					q: searchKeyword,
					year: searchYear,
				})}`,
			);
		}
	}

	function resetSearch() {
		setSearchKeyword('');
		setSearchYear(null);
		const homeUrl = ROUTES.INDEX.url;
		Router.push({ pathname: homeUrl, query: {} }, homeUrl);
	}

	function openModalPreviewImage(e) {
		setModalPreviewImageShow(true);
		setPreviewImageUrl(e.target.src);
	}

	function closeModalPreviewImage() {
		setModalPreviewImageShow(false);
		setPreviewImageUrl('');
	}
}

Index.propTypes = {
	isMobile: propTypes.bool.isRequired,
};

export default Index;
