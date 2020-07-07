import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const MeetingStyle = styled.div`

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
    
    .profile {
        .bEAwem {
            padding: 0px;
        }
    }
    .isoIconWrapper {
        position: relative;
        line-height: normal;
        margin-left: -20px;
        span {
            font-size: 12px;
            color: #fff;
            background-color: #FCAF29;
            width: 20px;
            height: 20px;
            display: -webkit-inline-flex;
            display: -ms-inline-flex;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            line-height: 20px;
            position: absolute;
            top: -8px;
            left: ${props =>
                props['data-rtl'] === 'rtl' ? 'inherit' : '10px'};
            right: ${props =>
                props['data-rtl'] === 'rtl' ? '10px' : 'inherit'};
            border-radius: 50%;
        }
      }
    // Small devices (landscape phones, 576px and up)
        @media (max-width: 767.98px) {
            .profile {
                margin-top: 30px;
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
                width: 25%
            }
            .container {
                padding: 20px 10px;
            }
            .body-profile {
                padding-left: 13px;
            }
        }
`;

export default WithDirection(MeetingStyle);
