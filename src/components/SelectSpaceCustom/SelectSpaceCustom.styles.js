import styled from 'styled-components';

export const SelectSpaceCustomStyles = styled.div`
    .select-custom {
        width: 100%;

        .ant-select-selector {
            border-radius: 10px !important;
            padding: ${props => props.isBook ? "10px 22px !important" : "12px 22px !important"};
            height: ${props => props.isBook ? "38px !important" : "45px !important"};
        }

        .ant-select-selection-item {
            text-align: right;
            font-size: ${props => props.isBook ? "13px" : "15px"};
            line-height: ${props => props.isBook ? "16px !important" : "19px !important"};
            color: #000;
            font-weight: 500;
        }
        .ant-select-arrow {
            color: #000;
        }
    }
`

export const DropdownStyles = styled.div`
    > div:nth-child(2) > div > div {
        flex-direction: row !important;
        flex-wrap: wrap;
        // justify-content: space-between;
        .ant-select-item {
            padding: 0;
            width: ${props => props.isBook ? "48%" : "45%"};
            background-color: #fff;
            margin: ${props => props.isBook ? "4px 4px" : "5px 12px"};
        }
        .ant-select-item-option-content {
            border-radius: 10px;
            box-shadow: 0 5px 50px #e4e4e4;
        }
    }
    .select-item-content {
        display: flex;
        .space-info {
            width: calc(100% - 74px);
            padding: 8px 8px;
            strong {
                font-size: 12px;
                font-weight: 600;
                line-height: 15px;
                color: #000;
                letter-spacing: 0.12px;
            }
            p {
                font-size: 8px;
                line-height: 14px;
                font-weight: 500;
                > span {
                    margin-right: 4px;
                }
                .anticon {
                    color: #000;
                }
            }
            p:nth-child(3) {
                span {
                    margin-right: 20px;
                }
            }
            b {
                color: #000;
                font-weight: 700;
            }
        }
        .space-preview {
            width: 74px;
            height: 79px;
            object-fit: cover;
        }
    }
`