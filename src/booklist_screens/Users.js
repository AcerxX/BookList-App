import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Globals from "../Globals";
import {useNavigation} from "@react-navigation/core";
import {FlatList, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import * as ApiService from "../service/ApiService";
import {searchUser} from "../service/ApiService";

const Users = ({navigation}) => {
    const {t} = useTranslation();

    const {userData} = useData();

    const {colors, fonts, gradients, sizes} = useTheme();

    const [users, setUsers] = useState([]);

    const handleSearchChange = (searchTerm) => {
        if (searchTerm.length === 0) {
            setUsers([]);
            return;
        }

        ApiService.searchUser(searchTerm, userData.id)
            .then(({data: {_embedded: {users}}}) => {
                setUsers(users);
            });
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
            <Block color={colors.card} flex={0} padding={sizes.padding}>
                <Input search placeholder={t('common.search') + " for a user"} onChangeText={handleSearchChange}/>
            </Block>

            {users.length > 0 &&
                <FlatList
                    paddingHorizontal={sizes.padding}
                    marginTop={sizes.sm}
                    data={users}
                    renderItem={({item}) => (
                        <FriendItem nickname={item.nickname} onPress={() => navigation.navigate("UserProfile", {user: item})}/>
                    )}
                    keyExtractor={item => item.id}
                />
            }

            {users.length === 0 &&
                <Block center>
                    <Text size={16} center>Search for a reader using the search field on the top of this page.</Text>
                </Block>
            }
        </Block>
    );
};

export default Users;
