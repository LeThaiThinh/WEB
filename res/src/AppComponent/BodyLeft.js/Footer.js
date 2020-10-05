import React, { Component } from 'react'
import '../../App.css'
class Footer extends Component {
    render() {
        return (
                <ul className='FooterInfo' >
                    <h4>Thông tin</h4>
                    <li><p>Email: 123@gmail.com</p> </li>
                    <li><p>Sdt: 01234567890</p> </li>
                    <li><p>Địa chỉ: Hệ mặt trời</p></li>
                </ul>
        )
    }
}

export default Footer
