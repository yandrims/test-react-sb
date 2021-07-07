/* eslint-disable react/no-danger */
/** npm packages */
import React from 'react';

/** constants */
import MICRODATA from '../../../constants/seoMicrodata';

export default function HeadScripts() {
	return (
		<>
			{MICRODATA.GLOBAL &&
				MICRODATA.GLOBAL.length &&
				MICRODATA.GLOBAL.map((item, idx) => (
					<script
						key={idx}
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(item),
						}}
					/>
				))}
		</>
	);
}
