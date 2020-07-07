import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const DashboardStyle = styled.div`
    // Small devices (landscape phones, 576px and up)
        @media (max-width: 767.98px) {

        }
    // Medium devices (tablets, 768px and up)
        @media (min-width: 768px) {
            .body {
                display: flex;
            }
            .left {
                width: 70%
            }
            .right {
                width: 30%;
                margin-left: 33px;
            }
        }
`;

export default WithDirection(DashboardStyle);
