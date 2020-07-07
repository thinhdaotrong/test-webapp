import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const CalendarStyle = styled.div`

    h4.ant-typography {
        font-size: 18px;
        line-height: 13px;
        color: #4d4f5c;
        text-align: center;
        position: relative;

        > span {
            position: absolute;
            left: 0;
            cursor: pointer;
        }
    }
    .events {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .events li {
        font-size: 9px;
        line-height: 11px;
        background: #000;
        color: #fff;
        padding: 7px 9px;
        border-radius: 4px;
        margin-bottom: 4px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .ant-picker-calendar-date-today {
        background: #f5f6fa !important;
    }
    .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date {
        background: #f5f6fa;
    }
    .ant-picker-calendar-full .ant-picker-panel .ant-picker-body th {
        text-align: center;
        font-weight: bold;
        color: #a3a6b4;
        padding: 12px 72px;
    }
    .ant-picker-calendar-full .ant-picker-panel .ant-picker-body thead tr {
        background-color: #f5f6fa;
        border: solid 1px #eaf0f4;
    }
    .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date {
        border: solid 1px #eaf0f4;
        margin: 0;
    }
    .notes-month {
        text-align: center;
        font-size: 28px;
    }
    .notes-month section {
        font-size: 28px;
    }
    // Small devices (landscape phones, 576px and up)
    @media (max-width: 767.98px) {
     
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
     
    }
`;

export default WithDirection(CalendarStyle);
