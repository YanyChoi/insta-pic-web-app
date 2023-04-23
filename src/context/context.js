import { createContext, useState } from "react";
import queryString from "query-string";
import { getMyUser } from "../api/user/get-user";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [fullName, setFullName] = useState();
  const [profilePic, setProfilePic] = useState();
  const [url, setUrl] = useState();
  const [bio, setBio] = useState();
  const [profileId, setProfileId] = useState(
    queryString.parse(window.location.search).id
  );
  const [location, setLocation] = useState(
    queryString.parse(window.location.search).location
  );
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState("");
  const [articleOpen, setArticleOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [article, setArticle] = useState();
  const [articleLike, setArticleLike] = useState(false);
  const [articleAuthor, setArticleAuthor] = useState();
  const updateInfo = async () => {
    const userInfo = await getMyUser();
    setUserId(userInfo.userId);
    setUserName(userInfo.userName);
    setFullName(userInfo.fullName);
    setBio(userInfo.bio);
    setUrl(userInfo.url);
    setProfilePic(userInfo.profilePictureUrl);
    return userInfo.userId;
  };

  const userInfo = () => {
    return {
      userId: userId,
      userName: userName,
      profilePic: profilePic,
      url: url,
      bio: bio,
    };
  };

  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        userId,
        userName,
        fullName,
        profilePic,
        url,
        bio,
        profileId,
        setProfileId,
        setUserId,
        setUserName,
        setFullName,
        setProfilePic,
        setUrl,
        setBio,
        updateInfo,
        userInfo,
        listOpen,
        setListOpen,
        listType,
        setListType,
        postOpen,
        setPostOpen,
        articleOpen,
        setArticleOpen,
        userList,
        setUserList,
        article,
        setArticle,
        articleAuthor,
        setArticleAuthor,
        articleLike,
        setArticleLike,
        location,
        setLocation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
