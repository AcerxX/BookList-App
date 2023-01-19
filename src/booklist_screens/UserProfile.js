import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import * as ApiService from "../service/ApiService";

const isAndroid = Platform.OS === 'android';

const UserProfile = ({route: {params: {user}}}) => {
    const {t} = useTranslation();
    const navigation = useNavigation();
    const {assets, colors, sizes} = useTheme();

    const {userData} = useData();

    const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
    const IMAGE_VERTICAL_SIZE =
        (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
    const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
    const IMAGE_VERTICAL_MARGIN =
        (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;


    const [friendRequestButtonText, setFriendRequestButtonText] = useState(t('profile.send_friend_request'));
    const [friendRequestButtonDisabled, setFriendRequestButtonDisabled] = useState(false);
    const [relationship, setRelationship] = useState({});

    const refreshFriendshipStatus = () => {
        ApiService.getFriendship(userData.id, user.id)
            .then(({data, status}) => {
                if (status === 404) {
                    setFriendRequestButtonText(t('profile.send_friend_request'));
                } else {
                    setRelationship(data);
                    setFriendRequestButtonDisabled(true);

                    if (data.status === 2) {
                        setFriendRequestButtonText(t('profile.accepted_friend_request'));
                    } else {
                        if (data.userId === userData.id) {
                            // Logged user is the user who initiated the friend request
                            setFriendRequestButtonDisabled(true);
                            setFriendRequestButtonText(t('profile.pending_friend_request'));
                        } else {
                            // Logged user received this friend request
                            setFriendRequestButtonText(t('profile.accept_friend_request'));
                            setFriendRequestButtonDisabled(false);
                        }
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        // TODO GET STATISTICS

        refreshFriendshipStatus();

    }, [navigation]);

    const sendFriendRequest = () => {
        ApiService.sendFriendRequest(userData.id, user.id)
            .then(({data: {error, errorMessage}}) => {
                if (error) {
                    alert(errorMessage);
                } else {
                    refreshFriendshipStatus();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const acceptFriendRequest = () => {
        ApiService.acceptFriendRequest(relationship.id)
            .then((_) => {
               refreshFriendshipStatus();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const handleFriendRequestButton = () => {
        if (relationship.userId === userData.id) {
            // Logged user is the user who initiated the friend request
            sendFriendRequest();
        } else {
            // Logged user received this friend request
            acceptFriendRequest();
        }
    }

    return (
        <Block safe marginTop={sizes.md}>
            <Block
                scroll
                paddingHorizontal={sizes.s}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: sizes.padding}}>
                <Block flex={0}>
                    <Image
                        background
                        resizeMode="cover"
                        padding={sizes.sm}
                        paddingBottom={sizes.l}
                        radius={sizes.cardRadius}
                        source={assets.background}>
                        <Button
                            row
                            flex={0}
                            justify="flex-start"
                            onPress={() => navigation.goBack()}>
                            <Image
                                radius={0}
                                width={10}
                                height={18}
                                color={colors.white}
                                source={assets.arrow}
                                transform={[{rotate: '180deg'}]}
                            />
                            <Text p white marginLeft={sizes.s}>
                                {t('profile.title')}
                            </Text>
                        </Button>
                        <Block flex={0} align="center">
                            <Image
                                width={64}
                                height={64}
                                marginBottom={sizes.sm}
                                source={{uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'}}
                            />
                            <Text h5 center white>
                                {user?.nickname}
                            </Text>
                            <Text p center white>
                                🏆 Elite Reader 🏆
                            </Text>
                            <Block row marginVertical={sizes.m}>
                                <Button
                                    white
                                    outlined
                                    shadow={false}
                                    radius={sizes.m}
                                    disabled={friendRequestButtonDisabled}
                                    onPress={handleFriendRequestButton}>
                                    <Block
                                        justify="center"
                                        radius={sizes.m}
                                        paddingHorizontal={sizes.m}
                                        color="rgba(255,255,255,0.2)">
                                        <Text white bold transform="uppercase">
                                            {friendRequestButtonText}
                                        </Text>
                                    </Block>
                                </Button>
                            </Block>
                        </Block>
                    </Image>

                    {/* profile: stats */}
                    <Block
                        flex={0}
                        radius={sizes.sm}
                        shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                        marginTop={-sizes.l}
                        marginHorizontal="8%"
                        color="rgba(255,255,255,0.2)">
                        <Block
                            row
                            blur
                            flex={0}
                            intensity={100}
                            radius={sizes.sm}
                            overflow="hidden"
                            tint={colors.blurTint}
                            justify="space-evenly"
                            paddingVertical={sizes.sm}
                            renderToHardwareTextureAndroid>
                            <Block align="center">
                                <Text h5>{user?.stats?.posts || 0}</Text>
                                <Text>{t('profile.posts')}</Text>
                            </Block>
                            <Block align="center">
                                <Text h5>{(user?.stats?.followers || 0) / 1000}k</Text>
                                <Text>{t('profile.followers')}</Text>
                            </Block>
                            <Block align="center">
                                <Text h5>{(user?.stats?.following || 0) / 1000}k</Text>
                                <Text>{t('profile.following')}</Text>
                            </Block>
                        </Block>
                    </Block>

                    {/* profile: about me */}
                    {/*<Block paddingHorizontal={sizes.sm}>*/}
                    {/*  <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>*/}
                    {/*    {t('profile.aboutMe')}*/}
                    {/*  </Text>*/}
                    {/*  <Text p lineHeight={26}>*/}
                    {/*    {user?.about}*/}
                    {/*  </Text>*/}
                    {/*</Block>*/}

                    {/* profile: photo album */}
                    <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
                        <Block row align="center" justify="space-between">
                            <Text h5 semibold>
                                {t('common.album')}
                            </Text>
                            <Button>
                                <Text p primary semibold>
                                    {t('common.viewall')}
                                </Text>
                            </Button>
                        </Block>
                        <Block row justify="space-between" wrap="wrap">
                            <Image
                                resizeMode="cover"
                                source={assets?.photo1}
                                style={{
                                    width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                                    height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                                }}
                            />
                            <Block marginLeft={sizes.m}>
                                <Image
                                    resizeMode="cover"
                                    source={assets?.photo2}
                                    marginBottom={IMAGE_VERTICAL_MARGIN}
                                    style={{
                                        height: IMAGE_VERTICAL_SIZE,
                                        width: IMAGE_VERTICAL_SIZE,
                                    }}
                                />
                                <Image
                                    resizeMode="cover"
                                    source={assets?.photo3}
                                    style={{
                                        height: IMAGE_VERTICAL_SIZE,
                                        width: IMAGE_VERTICAL_SIZE,
                                    }}
                                />
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
};

export default UserProfile;
