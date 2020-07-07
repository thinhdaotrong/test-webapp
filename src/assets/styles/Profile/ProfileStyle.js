import styled from 'styled-components';
import WithDirection from '@hoa/lib/helpers/rtl';

const ProfileStyle = styled.div`
    .avatar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .img {
        width: 72px;
        height: 72px;
    }
    .footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding-bottom: 30px;
    }
    // Small devices (landscape phones, 576px and up)
        @media (max-width: 767.98px) {
            .detail {
                margin-left: 15%;
                margin-top: 35px;
            }
        }
    // Medium devices (tablets, 768px and up)
        @media (min-width: 768px) {
            .detail {
                margin-left: 40%;
                margin-top: 35px;
            }
            .footer {
                margin-top: 35px;
                margin-right: 30%;
            }
        }
`;

export default WithDirection(ProfileStyle);
