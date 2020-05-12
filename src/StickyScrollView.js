import React, { Component } from 'react';
import { Animated } from 'react-native';
import { StickyManager } from './StickyManager'
import { Context } from './Context';

export default class StickyScrollView extends Component {
    constructor(props) {
        super(props);
        this.scrollY = new Animated.Value(0);
        this.stickyManager = new StickyManager();
        this.loaded = false;
    }


    render() {
        console.log('render ScrollView')
        const { children } = this.props;
        return (
            <Context.Provider value={{
                stickyScrollY: this.scrollY,
                stickyManager: this.stickyManager,
                scrollView: this._me,
                zIndex: 999999
            }}
            >
                <Animated.ScrollView
                    style={this.props.style || { flex: 1 }}
                    ref={e => {
                        this._me = e;
                        if (!this.loaded) {
                            this.forceUpdate();
                            this.loaded = true;
                        }
                    }}
                    onScroll={
                        Animated.event(
                            [{
                                nativeEvent: { contentOffset: { y: this.scrollY } }
                            }],
                            {
                                useNativeDriver: true,
                                listener: this.props.onScroll,
                            }
                        )
                    }
                    scrollEventThrottle={16}
                >
                    {
                        this.loaded && children
                    }
                </Animated.ScrollView>
            </Context.Provider>
        );
    }
}
