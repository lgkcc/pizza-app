import React from 'react';

import classes from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
    return (
        <div className={classes.notFound}>
            <h1>
                <span>☹</span>
                <br/>
                Ничего не найдено
            </h1>
            <p>К сожалению, в нашем интернет-магазине нету такой страницы</p>
        </div>
    )
}

export default NotFoundBlock;
