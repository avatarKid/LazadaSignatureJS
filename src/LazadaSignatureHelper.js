var LazadaAPIHelper = function () {
    function uriToJson(query) {
        var json = {}
        var elements = query.split('&');
        elements.sort();

        for (var i in elements) {
            var items = elements[i].split('=');
            json[items[0]] = items[1]
        }
        return json;
    }
    function jsonToURI(json) {
        var uri = '';
        var keys = Object.keys(json);

        for (var i in keys) {
            uri += keys[i];
            uri += '=';
            uri += encodeURIComponent(json[keys[i]]);
            if (i < keys.length - 1) {
                uri += '&'
            }
        }
        return uri
    }
    function generateSignature(uri, apiKey) {
        return sha256.hmac(apiKey, uri)
    }

    return {
        generateURI: function(jsonParam, apiKey){
            var uri = jsonToURI(jsonParam);
            uri += '&Signature=' + generateSignature(uri, apiKey);
            return uri;
        },
        uriToJson: function (uri) {
            uri = decodeURIComponent(uri);
            return uriToJson(uri);
        }
    }
}();
