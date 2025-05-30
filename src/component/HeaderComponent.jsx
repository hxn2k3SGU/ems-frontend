import React from 'react'

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60px',
                    backgroundColor: '#666666'
                }} className='navbar navbar-dark'>
                    <a className='navbar-brand' href="https://www.facebook.com/">Hệ thống quản lý nhân viên</a>
                </nav>
            </header>
        </div>
    )
}
export default HeaderComponent
