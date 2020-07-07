import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const PeopleStyle = styled.div`

    .right {
        border-bottom: 1px solid #e8e8e8;
    }
    .ant-menu-horizontal {
        .ant-menu-item-selected {
            color: #000
            border-bottom: 2px solid #000;
        }
        .ant-menu-item:hover {
            .ant-menu-item-active {
                color: #000
                border-bottom: 2px solid #000;
            }
        }
    }
    .ant-switch-checked {
        background-color: #4CD964
    }
    
    // .profile {
    //     .bEAwem {
    //         padding: 0px;
    //     }
    // }
    
    // Small devices (landscape phones, 576px and up)
        @media (max-width: 767.98px) {
            .profile {
                margin-top: 30px;
                height: max-content;
            }
            .container {
                padding: 10px;
            }
        }

    // Medium devices (tablets, 768px and up)
        @media (min-width: 768px) {
            .body {
                display: flex;
                flex-direction: row;
            }
            .table {
                width: 75%;
                margin-right: 20px;
            }
            .profile {
                width: 25%;
                height: max-content;
            }
            .container {
                padding: 20px 10px;
            }
        }
`;

export default WithDirection(PeopleStyle);
