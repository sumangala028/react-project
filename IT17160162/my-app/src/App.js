import React from 'react';
import './App.css';
import './assets/css/app.css'
import './assets/css/elements.css'
import BlogFrom from './components/Form'
import Articles from './components/Articles'

// const sampleArticle = {
//   id: 12345,
//   title: "Mock Artcile",
//   author: "Sutgar",
//   date: Date.now(),
//   content: "afasifhasi asifhas ifh afas f asof asoifh aos"
// }
class BlogHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: {},
      articleToBeEdited: null
    }

    this.addNewArticle = this.addNewArticle.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.onEditPostClick = this.onEditPostClick.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
  }

  addNewArticle(articleObject) {
    this.setState({
      articles: {
        ...this.state.articles,
        [articleObject.id]: articleObject
      }
    })
  }

  updateArticle(articleObject) {
    const articleId = articleObject.id;

    const allArticles = this.state.articles;
    allArticles[articleId] = {
      ...allArticles[articleId],
      title: articleObject.title,
      author: articleObject.author,
      content: articleObject.content,
      updated: Date().substring(4, 24)
    }

    this.setState({
      articles: allArticles,
      articleToBeEdited: null
    })
  }

  deletePost(articleId) {
    const { [articleId]: articleToBeDeleted, ...otherArticles } = this.state.articles;

    this.setState({ articles: otherArticles })
  }

  onEditPostClick(articleId) {
    const foundArticle = this.state.articles[articleId]
    if (foundArticle) {
      this.setState({
        articleToBeEdited: foundArticle
      })
    }
  }

  render() {
    const { articles, articleToBeEdited } = this.state;
    const articlesValuesAsArray = Object.values(articles)
    return (
      <>
        <div className="container">
          <BlogFrom addNewArticle={this.addNewArticle} articleToBeEdited={articleToBeEdited} updateArticle={this.updateArticle} />
        </div>
  
        <div className="articlesBox">
          <Articles articles={articlesValuesAsArray} deletePost={this.deletePost} editPost={this.onEditPostClick}/>
        </div>
      </>
    )
  }
}

export default BlogHome;
