import { Button, Grid, Modal, Paper, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { postArticle } from "../../api/article/post-article";
import { getFollowing } from "../../api/follow/get-follow";
import { postMedia } from "../../api/media/post-media";
import { UserContext } from "../../context/context";

const PostModal = () => {
  const { userId, postOpen, setPostOpen } = useContext(UserContext);
  const [step, setStep] = useState(0);
  const [mediaList, setMediaList] = useState([]);
  const [canMove, setCanMove] = useState(false);
  const [mediaMentions, setMediaMentions] = useState([]);
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const Steps = [
    <FileSubmit
      mediaList={mediaList}
      setMediaList={setMediaList}
      setCanMove={setCanMove}
    />,
    <MentionUsers
      mediaList={mediaList}
      mediaMentions={mediaMentions}
      setMediaMentions={setMediaMentions}
    />,
    <WriteDetails
      location={location}
      setLocation={setLocation}
      text={text}
      setText={setText}
    />,
  ];

  const initialize = () => {
    setMediaList([]);
    setCanMove(false);
    setMediaMentions([]);
    setLocation("");
    setText("");
  };

  const onSubmit = async () => {
    const postedArticle = await postArticle(userId, {
      location: location,
      text: text,
    });
    mediaList.forEach(async (media, index) => {
      await postMedia(media, mediaMentions[index], postedArticle.articleId);
    });
    initialize();
  };

  return (
    <Modal
      open={postOpen}
      onClose={() => {
        setPostOpen(false);
        setStep(0);
        initialize();
      }}
    >
      <Paper
        style={{
          width: "700px",
          height: "700px",
          position: "absolute",
          top: "calc((100vh - 700px) / 2)",
          left: "calc((100vw - 700px) / 2)",
        }}
      >
        <Grid container direction="column">
          <Grid container direction="row" justifyContent="space-between">
            <Button
              disabled={step === 0}
              variant="text"
              onClick={() => {
                setStep(step - 1);
              }}
            >
              이전
            </Button>
            <Button
              disabled={!canMove}
              variant="text"
              onClick={() => {
                if (step === 2) {
                  onSubmit();
                  setStep(0);
                  setPostOpen(false);
                } else {
                  setStep(step + 1);
                }
              }}
            >
              {step === 2 ? "제출" : "다음"}
            </Button>
          </Grid>
          {Steps[step]}
        </Grid>
      </Paper>
    </Modal>
  );
};

const FileSubmit = ({ mediaList, setMediaList, setCanMove }) => {
  return (
    <div
      style={{
        margin: "0px auto",
        width: "700px",
        height: "700px",
        textAlign: "center",
      }}
    >
      <div style={{ height: "50px" }}></div>
      <p>사진과 동영상을 제출해 주세요</p>
      <input
        type="file"
        accept="image/*, video/*"
        multiple
        onChange={(e) => {
          const list = [];
          for (let i = 0; i < e.target.files.length; i++) {
            list.push(e.target.files[i]);
          }
          setMediaList(list);
          if (e.target.files[0]) {
            setCanMove(true);
          } else {
            setCanMove(false);
          }
        }}
      />
      <div style={{ height: "50px" }}></div>
      <Grid container justifyContent="center" style={{ margin: "10px" }}>
        {mediaList.map((media) => {
          const url = URL.createObjectURL(media);
          return (
            <img
              src={url}
              alt="imagemedia"
              key={url}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
                margin: "5px",
                backgroundColor: "black",
              }}
            />
          );
        })}
      </Grid>
    </div>
  );
};

const MentionUsers = ({ mediaList, mediaMentions, setMediaMentions }) => {
  const { userId } = useContext(UserContext);
  const [search, setSearch] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const list = [];
    const searchInit = [];
    for (let i = 0; i < mediaList.length; i++) {
      list.push([]);
      searchInit.push(false);
    }
    setMediaMentions(list);
    setSearch(searchInit);
  }, []);
  return (
    <div>
      {mediaList.map((media, mediaIndex) => {
        const url = URL.createObjectURL(media);
        return (
          <Grid container direction="row">
            <img
              src={url}
              alt="media"
              key={url}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
                margin: "5px",
                backgroundColor: "black",
              }}
              onClick={async () => {
                setSearch([
                  ...search.slice(0, mediaIndex),
                  !search[mediaIndex],
                  ...search.slice(mediaIndex + 1),
                ]);
                console.log([
                  ...search.slice(0, mediaIndex),
                  !search[mediaIndex],
                  ...search.slice(mediaIndex + 1),
                ]);
                const followList = await getFollowing(userId);
                setFollowers(followList.followList);
              }}
            />
            {!!search[mediaIndex] && (
              <div>
                {followers.map((follower, index) => {
                  return (
                    <Grid
                      container
                      direction="row"
                      justifyContent="start"
                      style={{
                        width: "200px",
                        height: "30px",
                        padding: "3px",
                        overflowY: "scroll",
                      }}
                    >
                      <Button
                        onClick={() => {
                          const mentions = mediaMentions[mediaIndex];
                          if (mentions.includes(follower.followId)) {
                            mentions.splice(
                              mentions.indexOf(follower.followId),
                              1
                            );
                          } else {
                            mentions.push(follower.followId);
                          }
                          console.log(mentions);
                          setMediaMentions([
                            ...mediaMentions.slice(0, mediaIndex),
                            mentions,
                            ...mediaMentions.slice(mediaIndex + 1),
                          ]);
                        }}
                      >
                        <img
                          src={follower.profilePic}
                          key={index}
                          alt="follower"
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            marginRight: "4px",
                          }}
                        />
                        <p style={{ margin: "0px", color: "black" }}>
                          {follower.followId}
                        </p>
                        {mediaMentions[mediaIndex].includes(
                          follower.followId
                        ) && <p style={{ margin: "0px" }}>✅</p>}
                      </Button>
                    </Grid>
                  );
                })}
              </div>
            )}
          </Grid>
        );
      })}
    </div>
  );
};

const WriteDetails = ({ text, setText, location, setLocation }) => {
  return (
    <div style={{}}>
      <TextField
        label="장소"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        style={{ width: "300px", margin: "10px" }}
      />
      <TextField
        label="내용"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        multiline
        rows={5}
        style={{ width: "500px", margin: "10px" }}
      />
    </div>
  );
};

export default PostModal;
