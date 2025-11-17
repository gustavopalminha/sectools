# SECTOOLS

App to share sensible info temporary with someone.

Screens:


1) Initial screen: Write a message and click the create button bellow.
<img src="/assets/initial_screen.PNG" title="Create a message and get a link bellow">

2) Message created: Link bellow to share with the recipient.
<img src="/assets/after_message_created.png" title="Create a message and get a link bellow">

3) Visit message: use the link to view the message.
<img src="/assets/message_visited.png" title="Visited created message">

4) Message deleted: Error screen with message not found.
<img src="/assets/after_message_visited_delete.png" title="After deleted message">



## Table of contents 🗂

- [Architecture 🏛](#architecture-)
- [Getting started 🛠](#getting-started-)
- [Tests ✅](#tests-)
- [Run production build 🏎](#run-production-build-)
- [Development process 📜](#development-process-)
  - [Branch names 🌳](#branch-names-)
  - [Commit messages 🖋](#commit-messages-)
  - [Merge requests and etiquette 🎩](#merge-requests-and-etiquette-)
- [Contributions 🤝](#contributions-)
- [Deployment Process 🚀](#deployment-process-)

## Architecture 🏛

This is a [next.js](https://nextjs.org/) application built with [TypeScript](https://www.typescriptlang.org/).

It can be deployed as [Docker](https://www.docker.com/) container which performs server-side rendering (SSR) for first requests of a [React](https://reactjs.org/) application which is then hydrated and proceeds to render subsequent pages.

Created with:

- NextJS 16
- React 19
- Tailwind CSS
- Radix UI
- Zod
- Crypto
- Prisma ORM
- PostgreSQL

## Getting started 🛠

We use [npm](https://docs.npmjs.com/cli/v8/commands/npm-version) for this project.
Be sure to check the `engines` section of the [package.json](./package.json) for the required versions of npm and [node.js](https://nodejs.org/) (which should also be kept in sync in [.nvmrc](./.nvmrc) — we recommend [nvm](https://github.com/nvm-sh/nvm) for managing local node.js versions).

Start by cloning the repo:

```bash
git clone https://github.com/gustavopalminha/sectools.git
```

Then, installing project dependencies and initializing app config.

```bash
# Install project dependencies
npm install

# Create a devault config file
npm run init-config
```

Note: if running the `init-config` command doesn't work for you. You can do it manually be renaming the .env.sample to .env and adjust the env variables inside.

We use [Docker](https://www.docker.com/) to run this project.
Make sure to install [Docker](https://docs.docker.com/get-docker/) and clone the project to your machine.

To use PostgreSQL spin a container with it by running:

```
docker run -p 5432:5432 --name sectools-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=sectools -d postgres
```

Then you need to apply the Prisma ORM migrations and run the development server.

```bash
# 1) generate migrations (if not changes it will be ignored)
npm run prisma:generate

# 2) apply migration in the db according to you .env file DATABASE_URL
npm run prisma:migrate

# 3) run nextjs dev server
npm run dev

#OR All 3 commands above together
npm run dev:sync
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Tests ✅

We use [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/react) to test this project.

Tests can make use of [user-event](https://github.com/testing-library/user-event) helpers and [jest-dom](https://github.com/testing-library/jest-dom) matchers.

Tests should be allocated with the corresponding modules being tested inside a `__tests__` folder and named `ModuleName.test.ts(x)`.

The following commands are available to run tests.

```bash
# Run all tests and report coverage
npm run test

# Run Jest in watch mode, running tests only for changed files
nom run test:watch

```

## Run production build 🏎

To locally build and run a production optimized version of the frontend, you can use the following commands.

```bash
# 1) Create an optimized production build
npm run build

# 2) Run local production build of the app (after building with `yarn build`)
npm run start

# Run build and start nextjs scripts with other required production scripts.
npm run prod

```

Note: Only running the `build` and `start` commands are not enough, you still need to sync the database with your postgresql instances if that was not done before.

You will need to use a postgresql instance to be able to point the frontend by filling in the .env environment variable

## Development process 📜

Pickup issues from the project git, create a new branch from `master` to work on a feature or bugfix and open a Merge Request (PR) against `master` for code review and quality testing.

### Branch names 🌳

Branch names should adhere to the following format.

```
<type>/<a-descriptive-name-separated-by-colons>
```

Branch type prefixes should use the types from the [Conventional Commits](https://www.conventionalcommits.org/) specification (i.e. `feat`, `fix`, `docs`, `test`, `chore`, etc.).

Here are some examples of valid branch names:

- `feat/add-button-component`
- `fix/fix-upload-photo`
- `docs/add-documentation-for-i18n-integration`

### Commit messages 🖋

We write _good_ commit messages that adhere to the [Conventional Commits](https://www.conventionalcommits.org/) spec.

- Follow the Conventional Commits message structure
- Separate subject from body with a blank line
- Limit the subject line to 50 characters
- Do not end the subject line with a period
- Use the imperative mood in the subject line
- Wrap the body at 72 characters
- Use the body to explain what and why vs. how

### Merge requests and etiquette 🎩

When opening merge requests be sure to select our `Default` MR template in the Github UI and fill in all applicable sections.

The MR title should use the following format.

```
Imperative description of the change
```

_Tip_ 💡: Write a good commit message and the MR title comes for _free_.

It's highly recommended to include screenshots or screen recordings in the MR description for new or updated pieces of UI. 📸

Be sure to add any appropriate labels and tick both checkboxes:

- [x] Remove source branch when merge request is accepted.
- [x] Squash commits when merge request is accepted.

## Contributions 🤝

Open an issue and a PR with the desired changes.

Contributions are accepted.

## Deployment Process 🚀

Current `dockerfile` is setup to run the production build and the docker compose is also prepared to provide a postgresql instance for this frontend to work.

If running in production you should adjust the `dockerfile` as well as `compose.yaml` to your needs.

Run docker compose:

```docker
docker compose up
```
