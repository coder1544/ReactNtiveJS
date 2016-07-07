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
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    style: View.propTypes.style,
};

var isLoaded = false;

class LoadingImage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          finishError : false,
      };
      this.onLoadSuccess = this.onLoadSuccess.bind(this);
      this.onLoadFinish = this.onLoadFinish.bind(this);
    }

    render(){
        //判断是加载网络图片还是本地图片
        if(this.state.finishError){
          // 加载失败
            return this.renderError();
        }else{
          // 加载成功
            return this.renderUrl();
        }
    }

    renderUrl(){
        return (
          <Image
               onLoad = {this.onLoadSuccess}
               onLoadEnd = {this.onLoadFinish}
               resizeMode = "contain"
               style = {this.props.style}
               source = {this.props.source} />
       );
    }

    renderError() {
        return (
            <Image
                resizeMode="contain"
                style={this.props.style}
                source={this.props.errorSource} />
        );
    }

    // 加载成功
    onLoadSuccess() {
      //改标记值
      this.isLoaded = true;
      this.props.onLoad;
    }

    // 加载结束
    onLoadFinish() {
      // 如果加载不成功则重新绘制view
      if (!this.isLoaded) {
        this.setState({finishError : true});
      }
      this.props.onLoadEnd;
    }

}

LoadingImage.propTypes = propTypes;

LoadingImage.defaultProps = {
	disabled: false
};

export default LoadingImage;
