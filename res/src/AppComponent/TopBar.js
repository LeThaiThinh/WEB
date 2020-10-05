import React from 'react'
import '../App.css';
import {useDispatch } from 'react-redux'
import {HomeAction, BookAction, MenuAction,LoginAction} from './ChangePageReducer'


const TopBar =()=>{

        const dispatch = useDispatch()
         return (
        <div className='TopBar'>
            <div onClick={() => dispatch(HomeAction())}><h5>TRANG CHỦ</h5></div>
            <div onClick={() => dispatch(BookAction())}><h5>ĐẶT CHỖ</h5></div>
            <div onClick={() => dispatch(MenuAction())}><h5>THỰC ĐƠN</h5></div>
            <div onClick={() => dispatch(LoginAction())}><h5>ĐĂNG NHẬP</h5></div>
        </div>
        )
        
}


export default TopBar
