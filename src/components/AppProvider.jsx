import React, { createContext, useEffect, useState } from "react";
import { firebase } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Groups } from "../shared/database";
export const AppContext = createContext();

const AppProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setGroup] = useState(null);
  let groupListener = null;
  const state = {
    currentUser,
    currentGroup,
    groups,
    message
  };

  const loadGroupsCache = (key) => {
    get(key).then(val => {
      if (val) {
        setGroups(val);
      }
    });
  }

  const setCacheGroups = (key, value) => {
    set(key, value);
    if (value) {
      setGroups(value);
    }
  }

  const loadGroups = (user) => {
    if (groupListener) {
      groupListener();
    }
    const groups = new Groups(user);
    groupListener = groups.stream(snapshot => {
      const list = [];
      snapshot.forEach(group => {
        list[list.length] = {
          key: group.id,
          name: group.data().name
        }
      });
      setCacheGroups(key, list);
    });
  }

  useEffect(() => {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        setCurrentUser(user)
        loadGroups(user);
      } else {
        setCurrentUser(null)
      }
    });
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        state: state,
        destroySession: () =>
          setCurrentUser(null),
        setMessage: message => setMessage(message),
        clearMessage: () =>
          setMessage(null),
        setGroup: (group) => setGroup(group)
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppProvider;
