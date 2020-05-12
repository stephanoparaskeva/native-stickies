可吸顶的

# 效果

```javascript
npm install react-native-stiky-scrollview
```

```javascript
/**
 * StickyScrollView 这是
 * StickyContainer 通过这个元素包裹有需要吸顶的组件，组件内部可能还有非吸顶部分
 * StickyContent 包裹需要吸顶的部分，被包含于
 * 注意：RN0.59以下版本为了兼容android吸顶效果 StickyContent需要为StickyContainer的直接子元素
 * <StickyContainer><StickyContent></StickyContent></StickyContainer>
 * 或者
 * <StickyContainer><View><StickyContent></StickyContent></View></StickyContainer>
 * View 不能包含style属性
 * RN0.59+无此限制
 * StickyContent 可以设置吸顶后的背景颜色，holdBgColor,如果内容有背景色，则无效果
 * 详情见下面的代码
 */



import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StickyContainer, StickyContent, StickyScrollView } from 'react-native-stiky-scrollview'
const colors = ["yellow", "blue", "pink", "green", "orange", "brown", "white"]
export default class stickyDemo extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <StickyScrollView>
                <View >
                    <View>
                        <Text style={styles.topHeader}>这是头部</Text>
                    </View>
                </View>
                {
                    new Array(50).fill(2).map((item, index) => {
                        if (index % 4 === 3) {
                            return this.createSectionHeader(index)
                        } else {
                            return this.createItem(index);
                        }
                    }
                    )

                }
            </StickyScrollView>
        )

    }


    createItem(index) {
        return (<View key={index} style={{ alignItems: "center", justifyContent: "center", borderColor: "#456789", borderWidth: 0.5, backgroundColor: colors[Math.floor(Math.random() * 7)], height: 50 + 200 * Math.random(), }}>
            <Text style={{ fontSize: 30 }}>
                {index}
            </Text>
        </View>)
    }

    createSectionHeader(index) {
        return (
            <StickyContainer key={index}>
                <View>
                    <Text style={{ fontSize: 30, height: 80, backgroundColor: "blue", }}>
                        Header outer {index}
                    </Text>
                    <StickyContent key={index} holdBgColor={colors[Math.floor(Math.random() * 7)]} >
                        <View style={{ zIndex: 99, alignItems: "center", justifyContent: "center", borderColor: "#456789", borderWidth: 0.5, height: 50 + 200 * Math.random(), }}>
                            <Text style={{ fontSize: 30 }}>
                                Header {index}
                            </Text>
                        </View>
                    </StickyContent>
                    <Text style={{ fontSize: 30, height: 80, zIndex: 0, }}>
                        Bottom  outer {index}
                    </Text>
                </View>
            </StickyContainer>
        )
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topHeader: {
        height: 400,
        textAlign: "center",
    },
});
```

