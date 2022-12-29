import React, { useEffect, useState } from "react";

import GroupItem from "./GroupItem";
import ConfirmModal from "./ConfirmModal";
import EditGroupModal from "./EditGroupModal";

import { GetGroups, RemoveGroup } from "../api";

const GroupList = (props) => {
    const [groups, setGroups] = useState([]);
    const [isRemove, setIsRemove] = useState(false);
    const [groupRemoving, setGroupRemoving] = useState();
    const [groupEditing, setGroupEditing] = useState();
    const [error, setError] = useState({});

    const onConfirmRemoveHandler = (groupId) => {
        setIsRemove(true);
        const groupRemoving = groups.find(group => group.id === groupId);
        setGroupRemoving({ id: groupId, name: groupRemoving.name });
    }

    const onRemoveHandler = () => {
        RemoveGroup(groupRemoving.id)
        .then(res => {
            if (res.data.type === "Success") setIsRemove(false);
        })
        .catch(err => { setError({ type: "Error", message: err }); })
    }

    const onEditHandler = (groupId) => {
        const groupEditing = groups.find(group => group.id === groupId);
        setGroupEditing({ id: groupId, name: groupEditing.name, image: groupEditing.image });
    }

    const onCloseModalHandler = () => {
        setIsRemove(false);
    }

    const onCloseEditModalHandler = () => {
        setGroupEditing(null);
    }

    useEffect(() => {
        GetGroups()
        .then(res => setGroups(res.data.data))
        .catch(err => {
            setError({ type: "Error", message: err });
        });
    }, [isRemove, props.reload, groupEditing]);

    const tableCartStyle = {
        backgroundColor: "rgba(210,130,240, 0.3) !important",
        color: "#fff"
    }

    return (
        <div className="col-detail-inr" style={{ marginTop: "15px" }}>
            <table className="table" style={tableCartStyle}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>IMAGE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        groups.length > 0 &&
                        groups.map((group, index) => (
                            <GroupItem 
                                key={group.id}
                                id={group.id}
                                order={index + 1}
                                name={group.name}
                                image={`${process.env.REACT_APP_IMAGE_BASE_URL}${group.image}`}
                                onConfirm={onConfirmRemoveHandler}
                                onEdit={onEditHandler}
                            />
                        ))
                    }
                </tbody>
            </table>
            { isRemove && <ConfirmModal groupName={groupRemoving.name} onClose={onCloseModalHandler} onRemove={onRemoveHandler} /> }
            { groupEditing && 
                <EditGroupModal id={groupEditing.id} name={groupEditing.name} image={`${process.env.REACT_APP_IMAGE_BASE_URL}${groupEditing.image}`} onClose={onCloseEditModalHandler} /> }
        </div>
    );
}

export default GroupList;