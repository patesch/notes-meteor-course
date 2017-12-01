// import React, { PropTypes } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

// import history from './history';

export default function Link(props) {
    const { href, history } = props;
    return (<a
        href={href}
        onClick={event => {
            event.preventDefault();
            history.push(href);
        }}
    >
        {props.children}
    </a>);
}

Link.propTypes = {
    href: PropTypes.string.isRequired
};
