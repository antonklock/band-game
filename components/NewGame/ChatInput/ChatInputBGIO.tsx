import { Button } from "react-native";

// In your React component:
const ChatInputBGIO = ({ moves }: { moves: any }) => {
  const handleSubmit = () => {
    // This will trigger the playBand move we defined
    moves.playBand("Beatles");
  };

  return <Button onPress={handleSubmit} title="Play Band" />;
};

export default ChatInputBGIO;
