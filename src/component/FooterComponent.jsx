import React from 'react';

const FooterComponent = () => {
    return (
        <div>
            <footer
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#666666',
                    textAlign: 'center',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',   // căn giữa theo chiều ngang
                    alignItems: 'center',       // căn giữa theo chiều dọc
                }}
            >
                <span>Đây chỉ là bài tập ngắn của Hiếu thôi nha</span>
            </footer>
        </div>
    );
}
export default FooterComponent;
