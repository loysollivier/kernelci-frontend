/*!
 * kernelci dashboard.
 * 
 * Copyright (C) 2014, 2015, 2016, 2017  Linaro Ltd.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
define([
    'compare/events',
    'compare/factory',
    'utils/html'
], function(cevents, factory, html) {
    'use strict';
    var bootCompare;
    var containerElement;
    var dataBucket;

    /**
     * Initialize a boot comparison.
     *
     * @param {HTMLDivElement} container: The element that should contain the
     * comparison.
     * @param {HTMLDivElement} bucket: The element where the data list
     * options should be added. If it is not passed, a new one will be created.
    **/
    bootCompare = function(container, bucket) {
        containerElement = container;

        if (bucket !== undefined && bucket !== null) {
            dataBucket = bucket;
        } else {
            dataBucket = factory.dataBucket();
            containerElement.appendChild(dataBucket);
        }

        return bootCompare;
    };

    /**
     * Return the associated bucket element.
    **/
    bootCompare.bucket = function() {
        return dataBucket;
    };

    /**
     * Create the boot comparison selection.
     * Create the baseline choice and the multiple compare targets one.
    **/
    bootCompare.create = function() {
        html.removeChildren(containerElement);
        containerElement.appendChild(factory.baseline('boot', dataBucket.id));
        containerElement.appendChild(
            factory.multiCompare('boot', true, dataBucket.id));
        containerElement.appendChild(factory.submitButton('boot'));
        cevents.getTrees(dataBucket);

        return bootCompare;
    };

    return bootCompare;
});
