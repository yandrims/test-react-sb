/* eslint-disable radix */
/** npm packages */
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import propTypes from 'prop-types';
import debounce from 'lodash.debounce';

/** constant */
import ACTION_TYPES from '../../../constants/actionTypes';
import STATUS_TYPES from '../../../constants/statusTypes';
import ROUTES from '../../../constants/routes';

import { paramsToString, isBottomPage } from '../../../helpers/customFunctions';

/** components */
import HomeTemplateDesktop from './HomeTemplateDesktop';

const { LOADING, SUCCESS } = STATUS_TYPES;

function Index({
	isMobile,
	queryParams,
	dispatch,

	storeMovieList,
}) {
	const { q = '', year = null, page = 1 } = queryParams;
	const [searchKeyword, setSearchKeyword] = useState(q);
	const [searchYear, setSearchYear] = useState(year && parseInt(year));
	const [isModalPreviewImageShow, setModalPreviewImageShow] = useState(false);
	const [previewImageUrl, setPreviewImageUrl] = useState('');
	const [currentPage, setCurrentPage] = useState(page);
	const minimumKeyword = 3;

	const bottomOffset = 30;
	const onScrollHandler = () => {
		if (isBottomPage({ bottomOffset })) {
			loadMoreMovies();
		}
	};
	const debouncedScroll = debounce(onScrollHandler, 100);

	useEffect(() => {
		document.addEventListener('scroll', debouncedScroll);

		return () => {
			document.removeEventListener('scroll', debouncedScroll);
		};
	});

	useEffect(() => {
		if (searchKeyword !== q) {
			applySearch();
		}
	}, [searchKeyword]);

	useEffect(() => {
		if (searchYear !== year) {
			applySearch();
		}
	}, [searchYear]);

	useEffect(() => {
		if (storeMovieList.status === SUCCESS && searchKeyword !== q) {
			applySearch();
		}
	}, [storeMovieList.status]);

	const props = {
		isMobile,
		queryParams,
		dispatch,

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
			storeMovieList.status !== LOADING
		) {
			setCurrentPage(1);
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
		setCurrentPage(1);
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

	function loadMoreMovies() {
		const {
			status,
			statusLoadMore,
			meta: { totalResults },
		} = storeMovieList;

		const perPage = 10;
		const maxPage = Math.ceil(totalResults / perPage);

		if (
			!(status === LOADING || statusLoadMore === LOADING) &&
			currentPage < maxPage
		) {
			const nextPage = parseInt(currentPage) + 1;
			const keyWord = searchKeyword;

			dispatch({
				type: ACTION_TYPES.MOVIE_LIST.GET,
				payload: {
					isMobile,
					params: {
						page: nextPage,
						q: keyWord,
						year: searchYear,
					},
					isLoadMore: true,
				},
				callback: (err, res) => {
					if (res) {
						setCurrentPage(nextPage);
					}
				},
			});
		}
	}
}

Index.propTypes = {
	isMobile: propTypes.bool.isRequired,
};

export default Index;
