import React from 'react'
import { PreviewFileStyles } from './PreviewFile.styles'
import { Button } from 'antd'
import {
    PaperClipOutlined,
    CloseCircleFilled
} from '@ant-design/icons';

function PreviewFile({ files, removeFile }) {
    if (!files.length) {
        return null
    }
    return (
        <PreviewFileStyles>
            <div className='preview-file'>
                {files.map((file, key) =>
                    <Button icon={<PaperClipOutlined />} shape="round" key={key} onClick={() => removeFile(file)} >
                        {file.name}
                        <CloseCircleFilled />
                    </Button>
                )}
            </div>
        </PreviewFileStyles>
    )
}

export default PreviewFile
