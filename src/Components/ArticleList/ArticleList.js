import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getArticles, changeCurrentPage } from "../../Services/Services";

import Article from "../Article";
import Loader from "../Loader";

import classes from "./ArticleList.module.scss";
import { Pagination } from "antd";

function ArticleList ({ getArticles, changeCurrentPage, state}) {
    useEffect(() => {
        getArticles((state.currentPage - 1) * 5);
    }, [state.currentPage]);

    const elements = (state) => 
    state.articles.map((article) => (
        <Article key={article.slug} loggedIn={state.loggedIn} data={article} />
    ))

    const pageChange = (current) => {
        changeCurrentPage(current);
        getArticles((current - 1) * 5);
    };
    
    function ServerPagination() {
        return (
            <Pagination 
            defaultCurrent={state.currentPage}
            total={(state.articlesCount * 10) / 5} 
            onChange={pageChange} />
        );
    };

    if (state.loading === true) {
        return (
            <div>
                <div className={classes.articleList}>
                    {elements(state)}
                </div>
                <div className={classes.pagination}>
                    <ServerPagination />
                    <Loader />
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className={classes.articleList}>
                    {elements(state)}
                </div>
                <div className={classes.pagination}>
                    <ServerPagination />
                </div>
        </div>
    );

};

const mapStateProps = (state) => ({
    state,
});

const mapDispatchToProps = (dispatch) => ({
    getArticles: (offset) => dispatch(getArticles(offset)),
    changeCurrentPage: (current) => dispatch(changeCurrentPage(current)),
});

export default connect(mapStateProps ,mapDispatchToProps)(ArticleList);