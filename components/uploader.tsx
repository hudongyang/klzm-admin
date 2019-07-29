import axios from "../libs/axios";

type Props = {
    onUploadCallback: Function
    value?: string
}

export const Uploader: React.FunctionComponent<Props> = ({onUploadCallback, value='上传图片'}) => {

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
        const files = e.target.files

        if (files.length <= 0) {
            return
        }

        const formData = new FormData()
        formData.append('brand_pic', files[0])

        axios.post('/admin/upload/brandPic', formData)
            .then(resp => onUploadCallback(resp.data.data.fileUrl))
    }

    return (
        <div className="container">
            <span>{value}</span>
            <style jsx>{`
                .container {
                    overflow: hidden;
                    position: relative;
                    display: inline-block;
                    background: #20A0FF;
                    color: aliceblue;
                    font-size: 14px;
                    border-radius: .2em;
                }

                .container span {
                    display: block;
                    padding: .2em .5em;                    
                }

                .container input {
                    opacity: 0;
                    width: inherit;
                    height: inherit;
                    position: absolute;
                    left: 0; right: 0; top: 0; bottom: 0;
                }
            `}</style>
            <input onChange={onChangeHandler} accept="image/*" type="file" />
        </div>
    )
}