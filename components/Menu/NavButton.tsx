import {
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

type MenuButtonProps = {
  title: string;
  navigation: any;
  navigateTo: string;
  icon: "start-new-game" | "ongoing-games" | "highscores" | "game-store";
};

const icons = {
  "start-new-game": require("../../assets/images/icons/start-new-game.png"),
  "ongoing-games": require("../../assets/images/icons/ongoing-games.png"),
  highscores: require("../../assets/images/icons/highscores.png"),
  "game-store": require("../../assets/images/icons/game-store.png"),
};

export default function NavButton(menuButtonProps: MenuButtonProps) {
  const { navigation, title, navigateTo, icon } = menuButtonProps;
  const iconPath = icons[icon];

  return (
    <TouchableOpacity
      style={styles.component}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    >
      {iconPath ? <Image style={styles.icon} source={iconPath} /> : false}
      <Text style={styles.text}>{title}</Text>
      {/* <Button title={title} color={"white"} onPress={() => {
                navigation.navigate(navigateTo);
            }}/> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  component: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: 60,
    backgroundColor: "#50ab64",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    color: "white",
    margin: 4,
    fontWeight: "600",
  },
});
