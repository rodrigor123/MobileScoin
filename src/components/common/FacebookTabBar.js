import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors'
const tabTitle = ['Dashboard', 'Transactions', 'Transfer', 'More']
const FacebookTabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i))
      icon.setNativeProps({
        style: {
          //color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return(
          <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
            <Icon
              name={tab}
              size={30}
              color={this.props.activeTab === i ? colors.darkGold : colors.blue}
              ref={(icon) => { this.tabIcons[i] = icon; }}
            />
            <Text style={this.props.activeTab === i?styles.activeTabTitle:styles.tabTitle}>{tabTitle[i]}</Text>
          </TouchableOpacity>
        )
      })}
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tabTitle: {
    fontSize: 12,
    color: colors.blue
  },
  activeTabTitle: {
    color: colors.darkGold,
    fontSize: 12
  }
});

export default FacebookTabBar;
