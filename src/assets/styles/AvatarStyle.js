import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const AvatarStyle = styled.div`
    display: flex;
    flex-direction: row;

    .btn-file {
        position: relative;
        overflow: hidden;
        cursor: pointer
    }
    .btn-file input[type=file] {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        outline: none;
        background: white;
        cursor: pointer;
        display: block;
    }

    .ant-upload.ant-upload-select-picture-card {
        width: 26px;
        height: 26px;
        border-radius: 13px;
        border: 1px solid #d9d9d9;
        margin-bottom: 0px;
        margin-right: 0px;
        position: relative;
        .ant-upload {
            padding: 0px;

        }
    }
`;

export default WithDirection(AvatarStyle);
