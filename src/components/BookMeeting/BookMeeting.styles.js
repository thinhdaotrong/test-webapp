import styled from 'styled-components';

export const BookMeetingStyles = styled.div`
    &.booking-content {
        box-shadow: 0px 5px 50px rgba(107, 107, 107, 0.16);
        border-radius: 15px;
        background: #fff;
    }
    .input-title {
        color: #000;
        font-size: 18px;
        font-weight: bold;
        border-radius: 10px;
        letter-spacing: 0.51px;
    }
    .input-prefix {
        position: absolute;
        z-index: 1;
        color: #000;
        font-size: 13px;
        line-height: 16px;
        left: 26px;
        top: 18px;
        font-weight: 600;

        .anticon {
            margin-right: 4px;
        }
    }
`;

export const BookingStyles = styled.div`
    filter: ${props => props.blur ? "blur(8px)" : "blur(0px)"};
.booking-header {
    border-radius: 9px 9px 0 0;
    padding: 24px 20px;
    display: flex;
    justify-content: space-between;
}
// .booking-title {
//     font-size: 24px;
//     letter-spacing: 0.51px;
//     color: #000;
// }
.booking-room-type {
    button {
        font-size: 10px;
    line-height: 13px;
    color: #000;
    border-color: #000;
    margin: 0 2px;
    }
}
.booking-body {
    padding: 0 20px;
}
.input-custom {
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;

    input {
        text-align: right;
        font-size: 13px;
        line-height: 16px;
        color: #000;
        font-weight: 600;
    }
    .ant-picker-clear {
        display: none;
    }
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
.input-block {
    padding: 36px 12px 0px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;

    button {
        line-height: 13px;
        margin: 0 4px 10px;
        font-size: 10px;
        padding: 8px 16px;
        height: 29px;

        .anticon {
            font-size: 11px;
        }
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
.btn-book {
    width: 80%;
    margin: 12px auto;
    font-size: 13px;
}

.members-list {
    .ant-list-items {
        display: flex;
        flex-wrap: wrap;
        font-size: 10px;
    }
    .ant-list-item {
        border: none;
        width: 50%;
        padding: 4px 12px 4px 0;
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
        padding: 6px 12px !important;
    }
    .ant-collapse-content {
        border-top: 0;
        border-radius: 0 0 10px 10px !important;
    }
    .ant-collapse-content-box {
        padding-top: 0
    }
}
.btn-danger {
    color: #fff !important;
    background: #ff0000 !important;
    border: none;
}
`;

export const BookingDoneStyles = styled.div`
    position: absolute;
    z-index: 10;
    .ant-result-title {
        color: #007814;
        font-weight: bold;
    }
    .ant-result-subtitle {
        color: #000;
        font-weight: 500;
    }
    .ant-result-extra {
        button {
            font-weight: 600;
            font-size: 12px;
        }
    }
`;

export const CalendarViewStyles = styled.div`
    position:  relative
    .ant-picker-cell .ant-picker-cell-inner {
        font-weight: bold;
    }
    .site-calendar-demo-card {
        width: 300px;
        margin: 0 auto;
        padding: 24px 0;

        .ant-picker-calendar-mode-switch {
            display: none;
        }
        .ant-picker-cell-in-view {
            color: #000;
        }
        .ant-picker-content th {
            color: #000;
            font-weight: bold;
        }
        .ant-picker-calendar-header {
            justify-content: center;
            padding-top: 24px;
            .ant-select-selector, .ant-select-arrow {
                color: #000
            }
        }
        .ant-picker-calendar-date-content {
            position: absolute;
            top: 18px;
            left: 8px;
        }
    }
    .meeting-schedule {
        padding: 0 40px 20px;
        .meeting-info {
            display: flex;

        }
        .meeting-time {
            margin-right: 28px;
            font-size: 10px;
            line-height: 13px;
            color: #000

            p:first-child {
                font-weight: 600;
            }
        }
        .meeting-name {
            h5 {
                font-size: 12px;
                font-weight: 600;
                line-height: 15px;
            }
            p {
                font-size: 9px;
                line-height: 11px;
                color: #000;
                font-weight: 500;
            }
        }
        .ant-list-split .ant-list-item:first-child {
            border-top: 1px solid #f0f0f0;
        }
    }
`;