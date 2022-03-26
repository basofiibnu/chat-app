import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "./";
import { CloseCreateChannel } from "../assets";
import { motion } from "framer-motion";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const handleChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name (no spaces)"
      />
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-channel__container">
      <motion.div
        className="create-channel__container"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          type: "easeInOut",
          duration: 0.5,
        }}
      >
        <div className="create-channel__header">
          <p>
            {createType === "team"
              ? "Create a New Channel"
              : "Send a Direct Message"}
          </p>
          <CloseCreateChannel setIsCreating={setIsCreating} />
        </div>
        {createType === "team" && (
          <ChannelNameInput
            channelName={channelName}
            setChannelName={setChannelName}
          />
        )}
        <UserList setSelectedUsers={setSelectedUsers} />
        <div className="create-channel__button-wrapper" onClick={createChannel}>
          <p>
            {createType === "team" ? "Create Channel" : "Create Message Group"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateChannel;
