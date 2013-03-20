// --------------------------------------------------------------------------------------------------------------------
//
// storagegateway.js - class for AWS Storage Gateway
//
// Copyright (c) 2011, 2012 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------
// requires

// built-ins
var util = require('util');

// dependencies
var _ = require('underscore');

// our own
var awssum = require('awssum');
var amazon = require('awssum-amazon');
var operations = require('./config.js');

// --------------------------------------------------------------------------------------------------------------------
// package variables

var MARK = 'storagegateway: ';

// From: http://docs.amazonwebservices.com/general/latest/gr/rande.html
var endPoint = {};
endPoint[amazon.US_EAST_1]      = "storagegateway.us-east-1.amazonaws.com";
endPoint[amazon.US_WEST_1]      = "storagegateway.us-west-1.amazonaws.com";
endPoint[amazon.US_WEST_2]      = "storagegateway.us-west-2.amazonaws.com";
endPoint[amazon.EU_WEST_1]      = "storagegateway.eu-west-1.amazonaws.com";
endPoint[amazon.AP_SOUTHEAST_1] = "storagegateway.ap-southeast-1.amazonaws.com";
endPoint[amazon.AP_SOUTHEAST_2] = "storagegateway.ap-southeast-2.amazonaws.com";
endPoint[amazon.AP_NORTHEAST_1] = "storagegateway.ap-northeast-1.amazonaws.com";
endPoint[amazon.SA_EAST_1]      = "storagegateway.sa-east-1.amazonaws.com";
// endPoint[amazon.US_GOV_WEST_1]  = "";

var version = '20120430';

// --------------------------------------------------------------------------------------------------------------------
// constructor

var StorageGateway = function(opts) {
    var self = this;

    // call the superclass for initialisation
    StorageGateway.super_.call(this, opts);

    // check the region is valid
    if ( ! endPoint[opts.region] ) {
        throw MARK + "invalid region '" + opts.region + "'";
    }

    return self;
};

// inherit from Amazon
util.inherits(StorageGateway, amazon.AmazonSignatureV4);

// --------------------------------------------------------------------------------------------------------------------
// methods we need to implement from awssum.js/amazon.js

StorageGateway.prototype.scope = function() {
    return 'storagegateway';
};

StorageGateway.prototype.serviceName = function() {
    return 'StorageGateway';
};

StorageGateway.prototype.needsTarget = function() {
    return true;
};

StorageGateway.prototype.method = function() {
    return 'POST';
};

StorageGateway.prototype.host = function() {
    return endPoint[this.region()];
};

StorageGateway.prototype.version = function() {
    return version;
};

StorageGateway.prototype.extractBody = function() {
    return 'json';
};

// --------------------------------------------------------------------------------------------------------------------
// operations on the service

_.each(operations, function(operation, operationName) {
    StorageGateway.prototype[operationName] = awssum.makeOperation(operation);
});

// --------------------------------------------------------------------------------------------------------------------
// exports

exports.StorageGateway = StorageGateway;

// --------------------------------------------------------------------------------------------------------------------
