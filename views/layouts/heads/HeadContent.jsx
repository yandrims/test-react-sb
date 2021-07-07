/* eslint-disable react/no-danger */
/** npm packages */
import React from 'react';
import Head from 'next/head';

/** config */
import ENV from '../../../config/env';

/** constants */
import SEO_META from '../../../constants/seoMeta';
import GLOBAL from '../../../constants/global';
import ROUTES from '../../../constants/routes';

/** head components */
import HeadScripts from './HeadScripts';

const { CURRENT_ENV } = ENV;

function HeadContent({ seoContent }) {
	const { meta = SEO_META.DEFAULT, microdata = [] } = seoContent;

	const {
		TITLE,
		DESC,
		KEYWORDS,
		CANONICAL_URL,
		OG_LOCALE,
		OG_TITLE,
		OG_DESC,
		OG_TYPE,
		OG_SITENAME,
		OG_URL,
		OG_IMAGE,
		OG_IMAGE_URL,
		OG_IMAGE_TYPE,
		OG_IMAGE_WIDTH,
		OG_IMAGE_HEIGHT,
		OG_IMAGE_ALT,
		OG_TWITTER_CARD,
		OG_TWITTER_TITLE,
		OG_TWITTER_DESC,
		OG_TWITTER_SITE,
	} = meta;

	return (
		<Head>
			<title>{TITLE}</title>
			<meta charSet="utf-8" />
			<meta httpEquiv="content-type" content="text/html;charset=UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			{CURRENT_ENV === 'production' && (
				<meta
					httpEquiv="Content-Security-Policy"
					content="upgrade-insecure-requests"
				/>
			)}
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no"
			/>
			<meta
				name="robots"
				content={
					(CURRENT_ENV === 'production' && 'index, follow') ||
					'noindex, nofollow'
				}
			/>
			<meta name="language" content="id" />
			<meta name="theme-color" content={GLOBAL.THEME_COLOR} />

			{/* META SEO */}
			{TITLE && <meta name="title" content={TITLE} />}
			{DESC && <meta name="description" content={DESC} />}
			{KEYWORDS && <meta name="keywords" content={KEYWORDS} />}

			{/* META OG */}
			{OG_LOCALE && <meta property="og:locale" content={OG_LOCALE} />}
			{OG_TITLE && <meta property="og:title" content={OG_TITLE} />}
			{(OG_DESC && <meta property="og:description" content={OG_DESC} />) ||
				null}
			{OG_TYPE && <meta property="og:type" content={OG_TYPE} />}
			{OG_SITENAME && <meta property="og:site_name" content={OG_SITENAME} />}
			{OG_URL && <meta property="og:url" content={OG_URL} />}
			{OG_IMAGE && <meta property="og:image" content={OG_IMAGE} />}
			{OG_IMAGE_URL && <meta property="og:image:url" content={OG_IMAGE_URL} />}
			{OG_IMAGE_TYPE && (
				<meta property="og:image:type" content={OG_IMAGE_TYPE} />
			)}
			{OG_IMAGE_WIDTH && (
				<meta property="og:image:width" content={OG_IMAGE_WIDTH} />
			)}
			{OG_IMAGE_HEIGHT && (
				<meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
			)}
			{OG_IMAGE_ALT && <meta property="og:image:alt" content={OG_IMAGE_ALT} />}
			{OG_TWITTER_CARD && (
				<meta property="og:twitter:card" content={OG_TWITTER_CARD} />
			)}
			{OG_TWITTER_TITLE && (
				<meta property="og:twitter:title" content={OG_TWITTER_TITLE} />
			)}
			{OG_TWITTER_DESC && (
				<meta property="og:twitter:desc" content={OG_TWITTER_DESC} />
			)}
			{OG_TWITTER_SITE && (
				<meta property="og:twitter:site" content={OG_TWITTER_SITE} />
			)}

			{/* LINKS */}
			<link
				rel="shortcut icon"
				type="image/x-icon"
				sizes="16x16"
				href={`${ROUTES.PUBLIC.url}/favicon.ico?v=1.0`}
			/>
			{(CANONICAL_URL && <link rel="canonical" href={CANONICAL_URL} />) || null}

			{(microdata && microdata.length && (
				<>
					{microdata.map((item, idx) => (
						<script
							key={idx}
							type="application/ld+json"
							dangerouslySetInnerHTML={{
								__html: JSON.stringify(item),
							}}
						/>
					))}
				</>
			)) ||
				null}
			<HeadScripts />
		</Head>
	);
}

HeadContent.propTypes = {};

export default HeadContent;
