import {Block, Text} from "../components";
import React from "react";
import {useTheme} from "../hooks";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export interface Book {
    title: string;
    imageUrl: string;
    author: Author;
    brand?: Brand;
    externalId: string;
    isbn?: string;
    sourceProductUrl?: string;
    informationSource?: string;
    id?: number;
    authorName: string;
}

export interface Brand {
    name: string;
    id: number;
}

export interface Author {
    name: string;
    id: number;
}

type RootStackParamList = {
    BookInfo: { bookInfo: Book };
};

type BookInfoProps = {
    navigation: StackNavigationProp<RootStackParamList, 'BookInfo'>;
    route: RouteProp<RootStackParamList, 'BookInfo'>;
};


const BookInfo = (props: BookInfoProps) => {
    const {route: {params: {bookInfo}}, navigation} = props;
    const {sizes} = useTheme();

    return (
        <Block safe marginTop={sizes.md}>
            <Block
                scroll
                paddingHorizontal={sizes.s}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: sizes.padding}}>
                <Text h1>
                    {bookInfo.title}
                </Text>
            </Block>
        </Block>
    )
}

export default BookInfo;