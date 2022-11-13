import { createContext, useState } from "react";
import queryString from "query-string";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [pw, setPw] = useState(localStorage.getItem("pw"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic")
  );
  const [url, setUrl] = useState(localStorage.getItem("url"));
  const [introduction, setIntroduction] = useState(
    localStorage.getItem("introduction")
  );
  const [profileId, setProfileId] = useState(
    queryString.parse(window.location.search).id
  );
  const [listOpen, setListOpen] = useState(false);
  const [listType, setListType] = useState("");
  const [articleOpen, setArticleOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [article, setArticle] = useState();
  const [articleAuthor, setArticleAuthor] = useState();
  const updateInfo = ({ userId, pw, name, profilePic, url, introduction }) => {
    setUserId(userId);
    setPw(pw);
    setName(name);
    setProfilePic(profilePic);
    setUrl(url);
    setIntroduction(introduction);
  };

  const userInfo = () => {
    return {
      userId: userId,
      pw: pw,
      name: name,
      profilePic: profilePic,
      url: url,
      introduction: introduction,
    };
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        pw,
        name,
        profilePic,
        url,
        introduction,
        profileId,
        setProfileId,
        setUserId,
        setPw,
        setName,
        setProfilePic,
        setUrl,
        setIntroduction,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
