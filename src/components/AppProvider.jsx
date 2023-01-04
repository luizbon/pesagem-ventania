import { onValue, ref } from "firebase/database";
import React, { createContext, useEffect, useState } from "react";
import { firebase } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
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

  const loadGroups = (user) => {
    const groupsRef = ref(firebase.database, `groups/${user.uid}`);
    onValue(groupsRef, groupsSnapshot => {
      const list = [];
      groupsSnapshot.forEach(group => {
        list[list.length] = {
          key: group.key,
          name: group.val().name
        }
      });
      setGroups(list);
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
