import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const EditProfileStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 30px;
        padding-bottom: 30px;
    }
    // Small devices (landscape phones, 576px and up)
        @media (max-width: 767.98px) {
            .content {
                width: 90%
            }
        }
    // Medium devices (tablets, 768px and up)
        @media (min-width: 768px) {
            .content {
                width: 50%
            }
        }
`;

export default WithDirection(EditProfileStyle);
