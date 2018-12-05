# projeto-leitura

This is a sample application built with ReactJs. It is a blog like website that allows you to, you know, share your ideas. People can vote on your post, write comments and also vote on comments. There is a side menu (drawer) that allows you to filter posts by category.

## Structure

The application is a Single Page Application that uses `redux`, `redux-saga`, `axios`, `material-ui` and `notistack`. 

The `store` folder contains the actions, reducers and sagas grouped by feature (posts and categories). 

The `shared` folder contains the API configuration and common utilities.

The `main` folder contains the Views and Components for handling the User Interface.


## Install from source

### Requirements
> - You must have node installed on your machine
> - You must install npm or yarn

To run this project, follow the below instructions. (If you have `yarn` installed on your machine, replace `npm` with `yarn`)

1. Clone this github repository

```Apache
$ git clone https://github.com/leosbrf/projeto-leitura.git
$ cd projeto-leitura
```

### For the NodeJs Application (`api-server` folder)

2. Go to the `api-server` folder and execute:

```Apache
$ cd api-server
$ npm install
$ npm start
```

### For the React Application (`web-spa` folder)

3. Go to the `web-spa` folder and execute:

```Apache
$ cd web-spa
$ npm install
$ npm start
```

Finally, the web application will be served on:
> http://localhost:3000

## Testing

For the React Application you can run some tests using Enzyme and jest. Just run one of the following commands:

```sql
npm test
```
or for test coverage
```
npm testc
```

## License

The contents of this repository are covered under the [MIT License](https://github.com/leosbrf/projeto-leitura/blob/master/LICENSE).

