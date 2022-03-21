import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  Menu,
  MenuTrigger,
  MenuOption,
  MenuOptions,
  renderers,
} from "react-native-popup-menu";
import { FontAwesome } from "@expo/vector-icons";

const CustomMenu = (props) => {
  const customStyles = {
    backgroundColor: "white",
  };
  const { computePosition } = renderers.ContextMenu;
  const { style, children, layouts, ...other } = props;
  const position = computePosition(layouts);
  return (
    <View {...other} style={[customStyles, style, position]}>
      {children}
    </View>
  );
};

const earningsByFilter = {
  day: 5200,
  week: 10500,
  month: 25200,
};

const EarningBox = ({ selectedFilter, filters, setFilter }) => {
  const selected = filters.find(({ value }) => value === selectedFilter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Total Earning</Text>
        <Menu style={styles.menuDrawer} renderer={CustomMenu}>
          <MenuTrigger>
            <View style={styles.triggerBtn}>
              <Text style={styles.triggerText}>{selected?.label}</Text>
              <FontAwesome name="chevron-down" size={15} color="black" />
            </View>
          </MenuTrigger>
          <MenuOptions
            customStyles={{ optionsContainer: { width: wp("27%") } }}
          >
            {filters.map((filter) => (
              <MenuOption
                key={filter.value}
                onSelect={() => setFilter(filter.value)}
                style={{
                  backgroundColor:
                    selectedFilter === filter.value ? "#E0E0E0" : "white",
                }}
              >
                <Text style={styles.menuOption}>{filter.label}</Text>
              </MenuOption>
            ))}
          </MenuOptions>
        </Menu>
      </View>
      <Text style={styles.earningData}>
        {new Intl.NumberFormat("en-NG", {
          currency: "NGN",
          style: "currency",
        }).format(earningsByFilter[selectedFilter])}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp("17%"),
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: wp("5.5%"),
    paddingHorizontal: wp("4.5%"),
  },
  header: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerText: {
    color: "white",
    fontSize: hp("2.2%"),
  },
  triggerBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  triggerText: {
    color: "black",
    fontSize: hp("1.9%"),
  },
  menuDrawer: {
    backgroundColor: "#E0E0E0",
    paddingVertical: wp("1%"),
    paddingHorizontal: wp("1.7%"),
    borderRadius: 4,
    width: wp("29.7%"),
  },
  menuOption: {
    color: "black",
    fontSize: hp("2%"),
  },
  earningData: {
    color: "#B3B3B3",
    fontSize: hp("4%"),
    fontWeight: "700",
  },
});

export default EarningBox;
