import styled, { css } from 'styled-components';

export const UserRemoteSelectStyles = styled.div`
    .ant-select-selector {
        border-radius: 10px !important;
        // padding: 7px 12px 7px 124px !important;
        padding: ${props => props.isBook ? `4px 12px 4px 124px !important` : `7px 12px 7px 124px !important`};
        text-align: right;

        // border-color: ${props => props.isEdit && `#d9d9d9 !important`};
        // border-bottom: ${props => props.isEdit && `none !important`};
        // border-bottom-left-radius: ${props => props.isEdit && `0 !important`};
        // border-bottom-right-radius: ${props => props.isEdit && `0 !important`};
        // box-shadow: ${props => props.isEdit && `none !important`};

        ${props => props.isEdit && css`
            border-color: #d9d9d9 !important;
            border-bottom: none !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            box-shadow: none !important;
        `}
    }
    .ant-select-selection-placeholder {
        text-align: right;
    }
`