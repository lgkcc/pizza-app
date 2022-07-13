import React, {useCallback, useEffect, useRef, useState} from 'react';
import classes from "./Search.module.scss";
import {setSearch} from "../../../redux/slices/filterSlice";
import debounce from 'lodash.debounce'
import {useLocation} from "react-router-dom";
import {useAppDispatch} from "../../../redux/store";


const Search: React.FC = () => {

    const inputRef = useRef<HTMLInputElement>(null)
    const loadFlagRef = useRef<boolean>(true)

    const dispatch = useAppDispatch()

    const location = useLocation()

    const [localSearch, setLocalSearch] = useState<string>('')

    useEffect(() => {
        if (loadFlagRef.current) {
            loadFlagRef.current = false
            const searchValueUrl = location.search.split('activeSearch=')
            setLocalSearch(searchValueUrl.length > 1 ? searchValueUrl[searchValueUrl.length-1] : '')
        }
    }, [])

    const changeInputGlobal = useCallback(
        debounce(value => {
            dispatch(setSearch(value))
        }, 300),
        []
    )
    const changeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value)
        changeInputGlobal(e.target.value)
    }

    const clearInput = () => {
        setLocalSearch('')
        changeInputGlobal('')
        inputRef.current?.focus()
    }


    return (
        <div className={classes.root}>
            <input ref={inputRef} onChange={changeInput} value={localSearch} type="text"
                   className={classes.input} placeholder='Поиск пиццы...'/>

            <svg className={classes.ico} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
                <path d="M0 0h48v48h-48z" fill="none"/>
            </svg>
            {
                localSearch &&
                <svg onClick={() => clearInput()} className={classes.clear} data-name="Layer 1" height="200"
                     id="Layer_1" viewBox="0 0 200 200"
                     width="200" xmlns="http://www.w3.org/2000/svg"><title/>
                    <path
                        d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/>
                </svg>
            }
        </div>
    );
};

export default Search;
