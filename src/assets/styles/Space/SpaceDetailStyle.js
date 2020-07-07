import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const SpaceDetailStyle = styled.div`
    .item-upcoming {
        box-shadow: #E4E4E4 4px 4px 8px;
    }
    .avatar-uploader {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -5px;
    }
    .ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector {
        border-radius: 5px;
    }

    .ant-select-multiple .ant-select-selector {
        border-radius: 5px
    }

    .ant-upload-picture-card-wrapper {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        width: 26px;
    }

    .ant-upload.ant-upload-select-picture-card {
        width: 30px;
        height: 30px;
        border-radius: 15px;
    }
    // Small devices (landscape phones, 576px and up)
    @media (max-width: 767.98px) {
     
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
     
    }
`;

export default WithDirection(SpaceDetailStyle);

// Extra small devices (portrait phones, less than 576px)
// @media (max-width: 575.98px) { ... }

// Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) and (max-width: 767.98px) { ... }

// Medium devices (tablets, 768px and up)
// @media (min-width: 768px) and (max-width: 991.98px) { ... }

// Large devices (desktops, 992px and up)
// @media (min-width: 992px) and (max-width: 1199.98px) { ... }

// Extra large devices (large desktops, 1200px and up)
// @media (min-width: 1200px) { ... }