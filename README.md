## Anagram

```
const input = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'];
const output = getAnagram(input);

console.log(output);

/* Functions */

function getAnagram(words) {
	const anagram = [];
  const grouped = {};

  if (words && words.length) {
    words.forEach((word) => {
      const sorted = customSort(word);
      if (grouped[sorted]) {
        grouped[sorted].push(word);
      } else {
        grouped[sorted] = [word];
      }
    });
  }

	for (const sortedWord in grouped) {
		anagram.push(grouped[sortedWord]);
	}

	return anagram;
}

function customSort(word) {
	let arr = word.split('');
	let isDone = false;
	if (arr.length) {
		while (!isDone) {
			isDone = true;
			for (let i = 1; i < arr.length; i++) {
				if (arr[i - 1] > arr[i]) {
					const temp = arr[i - 1];
					arr[i - 1] = arr[i];
					arr[i] = temp;
					isDone = false;
				}
			}
		}
	}

	return arr.length ? arr.join('') : '';
}

```

## Recommended Tools

- Editor

  - `VS Code` , with plugin extension:

    - `ESLint`
    - `Prettier`

  - Config
    - `Auto format` on save
    - Indentation space: `2`

- Browser
  - Google Chrome

## Requirement

- Install Node JS `v12.16.1` or above
- Install `yarn` or `npm` command line

## Local Setup

- Run `yarn install` or `npm install`

## Environment

- `local` for engineer local machine
- `stg` for QA testing on staging server
- `production` for production server

## API

- `stg`
- `production`

## Script

- Running mode

  - `yarn run:local` to run on `local` environment
  - `yarn run:stg` to run on `staging` environment
  - `yarn run:production` to run on `production` environment

- Build and deploy
  - `yarn deploy:local` to build and run on `compiled` mode with `local` environment and `staging` api
  - `yarn deploy:stg` to build and run on `compiled` mode with `staging` environment and `staging` api
  - `yarn deploy:production` to build and run on `compiled` mode with `production` environment and `production` api

## Name Convention

- `ComponentName` using `PascalCase`
- `variableName` using `camelCase`
- `functionName` using `camelCase`
- `CONSTANT_NAME` using `SNAKE_CASE` with `UPPERCASE`
- DOM `id_name` using `snake_case` with `lowercase`
- DOM `class-name` for styling using `kebab-case` with `lowercase`
- DOM `js-class-name` for javascript event using `kebab-case` with `lowercase` and with `js` prefix
- `folder_name` using `snake_case` with `lowercase`
- `ComponentFileName.jsx` using `PascalCase`
- Boolean variable should has `is` prefix for `isBooleanVariableName`
- `Singular` and `plural` naming
- Component file name should using `.jsx` extension, and `.js` for non-component js files

## Default value

- _Array_ : `[]` , for example => `data: []`
- _Object_ : `{}` , for example => `data: {}`
- _Number_ : `0` , for example => `data: 0`
- _String_ : `""` , for example => `data: ""`
- _Boolean_ : `true` or `false` , for example => `data: false`

## Code Guideline

- use `const` and `let` , avoid using `var` as variable declaration
- always check the `data.length` first before do looping using `.map()` or `.forEach()` and put default value in the end of statement. For example: `data && data.length && data.map(...) || null`
