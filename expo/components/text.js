import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme';

function LText({ children, style }) {
    const { theme } = useTheme();

    return <Text style={ {
        color: theme.mainTextColor,
        fontFamily: theme.textFontFamily,
        fontSize: theme.textFontSize,
        ...style
    } } >{ children }</Text>
}

LText.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object
};

function H1({ children, style }) {
    const { theme } = useTheme();

    return <LText style={ {
        fontFamily: theme.headingFontFamily,
        fontSize: theme.h1FontSize,
        marginBottom: theme.baseMargin1,
        ...style
    } } >{ children }</LText>
}
H1.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object
};

function H2({ children, style }) {
    const { theme } = useTheme();

    return <H1 style={ {
        fontSize: theme.h2FontSize, ...style } } >{ children }</H1>
}
H2.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object
};

function H3({ children, style }) {
    const { theme } = useTheme();

    return <H1 style={ {
        fontSize: theme.h3FontSize, ...style } } >{ children }</H1>
}
H3.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object
};

function P({ children, style }) {
    const { theme } = useTheme();

    return <LText style={ {
        marginBottom: theme.baseMargin1, ...style } } >{ children }</LText>
}
P.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object
};


function Span({ children, style }) {
    return <LText style={ { ...style } } >{ children }</LText>
}
Span.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object
};

function Link({ children, style, onPress }) {
    return <TouchableOpacity onPress={ onPress }>
        <Span { ...style }>{ children }</Span>
    </TouchableOpacity>
}

Link.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    onPress: PropTypes.func
};

export { H1, H2, H3, P, Span, Link };
