import config from './config';
import sdk from './src';

((root) => {
    let sdkRef = root[config.globalName];
    if (sdkRef && sdkRef._ready && sdkRef._config) {
        sdk.init(sdkRef._config).then(sdkRef._ready.bind(sdkRef, sdk));
    } else {
        root[config.globalName] = sdk;
    }
})(window);
