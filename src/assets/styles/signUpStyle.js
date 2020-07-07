import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const SignUpStyle = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-size: cover;

  .ant-input {
      background-color: #fff;
      height: 35px;
  }
  .ant-btn-round {
    height: 35px;
  }
  .ant-input-affix-wrapper-sm {
    padding: 2px 10px;
  }
    // Small devices (landscape phones, 576px and up)
    @media (max-width: 767.98px) {
      .ant-form {
        width: 90%
      }
      .img {
        width: 40%;
        height: auto;
      }
      .border {
        margin-left: 15px;
        margin-right: 15px;
      }
      .button {
        width: 90%
      }
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
      .ant-form {
        width: 30%
      }
      .img {
        width: 190px;
        height: auto;
      }
      .border {
        margin-left: 50px;
        margin-right: 50px;
      }
      .button {
        width: 30%
      }
    }
`;

export default WithDirection(SignUpStyle);

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