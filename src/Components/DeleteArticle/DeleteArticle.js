import React from 'react';
import { connect } from "react-redux";
import classes from "./DeleteArticle.module.scss";
import warning from "../../img/Warning.png";
import { deleteModuleToggle, deleteArticle } from '../../Services/Services';

function DeleteArticle ({ state, deleteModuleToggle, deleteArticle}) {
    if (state.deleteModule) {
        return (
            <div className={classes.moduleWrapper}>
                <div className={classes.modulePart} />
                    <div className={classes.mainContent}>
                        <div className={classes.header}>
                            <img 
                            className={classes.image}
                            src={warning}
                            />
                            <div className={classes.moduleQuestion}>
                                Are you sure to delete this article?
                            </div>
                        </div>
                        <div className={classes.btn}>
                            <button onClick={deleteModuleToggle} 
                            className={classes.btnNO}>
                                No
                            </button>
                            <button onClick={() => deleteArticle(state.article.slug)}
                            className={classes.btnYES}>
                                Yes
                            </button>
                        </div>
                        
                    </div>
            </div>
        );
    };
};

const mapStateProps = (state) => ({
    state,
});

const mapDispatchToProps = (dispatch) => ({
    deleteModuleToggle: () => dispatch(deleteModuleToggle()),
    deleteArticle: (slug) => dispatch(deleteArticle(slug)),
});

export default connect(mapStateProps, mapDispatchToProps)(DeleteArticle);