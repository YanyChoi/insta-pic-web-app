import { Grid, Modal, Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";
const type = {
  likes: "좋아요",
  followers: "팔로워",
  following: "팔로우",
};
const UserListModal = () => {
  const { listOpen, setListOpen, userList, listType, setProfileId } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {}, [userList]);
  return (
    <Modal
      open={listOpen}
      onClose={() => {
        setListOpen(false);
      }}
    >
      <Paper
        style={{
          width: "400px",
          height: "400px",
          position: "absolute",
          top: "calc((100vh - 400px) / 2)",
          left: "calc((100vw - 400px) / 2)",
        }}
      >
        <Grid container direction="column">
          <div
            style={{
              height: "50px",
              textAlign: "center",
              borderBottom: "1px solid lightgray",
            }}
          >
            <p>
              <b>{type[listType]}</b>
            </p>
          </div>
          <Grid
            container
            direction="column"
            style={{
              overflow: "scroll",
            }}
          >
            {userList?.map((user) => (
              <Grid
                container
                direction="row"
                style={{ width: "400px", height: "60px", padding: "8px 16px" }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="start"
                  onClick={() => {
                    setProfileId(
                      listType === "likes"
                        ? user.userId
                        : listType === "following"
                        ? user.followId
                        : user.userId
                    );
                    navigate(
                      `/profile?id=${
                        listType === "likes"
                          ? user.userId
                          : listType === "following"
                          ? user.followId
                          : user.userId
                      }`
                    );
                  }}
                  style={{
                    height: "50px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt="profile"
                    src={user.profilePic}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    <b>
                      {listType === "likes"
                        ? user.userId
                        : listType === "following"
                        ? user.followId
                        : user.userId}
                    </b>
                  </p>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default UserListModal;
