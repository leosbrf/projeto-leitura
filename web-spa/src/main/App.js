import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Consumer } from './theme/context'
import MainHeader from './layout/MainHeader'
import MainContent from './layout/MainContent'
import { SnackbarProvider } from 'notistack'
import Posts from './containers/Posts'
import NewPost from './components/Posts/NewPost'
import EditPost from './components/Posts/EditPost'
import PostDetails from './components/Posts/PostDetails'
import PageNotFound from './components/Navigation/PageNotFound'

const App = () => {
  return (
    <Consumer>
      {({ options, handleConfigVarChange, ...configVars }) => (
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}>
          <Fragment>
            <MainHeader onThemePropsChanged={handleConfigVarChange} title="Readable" />
            <MainContent>
              <Switch>
                <Route exact path='/:category/:id' component={PostDetails} ></Route>
                <Route path='/newPost' component={NewPost} ></Route>
                <Route path='/post/:id/edit' component={EditPost} ></Route>
                <Route path='/404'component={PageNotFound} ></Route>
                <Route exact path='/:category?' component={Posts} ></Route>
                {/* "This route catches url locations not handled by previous routes" */}
                <Route component={PageNotFound} ></Route>
              </Switch>
            </MainContent>
          </Fragment>
        </SnackbarProvider>
      )}
    </Consumer>
  );
}

export default App