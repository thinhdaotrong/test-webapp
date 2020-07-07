import styled from 'styled-components';

export const MeetingStyles = styled.div`
    width: 100%;
    .block {
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 5px 50px #e4e4e4;
    }
    .meetings-table {
        margin-right: 12px;

        .btn-new-meeting {
            font-weight: bold;
            color: #000;
            border-color: #000;
            font-size: 12px; 
        }
    }

    .ant-tabs-bar {
        margin: 0
    }
    .ant-tabs-nav .ant-tabs-tab {
        margin: 0;
        padding: 20px 32px;
        font-weight: bold;
        letter-spacing: 0.37px;
        color: #989898;
    }
    .ant-tabs-nav .ant-tabs-tab-active {
        color: #000;
    }
    .ant-tabs-extra-content {
        margin-right: 28px;
        margin-top: 8px;
    }
    .ant-table-thead > tr > th {
        padding: 10.5px 16px;
        background: #fff;
        letter-spacing: 0.37px;
    }
    .ant-table-column-sorters {
        padding: 0;
    }
    .ant-table-tbody > tr > td {
        font-size: 12px;
        line-height: 15px;
        color: #989898;
        letter-spacing: 0.32px;

        &:last-child {
            font-size: 16px;
            .anticon {
                margin: 0 6px;
                cursor: pointer;
            }
        }

        .number-messages {
            width: 19px;
            height: 16px;
            background-color: #fcaf29;
            color: #fff;
            border-radius: 10px;
            position: absolute;
            top: 16px;
            left: 50%;
            line-height: 16px;
            font-size: 9px;
        }
    }
    .ant-list-bordered {
        border: none;
        border-radius: 4px;

        .ant-list-header {
            padding: 12px 20px;
            color: #000;
            font-weight: bold;
            line-height: 18px;
        }
        .ant-list-item {
            padding: 13.5px;
        }
    }
    .ant-list-bordered .ant-list-footer {
        padding: 24px;
    }
    .ant-breadcrumb {
        color: #000;
        padding-bottom: 16px;
        font-size: 13px;
        line-height: 16px;
    }
    .ant-breadcrumb-separator {
        color: #000;
    }
    .ant-breadcrumb > span:last-child {
        color: #989898;
    }
    .avatar-upon {
        margin-left: -10px;
    }
`;

export const OperationsStyles = styled.div`
    display: flex;
    justify-content: space-between;
    width: 112px;
    padding: 12px 0;
    .anticon {
        color: #000;
        font-size: 18px;
        cursor: pointer;

        .anticon-bar-chart {
            font-size: 20px
        }
    }
`

export const SettingActionsStyles = styled.div`
    padding: 0px 8px;
    p {
        font-size: 12px;
        margin-bottom: 11px;
        line-height: 15px;
        cursor: pointer;
        letter-spacing: 0.32px;
    }
`

export const FilterActionsStyles = styled.div`
    .ant-input-affix-wrapper {
        border-radius: 33px;
        background: #dbdbdb;
        height: 26px;
        box-shadow: none !important;
        border-color: #dbdbdb !important;
        width: 220px;
        margin: 0px 12px;
    }
    .ant-input-prefix {
        font-size: 12px;
    }
    .ant-input-affix-wrapper > input.ant-input {
        background: #dbdbdb;
        color: #000;
        font-size: 10px;
        line-height: 13px;
        letter-spacing: 0.27px;
    }
    p {
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.32px;
        color: #505050;
        padding: 4px 13px;
        background: #dbdbdb;
        margin: 6px 0;
    }
    .ant-checkbox-group {
        padding: 0 12px;
    }
    .ant-checkbox + span {
        padding-right: 8px;
        padding-left: 8px;
        font-size: 12px;
        color: #000;
        letter-spacing: 0.32px;
    }
`

export const MeetingDetailStyles = styled.div`
.meeting-detail {
    margin-left: 12px;
    // min-height: 100vh;
    min-height: 593px;

    &-header {
        padding: 20px;
        font-size: 14px;
        line-height: 19px;
        letter-spacing: 0.43px;
        color: #000;
        font-weight: bold;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        justify-content: space-between;
        span:first-child {
            width: calc(100% - 20px)
        }
    }

    &-content {
        padding: 16px 16px;
        // color: #505050;

        .date-time ul li {
            font-size: 12px;
            line-height: 15px;
            color: #000;
            padding: 7px 0;
            letter-spacing: 0.32px

            .anticon {
                margin-right: 8px;
                font-size: 14px;
            }
        }

        .block-title {
            font-size: 13px;
            line-height: 14px;
            font-weight: 600;
            color: #000;
            padding: 12px 0;
            letter-spacing: 0.29px;
        }

        .attendees {
            .ant-col {
                margin-bottom: 4px;
            }
            .ant-avatar {
                margin-right: 4px;
            }
            .name {
                font-size: 10px;
                line-height: 13px;
                color: #989898;
            }
        }

        .agenda {
            p {
                font-size: 12px;
                line-height: 15px;
                color: #989898;
                letter-spacing: 0.32px;
            }
        }
    }

    &-item {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .name {
            font-size: 12px;
            color: #989898;
            line-height: 20px;
        }
        .value {
            font-size: 14px;
            font-weight: bold;
            color: #000;
        }
    }
}
`

export const QuickStatsStyles = styled.div`
    .quick-stats {
        margin-left: 12px;
        min-height: 593px;

        &-header {
            padding: 20px;
            font-size: 14px;
            line-height: 19px;
            letter-spacing: 0.37px;
            color: #000;
            font-weight: bold;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-between;
        }
        
        &-content {
            ul li {
                padding: 14px;
                border-bottom: 1px solid #f0f0f0;
                display: flex;
                justify-content: space-between;
            }
            .name {
                .anticon {
                    width: 28px;
                    height: 28px;
                    background: #000;
                    color: #fff;
                    line-height: 32px;
                    margin-right: 8px;
                }
                .text {
                    font-size: 12px;
                    line-height: 20px;
                    letter-spacing: 0.32px;
                }
            }
            .value {
                font-size: 14px;
                line-height: 28px;
                letter-spacing: 0.37px;
                color: #000;
                font-weight: bold;
            }
        }
    }
`

export const GroupChatStyles = styled.div`
    .message-list {
        height: 300px;
        height: ${props => props.hasFile ? "300px" : "340px"};
        margin-bottom: ${props => props.hasFile ? "48px" : "8px"}
        overflow-y: auto;
    }
    .message-block {
        margin-bottom: 8px;
        .user {
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            .name {
                font-size: 10px;
                line-height: 13px;
                color: #000;
            }
            .time {
                font-size: 8px;
                line-height: 22px;
                color: #989898;
                margin-right: 4px;
            }
        }
        .message {
            width: 80%;
            font-size: 10px;
            line-height: 16px;
            margin: 6px 0;
        }
        .files {
            button {
                font-size: 10px;
                height: 26px;
                margin-right: 8px;
                margin-bottom: 4px;
                color: #000;
                border-color: #000;
            }
        }
        .ant-space {
            margin: 4px 0;
            display: flex;
            input, button {
                font-size: 12px;
                height: 24px;
            }
        }
    }
    .ant-avatar.ant-avatar-icon {
        margin-right: 4px;
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
            font-size: 12px;

            &::placeholder {
                font-style: italic;
            }
        }
    }
    .ant-input-suffix {
        color: #000;
        cursor: pointer;
    }
`

export const AdminChatStyles = styled.div`
    position: relative;
    .admin-chat-title {
        position: absolute;
        border: 1px solid #f0f0f0;
        z-index: 10;
        top: -8px;
        left: 50%;
        font-size: 10px;
        color: #000;
        font-weight: 600;
        background: #fff;
        padding: 0 4px;
        transform: translateX(-39px);
    }
    .message-list {
        height: ${props => props.hasFile ? "448px" : "488px"};
        margin-bottom: ${props => props.hasFile ? "48px" : "8px"}
        overflow-y: auto;
        padding: 20px 0 0 16px;
    }
    .message-block-user {
        text-align: right;
        padding: 0px 8px 12px 30%;
        .message {
            font-size: 10px;
            margin-bottom: 4px;
            color: #fff;
            background: #000;
            padding: 8px 24px;
            border-radius: 32px;
            display: inline-block;
            text-align: left;
        }
        .files {
            color: #fff;
            background: #000;
        }
    }
    .message-block-admin {
        position: relative;
        padding: 0px 30% 12px 8px;
        .name {
            position: absolute;
            font-size: 8px;
            background: #fff;
            padding: 0px 12px;
            border-radius: 8px;
            top: -8px;
            left: 32px;
            border: 1px solid #e0e0e0;
        }
        .message {
            font-size: 10px;
            margin-bottom: 4px;
            color: #000;
            background: #dfdfdf;
            padding: 8px 24px;
            border-radius: 32px;
            display: inline-block;
            min-width: 76px;
        }
        .files {
            color: #000;
            background: #dfdfdf;
        }
    }
    .files {
        .anticon {
            margin-right: 4px
        }
        font-size: 10px;
        margin-bottom: 4px;
        padding: 8px 24px;
        border-radius: 32px;
        display: inline-block;
        text-align: left;
    }
    .time {
        font-size: 8px;
    }
    .ant-avatar.ant-avatar-icon {
        margin-right: 4px;
    }
    .input-message {
        display: flex;
        justify-content: space-between;
        padding: 0 4px;
        position: relative;
    }
    .ant-input-affix-wrapper {
        margin-right: 8px;
        border-radius: 33px;
        border-color: #000;

        input {
            color: #000;
            font-size: 12px;

            &::placeholder {
                font-style: italic;
            }
        }
    }
    .ant-input-suffix {
        color: #000;
        cursor: pointer;
    }
`