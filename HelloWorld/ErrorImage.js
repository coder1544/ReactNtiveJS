'use strict';

import React, {PropTypes} from 'react';
import {
    Component,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

const propTypes = {
    disabled: PropTypes.bool,
    source: PropTypes.oneOfType([
    	PropTypes.shape({
    		uri: PropTypes.string,
    	}),
    	// Opaque type returned by require('./image.jpg')
    	PropTypes.number,
    ]),
    errorSource: PropTypes.number,
    placeSource: PropTypes.number,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    style: View.propTypes.style,
};

// 是否加载的标志
var isLoaded = false;

class ErrorImage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          finishError : false,
      };
      this.onLoadSuccess = this.onLoadSuccess.bind(this);
      this.onLoadFinish = this.onLoadFinish.bind(this);
    }

    render(){
        return this.renderUrl();
    }

    renderUrl(){
        return (
          <Image
               onLoad = {this.onLoadSuccess}
               onLoadEnd = {this.onLoadFinish}
               resizeMode = "contain"
               style = {this.props.style}
               source = {this.state.finishError ? this.props.errorSource : this.props.source} >
         </Image>
       );
    }

    // 加载成功
    onLoadSuccess() {
      if (this.isLoaded) {
        return;
      }
      //改标记值
      this.isLoaded = true;
      this.props.onLoad;
    }

    // 加载结束
    onLoadFinish() {
      if (this.state.finishError) {
        return;
      }
      // 如果加载不成功则重新绘制view
      if (!this.isLoaded) {
        // 设置加载结束
        this.isLoaded = true;
        this.setState({finishError : true});
      }
      this.props.onLoadEnd;
    }

}

ErrorImage.propTypes = propTypes;

ErrorImage.defaultProps = {
	disabled: false
};

export default ErrorImage;
