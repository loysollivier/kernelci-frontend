// JavaScript code for the index.html template.
$(document).ready(function() {
    $('#li-home').addClass('active');
    $('body').tooltip({
        'selector': '[rel=tooltip]',
        'placement': 'auto'
    });

    $.ajax({
        'url': '/_ajax/defconf',
        'traditional': true,
        'dataType': 'json',
        'context': $('#failed-builds-body'),
        'data': {
            'limit': 5,
            'status': 'FAIL',
            'sort': 'created_on',
            'sort_order': -1,
            'date_range': 15,
            'field': ['job', 'kernel', 'metadata', 'created_on']
        },
        'dataFilter': function(data, type) {
            if (type === 'json') {
                return JSON.parse(data).result;
            }
            return data;
        },
        'statusCode': {
            404: function() {
                $('#failed-builds-body').empty().append(
                    '<tr><td colspan="4" align="center" valign="middle">' +
                    '<h4>Error loading data.</h4></td></tr>'
                );
                var text = '<div id="defconfs-404-error" ' +
                    'class="alert alert-danger alert-dismissable">' +
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">&times;</button>' +
                    '404 error while loading defconfigs from the server.\n' +
                    'Please contact the website administrators.' +
                    '</div>';
                $('#errors-container').append(text);
                $('#defconfs-404-error').alert();
            },
            500: function() {
                $('#failed-builds-body').empty().append(
                    '<tr><td colspan="4" align="center" valign="middle">' +
                    '<h4>Error loading data.</h4></td></tr>'
                );
                var text = '<div id="defconfs-500-error" ' +
                    'class="alert alert-danger alert-dismissable">' +
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">&times;</button>' +
                    '500 error while loading defconfigs from the server.\n' +
                    'Please contact the website administrators.' +
                    '</div>';
                $('#errors-container').append(text);
                $('#defconfs-500-error').alert();
            }
        }
    }).done(function(data) {
        var row = '',
            job, created, col1, col2, col3, col4,
            kernel, git_branch,
            i = 0,
            len = data.length;

        $(this).empty();

        if (len === 0) {
            row = '<tr><td colspan="4" align="center" valign="middle"><h4>' +
                'No failed builds.</h4></td></tr>';
            $(this).append(row);
        } else {
            for (i; i < len; i++) {
                job = data[i].job;
                kernel = data[i].kernel;
                git_branch = data[i].metadata.git_branch;
                created = new Date(data[i].created_on['$date']);

                col1 = '<td>' + job + '&nbsp;&dash;&nbsp;<small>' +
                    git_branch + '</small></td>';
                col2 = '<td>' + kernel + '</td>';
                col3 = '<td>' + created.getCustomISODate() + '</td>';
                col4 = '<td>' +
                    '<span rel="tooltip" data-toggle="tooltip" ' +
                    'title="Details for job&nbsp;' + job +
                    '&nbsp;&dash;&nbsp;' + kernel + '">' +
                    '<a href="/job/' + job + '/kernel/' + kernel + '/">' +
                    '<i class="fa fa-search"></i></a>' +
                    '</span></td>';
                row += '<tr>' + col1 + col2 + col3 + col4 + '</tr>';
            }

            $(this).append(row);
        }
    });

    $.ajax({
        'url': '/_ajax/job',
        'dataType': 'json',
        'traditional': true,
        'context': $('#failed-jobs-body'),
        'data': {
            'limit': 5,
            'status': 'FAIL',
            'sort': 'created_on',
            'sort_order': -1,
            'date_range': 15,
            'field': ['job', 'kernel', 'created_on', 'metadata']
        },
        'dataFilter': function(data, type) {
            if (type === 'json') {
                return JSON.parse(data).result;
            }
            return data;
        },
        'statusCode': {
            404: function() {
                $('#failed-jobs-body').empty().append(
                    '<tr><td colspan="4" align="center" valign="middle">' +
                    '<h4>Error loading data.</h4></td></tr>'
                );
                var text = '<div id="jobs-404-error" ' +
                    'class="alert alert-danger alert-dismissable">' +
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">&times;</button>' +
                    '404 error while loading jobs from the server.\n' +
                    'Please contact the website administrators.' +
                    '</div>';
                $('#errors-container').append(text);
                $('#jobs-404-error').alert();
            },
            500: function() {
                $('#failed-jobs-body').empty().append(
                    '<tr><td colspan="4" align="center" valign="middle">' +
                    '<h4>Error loading data.</h4></td></tr>'
                );
                var text = '<div id="jobs-500-error" ' +
                    'class="alert alert-danger alert-dismissable">' +
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">&times;</button>' +
                    '500 error while loading jobs from the server.\n' +
                    'Please contact the website administrators.' +
                    '</div>';
                $('#errors-container').append(text);
                $('#jobs-500-error').alert();
            }
        }
    }).done(function(data) {
        var row = '',
            created, col1, col2, col3, col4,
            job, kernel, git_branch,
            i = 0,
            len = data.length;

        $(this).empty();

        if (len === 0) {
            row = '<tr><td colspan="4" align="center" valign="middle"><h4>' +
                'No failed jobs.</h4></td></tr>';
            $(this).append(row);
        } else {
            for (i; i < len; i++) {
                created = new Date(data[i].created_on['$date']);
                job = data[i].job;
                kernel = data[i].kernel;
                git_branch = data[i].metadata.git_branch;

                col1 = '<td>' + job + '&nbsp;&dash;&nbsp;<small>' +
                    git_branch + '</small>' + '</td>';
                col2 = '<td>' + kernel + '</td>';
                col3 = '<td>' + created.getCustomISODate() + '</td>';
                col4 = '<td>' +
                    '<span rel="tooltip" data-toggle="tooltip" ' +
                    'title="Details for job&nbsp;' + job +
                    '&nbsp;&dash;&nbsp;' + kernel + '">' +
                    '<a href="/job/' + job + '/kernel/' + kernel + '/">' +
                    '<i class="fa fa-search"></i></a>' +
                    '</span></td>';
                row = '<tr>' + col1 + col2 + col3 + col4 + '</tr>';
            }

            $(this).append(row);
        }
    });

    $.ajax({
        'url': '/_ajax/boot',
        'traditional': true,
        'dataType': 'json',
        'context': $('#failed-boots-body'),
        'data': {
            'limit': 15,
            'status': 'FAIL',
            'sort_order': -1,
            'sort': 'created_on',
            'field': ['board', 'job', 'kernel', 'defconfig', 'created_on']
        },
        'dataFilter': function(data, type) {
            if (type === 'json') {
                return JSON.parse(data).result;
            }
            return data;
        },
        'statusCode': {
            404: function() {
                $('#failed-boots-body').empty().append(
                    '<tr><td colspan="6" align="center" valign="middle">' +
                    '<h4>Error loading data.</h4></td></tr>'
                );
                var text = '<div id="boots-404-error" ' +
                    'class="alert alert-danger alert-dismissable">' +
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">&times;</button>' +
                    'Error while loading boot reports from the server.\n' +
                    'Please contact the website administrators.&nbsp;' +
                    'Error code was: 404' +
                    '</div>';
                $('#errors-container').append(text);
                $('#boots-404-error').alert();
            },
            500: function() {
                $('#failed-boots-body').empty().append(
                    '<tr><td colspan="6" align="center" valign="middle">' +
                    '<h4>Error loading data.</h4></td></tr>'
                );
                var text = '<div id="boots-500-error" ' +
                    'class="alert alert-danger alert-dismissable">' +
                    '<button type="button" class="close" ' +
                    'data-dismiss="alert" aria-hidden="true">&times;</button>' +
                    'Error while loading boot reports from the server.\n' +
                    'Please contact the website administrators.&nbsp;' +
                    'Error code was: 500' +
                    '</div>';
                $('#errors-container').append(text);
                $('#boots-500-error').alert();
            }
        }
    }).done(function(data) {
        var row = '',
            created, board, job, kernel, defconfig,
            col1, col2, col3, col4, col5, col6,
            len = data.length,
            i = 0;

        $(this).empty();

        if (len === 0) {
            row = '<tr><td colspan="6" align="center" valign="middle"><h4>' +
                'No failed boot reports.</h4></td></tr>';
            $(this).append(row);
        } else {
            for (i; i < len; i++) {
                created = new Date(data[i].created_on['$date']);
                job = data[i].job;
                kernel = data[i].kernel;
                board = data[i].board;
                defconfig = data[i].defconfig;

                col1 = '<td>' + job + '</td>';
                col2 = '<td>' + kernel + '</td>';
                col3 = '<td>' + board + '</td>';
                col4 = '<td>' + defconfig + '</td>';
                col5 = '<td>' + created.getCustomISODate() + '</td>';
                col6 = '<td>' +
                    '<span rel="tooltip" data-toggle="tooltip" ' +
                    'title="Details for board&nbsp;' + board + '">' +
                    '<a href="/boot/' + board + '/job/' + job + '/kernel/' +
                    kernel + '/defconfig/' + defconfig + '/">' +
                    '<i class="fa fa-search"></i></a>' +
                    '</span></td>';
                row += '<tr>' + col1 + col2 + col3 + col4 +
                        col5 + col6 + '</tr>';
            }

            $(this).append(row);
        }
    });
});