import React, {useEffect, useMemo, useState} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import * as ApiService from "../service/ApiService";

const isAndroid = Platform.OS === 'android';

const UserProfile = ({route: {params: {user: {id}}}}) => {
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
    const [user, setUser] = useState({});

    const refreshFriendshipStatus = () => {
        ApiService.getFriendship(userData.id, id)
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
        ApiService.getUserById(id)
            .then(({data}) => {
                if (data) {
                    setUser(data);
                }
            })
            .catch((err) => {
                console.error(err);

                navigation.goBack();
            })

        refreshFriendshipStatus();

    }, [navigation]);

    const sendFriendRequest = () => {
        ApiService.sendFriendRequest(userData.id, id)
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

    const bookList = useMemo(() => {
        if (user.bookshelfList) {
            return user.bookshelfList?.flatMap((bookshelf) => {
                return bookshelf.books;
            });
        } else {
            return [];
        }
    }, [user]);

    const authors = useMemo(() => {
        return [...new Set(bookList.map((book) => book.author.name))]
    }, [bookList]);

    const favAuthor = useMemo(() => {
        let tempAuthors = {};

        if (bookList.length > 0) {
            bookList.forEach((book) => {
                if (!tempAuthors.hasOwnProperty(book.author.name)) {
                    tempAuthors[book.author.name] = 0;
                }

                tempAuthors[book.author.name] = tempAuthors[book.author.name] + 1;
            });

            const sortedEntries = Object.entries(tempAuthors).sort((a, b) => b[1] - a[1]);
            console.log(sortedEntries);
            return sortedEntries[0][0];
        } else {
            return "N/A";
        }
    }, [bookList]);

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
                                <Text h5>{bookList.length}</Text>
                                <Text>{t('profile.books')}</Text>
                            </Block>
                            <Block align="center">
                                <Text h5>{favAuthor}</Text>
                                <Text>{t('profile.fav_author')}</Text>
                            </Block>
                            <Block align="center">
                                <Text h5>{(authors.length)}</Text>
                                <Text>{t('profile.authors')}</Text>
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
                                {t('profile.books_subtitle')}
                            </Text>
                            <Button onPress={() => alert("Comming soon in an app near you!")}>
                                <Text p primary semibold>
                                    {t('common.viewall')}
                                </Text>
                            </Button>
                        </Block>

                        {bookList.length > 0 &&
                            <Block row justify="space-between" wrap="wrap">
                                <Block>
                                    {bookList.map((book, index) => {
                                        if (index % 2 === 0) {
                                            return <Image
                                                key={`book-${book.id}`}
                                                resizeMode="cover"
                                                source={{"uri": book.imageUrl}}
                                                style={{
                                                    width: IMAGE_VERTICAL_SIZE,
                                                    height: IMAGE_VERTICAL_SIZE * 1.6,
                                                    marginBottom: sizes.m
                                                }}
                                            />
                                        }
                                    })}
                                </Block>
                                <Block marginLeft={sizes.m}>
                                    {bookList.map((book, index) => {
                                        if (index % 2 === 1) {
                                            return <Image
                                                key={`book-${book.id}`}
                                                resizeMode="cover"
                                                source={{"uri": book.imageUrl}}
                                                style={{
                                                    width: IMAGE_VERTICAL_SIZE,
                                                    height: IMAGE_VERTICAL_SIZE * 1.6,
                                                    marginBottom: sizes.m
                                                }}
                                            />
                                        }
                                    })}
                                </Block>
                            </Block>
                        }

                        {bookList.length === 0 &&
                            <Block center paddingHorizontal={sizes.sm}>
                                <Text size={16} center>{t("profile.no_books_text")}</Text>
                            </Block>
                        }
                    </Block>
                </Block>
            </Block>
        </Block>
    );
};

export default UserProfile;
