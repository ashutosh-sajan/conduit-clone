import React from 'react'
import { connect } from 'react-redux';
import uuid from './uuid';
import FontAwesome from 'react-fontawesome';
import { BrowserRouter as Router, Route , NavLink } from "react-router-dom";
import Loading from './Loading';

class Article extends React.Component {
	state = {
		tags: null,
	}

	componentDidMount(){
		this.props.dispatch({
			type: "ADD_ARTICLES",
			data: "",
			loading: true
		})

		fetch("https://conduit.productionready.io/api/articles").then(res => res.json()).then(data => this.props.dispatch({
				type: "ADD_ARTICLES",
				data: data,
				loading: false,
		}))
	}

	handleClick = (name) => {
		console.log(name, "in article user articles")
		fetch(`https://conduit.productionready.io/api/articles?author=${name}&limit=5&offset=0`).then(res => res.json()).then(data => this.props.dispatch(
				{
					type: "ADD_USER",
				 	user: data
				}
			));
	}

	handlePost = (obj) => {
		console.log(obj)
	}

  render() {
  	const { articles } = this.props;	
  	const array = articles.articles ? articles.articles : []
    return (
      <section >
      	<ul className="article-nav">
      		<li className="tag-list">Global Feed</li>
				</ul>
      	{
      		(articles.loading) ? <Loading /> :
      			((array.articles ? array.articles : []).map(article => {
	    				return (
	    					<div className="article" key={uuid()}>
	    						<div>
	    							<div className="article-header">
			    						<div className="user-info">
			    							<img src={article.author.image} alt="" />
			    							<div>
			    								<NavLink to="/User">
					    							<p onClick={() => this.handleClick(article.author.username)} className="username">{article.author.username}</p>
					    						</NavLink >
					    						<p>
					    							{
						    							new Date(article.createdAt).toString().split(" ").splice(0, 4).join(" ")
					    							}
					    						</p>
					    					</div>
				    					</div>
				    					<div className="likes">
				    						<i className="far fa-heart"></i>
				    						<span>{article.favoritesCount}</span>
				    					</div>
				    				</div>
		    					</div>
		    					<NavLink to="/Post">
			    					<h3 className="title" onClick={() => this.handlePost(article)}>{article.title}</h3>
			    					<p className="article-description" onClick={() => this.handlePost(article)}>{article.description}</p>
			    					<p className="read-more" onClick={() => this.handlePost(article)}> read more...</p>
			    				</NavLink>
	    					</div>
	    				)
    				})
    			)
      	}
      </section>
    );
  }
}

function mapStateToProps(state){
	return { articles: state.addArticles }
}

export default connect(mapStateToProps) (Article);