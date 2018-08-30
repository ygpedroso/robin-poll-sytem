# Robin Poll System

## Contribution guide

## Prerequisites
1. `node`, `npm`

## Steps for running solution locally
1. Clone the repository `git clone git@github.com:ygpedroso/robin-poll-sytem.git`
2. Enter to the project folder `cd robin-poll-system/`
3. Install dependencies `npm i` or `yarn`
4. Run the application in development mode `npm start`. The environment variables `DATABASE_URL`(mongodb url) and `JWT_SECRET`(string) 
are needed for running the application.

## Tests
1. Run application Tests `npm run test`
1. Run application Tests + coverage `npm run test:coverage`

## Current Routes
1. Auth(`/api/v1/auth`)
	* Url: `/register`, Method: `post`, Body: `email`, `password`, Return: `created user`
	* Url: `/login`, Method: `post`, Body: `email`, `password`, Returns: `token`.
2. Users(`/api/v1/users`)
	* Url: `/me`, Method: `post`, Header: `Authorization Bearer token`, Return: `logged in user`
3. Polls(`/api/v1/polls`)
	* Url: `/`, Method: `get`, Return: `All polls`
	* Url: `/:id`, Method: `get`, Return: `A single poll`
	* Url: `/`, Method: `post`, Header: `Authorization Bearer token`, Body: `Poll model`, Return: `Created poll`
	* Url: `/:id/close`, Method: `post`, Header: `Authorization Bearer token`, Return: `Close a poll`
4. Polls Options(`/api/v1/polls/:pollId/options`)
	* Url: `/`, Method: `get`, Return: `All options for a poll`
	* Url: `/:id`, Method: `get`, Return: `A single poll option`
	* Url: `/`, Method: `post`, Header: `Authorization Bearer token`, Body: `Poll Option model`, Return: `Created poll option`
5. Votes
	* Url: `/api/v1/polls/:pollId/votes/`, Method: `get`, Return: `All votes for a poll`
	* Url: `/api/v1/polls/:pollId/votes/:id`, Method: `get`, Return: `A single vote`
	* Url: `api/v1/:pollId/options/:pollOptionId/votes`, Method: `post`, Header: `Authorization Bearer token`, 
	Return: `Created vote`

## Assumptions
1. Authorization was handle using `jsonwebtokens`. An authorization header is required for every secure endpoint with
the format of `Bearer token`.
2. Only logged in users can:
	* Create polls.
	* Add options to polls.
	* Close a poll.
	* Vote on a particular option for a poll.
3. Users can not vote more than once in a poll.
4. Generated JWT after login lasts only 24 hours.
5. When retrieving the list of a model, only references to other models will be in the result. On the other hand, when
retrieving a single model, the reference fields will be populated with the model it makes reference to.

## Robin Poll System production url:
1. Base Url: [https://robin-poll-system.herokuapp.com/](https://robin-poll-system.herokuapp.com/)
