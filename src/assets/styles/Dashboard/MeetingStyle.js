import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const MeetingStyle = styled.div`
    .button {
        display:flex;
        width: 120px;
        height: 30px;
        background-color: #fff;
        border-radius: 15px;
        border: 1px solid #707070;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .isoIconWrapper {
        position: relative;
        line-height: normal;
        margin-left: -20px;
        span {
            font-size: 12px;
            color: #fff;
            background-color: #FCAF29;
            width: 20px;
            height: 20px;
            display: -webkit-inline-flex;
            display: -ms-inline-flex;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            line-height: 20px;
            position: absolute;
            top: -8px;
            left: ${props =>
                props['data-rtl'] === 'rtl' ? 'inherit' : '10px'};
            right: ${props =>
                props['data-rtl'] === 'rtl' ? '10px' : 'inherit'};
            border-radius: 50%;
        }
      }

    // Small devices (landscape phones, 576px and up)
        @media (max-width: 767.98px) {
           
        }
    // Medium devices (tablets, 768px and up)
        @media (min-width: 768px) {
            // width: 100%
        }
`;

export default WithDirection(MeetingStyle);
