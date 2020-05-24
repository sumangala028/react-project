import React from 'react'

class BlogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      content: "",
      error: null,
      saveStatus: false,
      editId: null,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onArticleTitleChange = this.onArticleTitleChange.bind(this);
    this.onArticleAuthorChange = this.onArticleAuthorChange.bind(this);
    this.onArticleContentChange = this.onArticleContentChange.bind(this);
    this.onErrorCloseClick = this.onErrorCloseClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps && this.props.articleToBeEdited) {
      console.log('11111111', this.props.articleToBeEdited)
      this.setState({
        title: this.props.articleToBeEdited.title,
        author: this.props.articleToBeEdited.author,
        content: this.props.articleToBeEdited.content,
        error: null,
        saveStatus: false,
        editId: this.props.articleToBeEdited.id
      })
    } 
  }

  onSubmit() {
    const { title, author, content } = this.state;
    const { addNewArticle, articleToBeEdited, updateArticle } = this.props;

    if (!title) {
      this.setState({ error: "Wrong article title found, Please check article title." })
      return;
    }

    if (!author) {
      this.setState({ error: "Wrong author name found, Please check." })
      return;
    }

    if (!content) {
      this.setState({ error: "Content can't be empty, Please check." })
      return;
    }

    if (!articleToBeEdited) {
      const obj = {
        id: Date.now(),
        title,
        author,
        content,
        date: Date().substring(4, 24)
      }
      addNewArticle(obj)
    } else {
      const obj = articleToBeEdited;
      obj.title = title;
      obj.author = author;
      obj.content = content
      updateArticle(obj)
    }


    this.setState({
      saveStatus: true,
      title: "",
      author: "",
      content: ""
    })

    // close success message after 2s
    setTimeout(() => {
      this.setState({
        saveStatus: false
      })
    }, 2000)
  }

  onArticleTitleChange(e) {
    const titleData = e.target.value
    this.setState({
      title: titleData,
      error: null
    });
  }

  onArticleAuthorChange(e) {
    const authorData = e.target.value
    this.setState({
      author: authorData,
      error: null
    })
  }

  onArticleContentChange(e) {
    const contentData = e.target.value
    this.setState({
      content: contentData,
      error: null
    })
  }

  onErrorCloseClick() {
    this.setState({ error: null });
  }

  render() {
    const { title, author, content, error, saveStatus, editId } = this.state;
    const { articleToBeEdited } = this.props;

    const formTitle = articleToBeEdited ? "Edit Article : " + editId : "Create New Article";
    const buttonText = articleToBeEdited ? "Update Article" : "Save Article";

    return (
      <>
      <h2>{formTitle}</h2>

      {saveStatus && (
        <div className="alert-success">
            Successfully saved!
        </div>
      )}

      {error && (
        <div className="alert-danger">
          <span className="closebtn" onClick={this.onErrorCloseClick}>&times;</span>
            {error}
        </div>
      )}

      <label htmlFor="articleTitle">Article Title</label>
      <input type="text" value={title} onChange={this.onArticleTitleChange} placeholder="Type article title" />
  
      <label htmlFor="articleAuthor">Article Author</label>
      <input type="text" value={author} onChange={this.onArticleAuthorChange} placeholder="Type article author name.." />
  
      <label htmlFor="articleContent">Article Content</label>
      <textarea className="articleContent" placeholder="Article Content.." value={content} onChange={this.onArticleContentChange} ></textarea>
  
      <input type="submit" value={buttonText} onClick={this.onSubmit} />
      </>
    )
  }
}

export default BlogForm