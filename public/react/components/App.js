import React, { useState, useEffect } from 'react';
import { Article } from './Article';
import { PagesList } from './PagesList';
import { CreatePageForm } from './CreatePageForm';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
	const [pages, setPages] = useState([]);
	const [article, setArticle] = useState(null);
	const [isAddingArticle, setIsAddingArticle] = useState(false);

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function fetchArticle(slug){
		try {
			const response = await fetch(`${apiURL}/wiki/${slug}`);
			const articleResponse = await response.json();
			
			const originalDate = new Date(articleResponse.updatedAt);
			const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
			const formattedDateString = originalDate.toLocaleDateString('en-GB', options);

			const tagNames = []
			articleResponse.tags.map(tag =>
				(tagNames.push(tag.name)));

			const articleData = {
				title: articleResponse.title,
				author: articleResponse.author.name,
				content: articleResponse.content,
				tags: tagNames,
				date: formattedDateString,
				slug: articleResponse.slug,
			}
			setArticle(articleData);
			console.log(articleData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	const handleBackToWikiList = () => {
		setArticle(null);
	};

	const handleAddArticleClick = () => {
		setIsAddingArticle(true);
	};

	const handleCreatePage = async (formData) => {
		try {
		  const response = await fetch(`${apiURL}/wiki`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		  });
		  const createdPage = await response.json();
	
		  setIsAddingArticle(false);
		  fetchPages();
		} catch (err) {
		  console.log("Oh no an error! ", err);
		}
	};

	const handleDeleteArticle = async (slug) => {
		try {
		  const response = await fetch(`${apiURL}/wiki/${slug}`, {
			method: 'DELETE',
		  });

		  fetchPages();
		  setArticle(null);
		} catch (err) {
		  console.log("Oh no an error! ", err);
		}
	};
	
	useEffect(() => {
		fetchPages();
	}, []);

	return (
		<main>
			<h1>WikiVerse</h1>
			{isAddingArticle ? (
       		<CreatePageForm onCreatePage={handleCreatePage} />
      		) : article ? (
				<Article
				article={article}
				onBackToWikiList={handleBackToWikiList}
				onDeleteArticle={handleDeleteArticle}
				/>
			) : (
				<>
					<h2>⚛️ Wikipedia as a React SPA ⚛️</h2>
					<PagesList pages={pages} fetchArticle={fetchArticle} />
					<button onClick={handleAddArticleClick}>Add Article</button>
				</>
			)}
		</main>
	);
};