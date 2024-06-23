import { Button } from "react-native";

export default function Login() {
  return (
    <>
      <Button title={"Login"} onPress={() => console.log("Logging in...")} />
    </>
  );
}
