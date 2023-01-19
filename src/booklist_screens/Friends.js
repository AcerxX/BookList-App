import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Globals from "../Globals";
import {useNavigation} from "@react-navigation/core";
import {FlatList, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import * as ApiService from "../service/ApiService";

const Friends = ({navigation}) => {
    const {t} = useTranslation();

    const {userData} = useData();

    const {colors, fonts, gradients, sizes} = useTheme();

    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [tab, setTab] = useState(0);

    const setTabNumber = (tabNumber) => {
        setTab(tabNumber);
    }

    const updateFriendList = () => {
        ApiService.getFriendsList(userData.id)
            .then(({data: {_embedded: {users}}}) => {
                setFriends(users);
            });
    }

    const updateFriendsRequests = () => {
        ApiService.getFriendRequestsList(userData.id)
            .then(({data: {_embedded: {users}}}) => {
                setFriendRequests(users);
            });
    }

    useEffect(() => {
        updateFriendList();
        updateFriendsRequests();
    }, [navigation]);

    const handleSearchChange = (searchTerm) => {
        if (searchTerm.length === 0) {
            updateFriendList();
            return;
        }

        setFriends(
            friends.filter((user) => user.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    }

    const FriendItem = ({nickname, onPress}) => (
        <TouchableOpacity onPress={onPress}>
            <Block flex row justify="space-between" card marginBottom={sizes.sm} padding={sizes.padding}>
                <Text size={16}>{nickname}</Text>
                <AntDesign name="right" size={16} color={colors.dark}/>
            </Block>
        </TouchableOpacity>
    );

    return (
        <Block>
            <Block
                row
                flex={0}
                align="center"
                justify="center"
                color={colors.card}
                paddingVertical={sizes.sm}>
                <Button onPress={() => setTabNumber(0)}>
                    <Block row align="center">
                        <Block
                            flex={0}
                            radius={6}
                            align="center"
                            justify="center"
                            marginRight={sizes.s}
                            width={sizes.socialIconSize}
                            height={sizes.socialIconSize}
                        >
                            <AntDesign name="heart" size={24} color={colors[tab === 0 ? 'primary' : 'secondary']}/>
                        </Block>
                        <Text p font={fonts?.[tab === 0 ? 'bold' : 'normal']}>
                            {t('friends.tab_friends_title')}
                        </Text>
                    </Block>
                </Button>
                <Block
                    gray
                    flex={0}
                    width={1}
                    marginHorizontal={sizes.sm}
                    height={sizes.socialIconSize}
                />
                <Button onPress={() => setTabNumber(1)}>
                    <Block row align="center">
                        <Block
                            flex={0}
                            radius={6}
                            align="center"
                            justify="center"
                            marginRight={sizes.s}
                            width={sizes.socialIconSize}
                            height={sizes.socialIconSize}
                        >
                            <AntDesign name="adduser" size={24} color={colors[tab === 1 ? 'primary' : 'secondary']}/>
                        </Block>
                        <Text p font={fonts?.[tab === 1 ? 'bold' : 'normal']}>
                            {t('friends.tab_friend_requests')} {friendRequests.length > 0 ? `(${friendRequests.length})` : ""}
                        </Text>
                    </Block>
                </Button>
            </Block>


            {tab === 0 && friends.length > 0 &&
                <FlatList
                    paddingHorizontal={sizes.padding}
                    marginTop={sizes.sm}
                    data={friends}
                    renderItem={({item}) => (
                        <FriendItem nickname={item.nickname} onPress={() => navigation.navigate("UserProfile", {user: item})}/>
                    )}
                    keyExtractor={item => item.id}
                />
            }

            {tab === 0 && friends.length === 0 &&
                <Block center paddingHorizontal={sizes.sm}>
                    <Text size={16} center>{t("friends.no_friends")}</Text>
                </Block>
            }


            {tab === 1 && friendRequests.length > 0 &&
                <FlatList
                    paddingHorizontal={sizes.padding}
                    marginTop={sizes.sm}
                    data={friendRequests}
                    renderItem={({item}) => (
                        <FriendItem nickname={item.nickname} onPress={() => navigation.navigate("UserProfile", {user: item})}/>
                    )}
                    keyExtractor={item => item.id}
                />
            }

            {tab === 1 && friendRequests.length === 0 &&
                <Block center paddingHorizontal={sizes.sm}>
                    <Text size={16} center>{t("friends.no_friend_request")}</Text>
                </Block>
            }

        </Block>
    );
};

export default Friends;
