import styled from 'styled-components';
import { palette } from 'styled-theme';

const LayoutContentProfileStyle = styled.div`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid ${palette('border', 0)};
  height: 100%;
  overflow: auto;
  border-radius: 20px;

  .header-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .header-right {
      display: flex;
      flex-direction: row;

      .radio-group {
        height: 32px;
      }

      .search-box {
        margin-left: 15px;
      }
    }
  }

  .button-create {
    margin-top: 25px;
    height: 32px;
  }

  .table-wrapper {
    margin-top: 25px;
    
    .table-display {
      flex: 1;

      .image-style {
        width: 48px;
        height: 48px;
        border-radius: 4px;
      }
    }
  }

  .upload-list-inline .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }

  // Small devices (landscape phones, 576px and up)
  @media (max-width: 767.98px) {
    // padding: 8px;
  }
  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
    // padding: 23px 20px;
  }
`;

export default LayoutContentProfileStyle;
