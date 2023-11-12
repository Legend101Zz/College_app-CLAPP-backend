## Getting started

Install `Docker` and `Docker Compose` which are used to maximise the convenience of development on local machine.

When both are installed, build the backend image as follow:

```sh
docker-compose build
```

Run the app:

```sh
docker-compose up
```

Go to:

```
 http://localhost:8080/api/health
```

If you see the following response in the browser:

```
{"status":"OK","data":"2022-02-13T20:05:13.965Z"}
```

It means that everything work as expected.

## Getting started, standard way (no containerization)

If you want to run Backend "standard way" using the `npm` instead of `docker-compose`.
Note: you need to set env variables defined in `.env.local` file.
On mac OS you can use `export $(cat .env.local)` to export all env variables from the .env.local file.

### To avoid running the `export $(cat .env.local)` command again and again

You can avoid running the export $(cat .env.local) command every time you open a new terminal session by adding it to your shell's profile or configuration file. This way, it will be executed automatically whenever you start a new terminal session.

If you want to avoid running the `export $(cat .env.local)` command every time you open a new terminal session, you can automate it by adding the command to your shell's profile or configuration file. This ensures that it will be executed automatically whenever you start a new terminal session.

### Bash Users

1. Open your Bash configuration file in a text editor:

   ```bash
   nano ~/.bashrc
   ```

   Or for macOS users:

   ```bash
   nano ~/.bash_profile
   ```

2. Add the following line to the end of the file, replacing `path/to/your/project/` with the actual path to your project:

   ```bash
   export $(cat path/to/your/project/.env.local)
   ```

3. Save the file and exit the text editor.

4. Restart your terminal or run the following command to apply the changes:

   ```bash
   source ~/.bashrc  # for Bash
   ```

   Or for macOS users:

   ```bash
   source ~/.bash_profile
   ```

### Zsh Users

1. Open your Zsh configuration file in a text editor:

   ```bash
   nano ~/.zshrc
   ```

2. Add the following line to the end of the file, replacing `path/to/your/project/` with the actual path to your project:

   ```bash
   export $(cat path/to/your/project/.env.local)
   ```

3. Save the file and exit the text editor.

4. Restart your terminal or run the following command to apply the changes:

   ```bash
   source ~/.zshrc
   ```

Now, every time you open a new terminal session or navigate into your project directory, the environment variables from the `.env.local` file should be automatically exported.

Install dependencies:

```
npm install
```

Run server in dev mode:

```
npm run server:dev
```

## How to work with the Backend

There are few rules that you have to obey .

1. Enviromment variables - define your envs in `.env.local` file and provide validation rules for them inside `@config/config.ts` file.
2. Structure your solution by components.
3. Define your routung inside `api.ts` fiile.
4. Describe your newly created API inside `swagger.json` file
5. In the components folder the apps component has all the main working components of our server and components other than app are used as packages or utilities to add other features to our application
6. Define utilities (like email-service,cloudinary stuff ,etc here ), middlewares and typescript interfaces in the core folder in src directory
7. Don't make changes in config folder
8. Don't install any new packages without a proper discussion as that lead to package conflicts
9. keep the database logic in service files and seperate from the controller , use clean coding practices whereever possible

## Testing

The Jest test suites are run by executing

```sh
npm test
```

To run tests directly inside of the Backend container:

```sh
docker-compose run web npm run test
```

## Code linting

Run code quality analysis using

```sh
npm run lint
```

or insde of the container

```sh
docker-compose run web npm run lint
```

## Fixing problems

Automatically fix linter's problems

```sh
npm run lint:fix
```

or insde of the container

```sh
docker-compose run web npm run lint:fix
```
