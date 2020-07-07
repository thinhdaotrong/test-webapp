import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const NotfoundStyle = styled.div`

    text-align: center;
    width: 100%;

    // Small devices (landscape phones, 576px and up)
        @media (max-width: 767.98px) {
            .img {
                width: 100%
            }
        }
    // Medium devices (tablets, 768px and up)
        @media (min-width: 768px) {
            .img {
                width: 50%
            }
        }
`;

export default WithDirection(NotfoundStyle);
