import styled from 'styled-components';

export const CurrentMeetingStyle = styled.div`
    background-color: #fff;
    border-radius: 15px;
    .title {
        padding: 20px 30px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(107, 107, 107, 0.16);

        .text {
            h3 {
                font-size: 33px;
                line-height: 40px;
                font-weight: bold;
            }
            p {
                font-size: 18px;
                line-height: 22px;
                color: #000;
            }
            span {
                font-size: 17px;
                line-height: 20px;
                color: #000;
                font-weight: bold;
            }
        }
        .actions {
            width: 295px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            button {
                font-size: 11px;
                line-height: 14px;
                color: #fff;
                letter-spacing: 0.33px;
                font-weight: 600;
                width: 141px;
            }
            .btn-1, .btn-2 {
                background: #ccc;
                border-color: #ccc;
            }
            .btn-3 {
                background: #fd0000;
                border-color: #fd0000;
            }
        }
    }
    .content {
        padding: 20px 16px 12px 30px;

        h4 {
            font-size: 20px;
            line-height: 24px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        .members {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin-bottom: 20px;
            > span {
                margin-right: 24px;
                margin-bottom: 12px;
            }
            .ant-avatar {
                margin-right: 13px;
            }
        }
        > p {
            font-size: 15px;
            line-height: 22px;
            color: #424242;
            margin-bottom: 28px;
        }
        .message-list {
            height: ${props => props.hasFile ? "280px" : "320px"};
            margin-bottom: ${props => props.hasFile ? "48px" : "8px"};
            overflow-y: auto;
        }
        .message-block {
            display: flex;
            margin-bottom: 16px;
            .ant-avatar {
                margin-right: 4px;
            }
            .info {
                width: calc(100% - 40px)
            }
            .name {
                font-size: 12px;
                line-height: 15px;
                color: #000;
                font-weight: 500;
                margin-right: 4px;
            }
            .time {
                font-size: 9px;
                line-height: 11px;
                font-weight: 500;
            }
            .message {
                font-size: 15px;
                line-height: 22px;
                color: #424242;
                margin-bottom: 4px;
                display: table-cell;
            }
            .files {
                button {
                    font-size: 12px;
                    color: #424242;
                    font-weight: 500;
                    border-color: #424242;
                    margin-right: 8px;
                    margin-bottom: 4px;
                }
            }
            .ant-space {
                margin-bottom: 4px;
                display: flex;
            }
        }
        .input-message {
            display: flex;
            justify-content: space-between;
            position: relative;
        }
        .ant-input-affix-wrapper {
            margin-right: 8px;
            border-radius: 33px;
            border-color: #000;
    
            input {
                color: #000;
                font-size: 14px;
    
                &::placeholder {
                    font-style: italic;
                }
            }
        }
        .ant-input-suffix {
            color: #000;
            cursor: pointer;
        }
    }
`