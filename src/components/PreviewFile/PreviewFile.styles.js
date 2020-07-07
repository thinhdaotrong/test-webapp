import styled from 'styled-components';

export const PreviewFileStyles = styled.div`
    .preview-file {
        width: 95%;
        overflow-x: auto;
        position: absolute;
        display: flex;
        top: -46px;
        button {
            font-size: 10px;
            height: 26px;
            margin-right: 8px;
            color: #000;
            border-color: #000;
            .anticon {
                position: relative;
                bottom: 4px;
            }
        }
        .ant-btn > .anticon + span {
            margin-right: 8px;
            max-width: 100px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`