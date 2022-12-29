import React, { useState } from "react";

import classes from './GroupForm.module.css';

import { CreateGroup } from "../api";
import { GetS3SignedRequest, UploadToS3 } from "../../../helpers";

const NewGroupModal = (props) => {
    const [groupName, setGroupName] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [signedUrl, setSignedUrl] = useState("");
    const [error, setError] = useState({});

    const onCloseModalHandler = () => {
        props.onClose();
        setPreviewImage("");
    }

    const onImageSelectedHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
            
            // show preview image
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setPreviewImage(reader.result);
            }
            
            // get s3 url to upload
            GetS3SignedRequest(e.target.files[0])
            .then(res => setSignedUrl(res.data.data))
            .catch(err => {
                setError({ type: "Error", message: err });
            });
        }
    }

    const onNameChangeHandler = (e) => {
        setGroupName(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // upload image to S3
        UploadToS3(selectedImage, signedUrl)
        .catch(err => {
            setError({ type: "Error", message: err.message });
        });

        // create group in DB
        CreateGroup({ name: groupName, image: selectedImage.name })
        .then(res => props.onClose())
        .catch(err => {
            setError({ type: "Error", message: err.response.data.message });
        });
    }

    return (
        <div className={`${classes["form-modal"]} ${classes["form-modal-open"]}`}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <h4 className="heading-h4">New Group</h4>
                    <i className="ri-close-line heading-h4" style={{ cursor: "pointer" }} onClick={onCloseModalHandler}></i>
                </div>
                <form className={classes["form-main"]} method="post" onSubmit={onSubmitHandler}>
                    <div className={classes["input-otr"]}>
                        <input className="input heading-SB" type="text" placeholder="Group Name" value={groupName} onChange={onNameChangeHandler} required />
                    </div>
                    <div className={classes["input-otr"]}>
                        <div className={classes["upload-area"]}>
                            <div className={classes["drop-zoon"]}>
                                {!previewImage && <p className={`${classes.desc} heading-SB`}>PNG, GIF, WEBP, JPG</p>}
                                {!previewImage && <p className="btn-primary-1 heading-SB" style={{ width: "fit-content", margin: "0 auto", cursor: "pointer" }}>browse</p>}
                                <div className="img-main">
                                    {previewImage && <img src={previewImage} alt="group" className={classes["preview-image"]} draggable="true" />}
                                </div>
                                <input type="file" className={classes["file-input"]} accept="image/*" onChange={onImageSelectedHandler} required />
                            </div>
                        </div>
                    </div>
                    <div className={classes.action}>
                        <button className="btn-primary-2 heading-SB" onClick={onCloseModalHandler}> Cancel </button>
                        <button className="btn-primary-1 heading-SB" type="submit"> Submit </button>
                    </div>
                </form>
                <p className="text heading-S" style={{ color: "orange", padding: "20px 0 0 0", textAlign: "center" }}>{error && error.message}</p>
            </div>
        </div>
    );
}

export default NewGroupModal;