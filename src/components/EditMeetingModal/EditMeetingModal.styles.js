import styled from 'styled-components';
import { Modal } from 'antd';

export const EditMeetingModalStyles = styled(Modal)`
    .ant-modal-content {
        border-radius: 9px;
    }
    .ant-modal-header {
        border-radius: 9px 9px 0 0;
        padding: 20px 30px;
    }
    .ant-modal-title {
        font-size: 19px;
        line-height: 23px;
        letter-spacing: 0.51px;
    }
    .ant-modal-body {
        padding: 20px 30px 4px;
    }
    .ant-modal-close {
        top: -13px;
        right: -13px;
    }
    .ant-modal-close-x {
        width: 28px;
        height: 28px;
        background: #ff4141;
        color: #fff;
        border-radius: 50%;
        top: 10px;
        .anticon {
            display: block;
            svg {
                height: 28px;
                width: 12px;
            }
        }
    }
    .input-title {
        color: #000;
        font-size: 19px;
        font-weight: bold;
        border-radius: 10px;
        letter-spacing: 0.51px;
    }
    .input-prefix {
        position: absolute;
        z-index: 1;
        color: #000;
        font-size: 15px;
        line-height: 19px;
        left: 30px;
        top: 24px;
        font-weight: 600;

        .anticon {
            margin-right: 4px;
        }
    }
    .input-custom {
        width: 100%;
        padding: 12px 22px;
        border-radius: 10px;

        input {
            text-align: right;
            font-size: 15px;
            line-height: 19px;
            color: #000;
            font-weight: 600;
        }
        .ant-picker-clear {
            display: none;
        }

        // &.ant-picker:hover, .ant-picker-focused {
        //     border-color: #d9d9d9;
        //     box-shadow: none;
        // }
    }
    .range-picker-custom {
        padding-left: 68px;

        .ant-picker-separator {
            color: #000
        }
        .ant-picker-active-bar {
            display: none;
        }
    }
    .text-area {
        padding-top: 40px;
        font-size: 10px;
    }
    .input-block {
        padding: 40px 20px 8px;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;

        > button {
            line-height: 15px;
            margin: 0 4px 12px;
            font-size: 12px;
            padding: 10px 20px;
            height: 35px;
        }
        .ant-btn > .anticon + span {
            margin-left: 3px;
        }
    }
    .btn-green {
        color: #fff !important;
        background: #4bd662 !important;
        border: none;
    }
    .btn-prefix {
        font-size: 10px;
        padding: 3px 20px;
        margin-left: 12px;
        height: 20px;
    }
    .btn-danger {
        color: #fff !important;
        background: #ff0000 !important;
        border: none;
    }
    .btn-modify {
        width: 80%;
        margin: 16px auto 4px;
        font-size: 13px;
        font-weight: 600;
    }
    .btn-delete {
        margin: 0 auto;
        font-size: 13px;
    }
    .members-list {
        border: 1px solid #d9d9d9;
        border-top: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        .ant-list-items {
            display: flex;
            flex-wrap: wrap;
            font-size: 10px;
        }
        .ant-list-item {
            border: none;
            width: 50%;
            padding: 4px 12px;
        }
        .ant-list-item-action > li {
            line-height: 0
        }
        button {
            font-size: 8px;
            padding: 0px 12px;
            height: 18px;
        }
        .ant-list-item-action {
            margin-left: 0
        }
        .ant-avatar {
            margin-right: 8px;
        }
    }
    .collapse-custom {
        border-radius: 10px;
        background: #fff;
        .ant-collapse-item {
            border-radius: 0 0 10px 10px !important;
        }
        .ant-collapse-header {
            padding: 11px 16px !important;
        }
        .ant-collapse-content {
            border-top: 0;
            border-radius: 0 0 10px 10px !important;
        }
        .ant-collapse-content-box {
            padding-top: 0
        }
    }
}
`