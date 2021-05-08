import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import HomeStack from "./homeStack";
import SettingsStack from "./settingsStack";
import AllPricesStack from "./allPricesStack";

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  AllPrices: {
    screen: AllPricesStack,
  },
  Settings: {
    screen: SettingsStack,
  },
});

export default createAppContainer(RootDrawerNavigator);
