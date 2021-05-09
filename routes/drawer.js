import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import LoginStack from "./loginStack";
import HomeStack from "./homeStack";
import SettingsStack from "./settingsStack";
import AllPricesStack from "./allPricesStack";

const RootDrawerNavigator = createDrawerNavigator({
  Login: {
    screen: LoginStack,
  },
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
