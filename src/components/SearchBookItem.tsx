import {TouchableOpacity} from "react-native";
import {Block, Image, Text} from "./index";
import {AntDesign} from "@expo/vector-icons";
import React from "react";
import {useTheme} from "../hooks";

interface ISearchBookItemProps {
    title: string;
    authorName: string;
    imageUrl: string;
    brand?: string;
    id: number;
    onPress: () => void
}

const SearchBookItem = (props: ISearchBookItemProps) => {
    const {title, authorName, imageUrl, brand, onPress} = props;
    const {sizes, colors} = useTheme();

    return (
        <TouchableOpacity onPress={onPress}>
            <Block flex={1} row justify="space-between" card marginBottom={sizes.s}>
                <Block flex={0.22}>
                    <Image
                        key={`book-2`}
                        resizeMode="cover"
                        source={{"uri": imageUrl}}
                        style={{
                            width: 50,
                            height: 50 * 1.6,
                        }}
                    />
                </Block>
                <Block flex={0.8} center>
                    <Text size={16} bold>{`${title}`}</Text>
                    <Text size={14}>{authorName}</Text>
                    {brand && <Text size={14} marginTop={15}>From {brand}</Text>}
                </Block>

                <Block flex={0.07} center>
                    <AntDesign name="right" size={16} color={colors.dark}/>
                </Block>
            </Block>
        </TouchableOpacity>
    );
};

export default React.memo(SearchBookItem);