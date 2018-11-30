import React, { Fragment, PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { withStyles, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@material-ui/core'
import { fetchAllCategoriesRequested } from '../../../store/modules/categories/actions'
import { withSnackbar } from 'notistack'

const styles = theme => {
    return {
        form: {
            margin: theme.spacing.unit,
            textAlign: 'center',
            width: '100%',
            top: 64,
            position: 'relative'
        },
        formControl: {
            width: '50%',
            minWidth: 120,
            [theme.breakpoints.down('sm')]: {
                width: '80%'
            }
        },
        fab: {
            position: 'sticky',
            left: '100%',
            bottom: theme.spacing.unit * 4,
            marginBottom: theme.spacing.unit * 8,
            right: theme.spacing.unit * 2
        },
        fabBack: {
            position: 'sticky',
            left: '100%',
            bottom: theme.spacing.unit * 8,
            marginBottom: theme.spacing.unit * 24,
            right: theme.spacing.unit * 2
        }
    }
}

export class PostForm extends PureComponent {

    state = {
        selectedCategory: '',
        labelWidth: 0,
        errors: {}
    }

    componentDidMount() {

        const { post } = this.props

        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
            selectedCategory: post && post.id ? post.category : null
        });
    }

    handleChangeCategory = (event) => {
        this.setState({ [event.target.name]: event.target.value }, () => {
            const errors = this.validate()
            this.setState({ errors: errors })
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { handleSubmit, onPresentSnackbar } = this.props

        const { selectedCategory } = this.state

        const errors = this.validate()

        const keys = Object.keys(errors)
        if (keys && keys.length > 0) {
            onPresentSnackbar('error', 'Please fill out the required fields');
            this.setState({ errors: errors })
        } else {
            handleSubmit({ 
                title: this.titleInput.value,
                body: this.bodyInput.value,
                author: this.authorInput.value,
                category: selectedCategory,
                errors: errors
             })
        }

    }

    validate = () => {
        const errors = {}

        const { selectedCategory } = this.state

        if (!this.titleInput.value)
            errors['title'] = 'Title is required'

        if (!this.bodyInput.value)
            errors['body'] = 'Body is required'

        if (!this.authorInput.value)
            errors['author'] = 'Author is required'

        if (!selectedCategory)
            errors['category'] = 'Category is required'

        return errors
    }

    render() {
        const { errors, labelWidth, selectedCategory } = this.state
        const { classes, categories, handleBack, post } = this.props

        let title, body, author, category = ''
        
        if (post && post.id) {
            title = post.title
            body = post.body
            author = post.author
            //category = post.category -> carregado no evento componentDidMount()
        }

        if (selectedCategory)
            category = selectedCategory

        return (
            <Fragment>
                <form autoComplete="off" className={classes.form}>
                    <div>
                        <TextField
                            id="title"
                            autoFocus
                            className={classes.formControl}
                            label="Title"
                            margin="normal"
                            variant="outlined"
                            defaultValue={title}
                            required
                            error={errors['title'] ? true : false}
                            inputRef={node => (this.titleInput = node)} />
                    </div>
                    <div>
                        <TextField
                            id="body"
                            className={classes.formControl}
                            label="Body"
                            margin="normal"
                            multiline={true}
                            rows={10}
                            variant="outlined"
                            defaultValue={body}
                            required
                            error={errors['body'] ? true : false}
                            inputRef={node => (this.bodyInput = node)} />
                    </div>
                    <div>
                        <TextField
                            id="author"
                            className={classes.formControl}
                            label="Author"
                            margin="normal"
                            variant="outlined"
                            defaultValue={author}
                            required
                            error={errors['author'] ? true : false}
                            inputRef={node => (this.authorInput = node)} />
                    </div>

                    <div>
                        <FormControl
                            className={classes.formControl}
                            variant="outlined"
                            margin="normal"
                            required
                            error={errors['category'] ? true : false} >
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="category-input">
                                Category
                                </InputLabel>
                            <Select
                                value={category}
                                onChange={this.handleChangeCategory}
                                input={
                                    <OutlinedInput
                                        labelWidth={labelWidth}
                                        name="selectedCategory"
                                        id="category-input"
                                    />
                                }>
                                {categories.map(category => {
                                    return <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </form>
                <Button
                    variant="fab"
                    color="default"
                    className={classes.fabBack}
                    onClick={(e) => handleBack(e)}>Back</Button>
                <Button
                    variant="fab"
                    color="primary"
                    className={classes.fab}
                    type="submit"
                    onClick={(e) => this.handleSubmit(e)}>Save</Button>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
})

const mapDispatchToProps = dispatch => (
    {
        onFetchCategories: () => dispatch(fetchAllCategoriesRequested()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withSnackbar(PostForm)))