import React from 'react';
import ReactPaginate from "react-paginate";
import classes from "./Pagination.module.scss";
import {setPage} from "../../redux/slices/filterSlice";
import {RootState, useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";

const Pagination:React.FC = () => {

    const dispatch = useAppDispatch()
    return (
        <div className={classes.pagination}>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={event => dispatch(setPage(event.selected+1))}
                pageRangeDisplayed={8}
                pageCount={3}
                previousLabel="<"
            />
        </div>
    );
};

export default Pagination;
