import React from 'react';

export const Article = ({ article, onBackToWikiList, onDeleteArticle }) => {
  const handleDeleteClick = () => {
    onDeleteArticle(article.slug);
  };
  return <>
      <h2>{article.title}</h2>
      <p><strong>Author: </strong>{article.author}</p>
      <p><strong>Content: </strong>{article.content}</p>
      <p><strong>Tags: </strong>{article.tags.map((tag, index) => (
          <React.Fragment key={index}>
            <br />
            {tag}
          </React.Fragment>
        ))}</p>
      <p><strong>Date: </strong>{article.date}</p>
      <button onClick={onBackToWikiList}>Back to Wiki List</button>
      <button onClick={handleDeleteClick}>Delete</button>
  </>
}