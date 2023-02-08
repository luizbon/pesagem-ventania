import { onDisconnect, onValue, ref } from "firebase/database";
import React, { createContext, useEffect, useState } from "react";
import { firebase } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { get, set } from "idb-keyval";
export const AppContext = createContext();

const AppProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setGroup] = useState(null);
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
    const key = `groups/${user.uid}`;
    const groupsRef = ref(firebase.database, key);
    loadGroupsCache(key);
    onValue(groupsRef, groupsSnapshot => {
      const list = [];
      groupsSnapshot.forEach(group => {
        list[list.length] = {
          key: group.key,
          name: group.val().name
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
