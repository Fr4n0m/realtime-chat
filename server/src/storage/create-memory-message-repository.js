export const createMemoryMessageRepository = () => {
  let messageId = 0;
  const messages = [];

  const save = async ({ content, user }) => {
    messageId += 1;
    const row = {
      id: messageId,
      content,
      user,
    };
    messages.push(row);
    return row;
  };

  const list = async () => [...messages];

  return {
    save,
    list,
  };
};
