import React from 'react'
import { faAddressBook, faCalendar, faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Articles = ({ articles, deletePost, editPost }) => {
  return (
    <>
     <h2> Articles</h2>

      {articles.length === 0 && (
        <div className="noArticles"> No Articles Found...!</div>
      )}

     {articles.map(article => (
        <div className="articleBox" key={article.id}>

            <span className="closebtn-red" onClick={() => deletePost(article.id)}>&times;</span>
            <span className="editBtn" onClick={() => editPost(article.id)}><FontAwesomeIcon className="fontAwesomeIcon" icon={faEdit} /> </span>

            <h3>{article.title}</h3>
            <div className="subDetails"> 
             <FontAwesomeIcon className="fontAwesomeIcon" icon={faAddressBook} /> 
               {article.author} 
               <div className="seperator">|</div> 
               <FontAwesomeIcon className="fontAwesomeIcon" icon={faCalendar} /> Created: {article.date}
               {article.updated && (
                  <>
                    <div className="seperator">|</div> 
                    <FontAwesomeIcon className="fontAwesomeIcon" icon={faCalendar} /> Updated: {article.updated}
                  </>
               )}
               
            </div>
            <div className="articleContentBox">
             <p> {article.content} </p>
            </div>
        </div>
     ))}
    </>
  )
}

export default Articles