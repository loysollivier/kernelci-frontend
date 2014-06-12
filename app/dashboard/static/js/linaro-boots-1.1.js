// JavaScript code for the boots.html template
$(document).ready(function() {
    $('#li-boot').addClass('active');

    $('body').tooltip({
        'selector': '[rel=tooltip]',
        'placement': 'auto'
    });

    $('#bootstable').dataTable({
        'dom': '<"row"<"col-lg-6"<"length-menu"l>>' +
            '<"col-lg-4 col-lg-offset-2"f>r<"col-lg-12"t>>' +
            '<"row"<"col-lg-6"i><"col-lg-6"p>>',
        'language': {
            'lengthMenu': '_MENU_&nbsp;<strong>boot reports per page</strong>',
            'zeroRecords': '<strong>No boot reports to display.</strong>',
            'search': '<div id="search-area" class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span>_INPUT_</div>'
        },
        'lengthMenu': [25, 50, 75, 100],
        'ordering': true,
        'processing': true,
        'stateDuration': -1,
        'stateSave': true,
        'order': [4, 'desc'],
        'search': {
            'regex': true
        },
        'ajax': {
            'url': '/_ajax/boot',
            'traditional': true,
            'dataType': 'json',
            'dataSrc': 'result',
            'dataFilter': function(data, type) {
                if (type === 'json') {
                    var parsed = JSON.parse(data);
                    parsed.result = JSON.parse(parsed.result);
                    return JSON.stringify(parsed);
                }
                return data;
            },
            'data': {
                'sort': 'created_on',
                'sort_order': -1,
                'date_range': 15,
                'field': [
                    'job', 'kernel', 'defconfig', 'board', 'created_on',
                    'status'
                ]
            }
        },
        'columns': [
            {
                'data': 'job',
                'title': 'Tree'
            },
            {
                'data': 'kernel',
                'title': 'Kernel'
            },
            {
                'data': 'defconfig',
                'title': 'Defconfig'
            },
            {
                'data': 'board',
                'title': 'Board Model'
            },
            {
                'data': 'created_on',
                'title': 'Date',
                'type': 'date',
                'render': function(data, type, object) {
                    var created = new Date(data['$date']);
                    return created.getCustomISODate();
                }
            },
            {
                'data': 'status',
                'title': 'Status',
                'type': 'string',
                'render': function(data, type, object) {
                    var displ;
                    switch (data) {
                        case 'PASS':
                            displ = '<span rel="tooltip" ' +
                                'data-toggle="tooltip"' +
                                'title="Boot completed">' +
                                '<span class="label label-success">' +
                                '<i class="fa fa-check"></i></span></span>';
                            break;
                        case 'FAIL':
                            displ = '<span rel="tooltip" ' +
                                'data-toggle="tooltip"' +
                                'title="Boot failed">' +
                                '<span class="label label-danger">' +
                                '<i class="fa fa-exclamation-triangle">' +
                                '</i></span></span>';
                            break;
                        case 'OFFLINE':
                            displ = '<span rel="tooltip"' +
                                'data-toggle="tooltip"' +
                                'title="Board offline"' +
                                '<span class="label label-info">' +
                                '<i class="fa fa-power-off">' +
                                '</i></span></span>';
                            break;
                        default:
                            displ = '<span rel="tooltip" ' +
                                'data-toggle="tooltip"' +
                                'title="Unknown status">' +
                                '<span class="label label-warning">' +
                                '<i class="fa fa-question">' +
                                '</i></span></span>';
                            break;
                    }
                    return displ;
                }
            },
            {
                'data': 'board',
                'title': '',
                'orderable': false,
                'searchable': false,
                'render': function(data, type, object) {
                    var defconfig = object.defconfig,
                        kernel = object.kernel,
                        job = object.job;

                    return '<span rel="tooltip" data-toggle="tooltip"' +
                        'title="Details for board&nbsp;' + data + 'with&nbsp;' +
                        job + '&dash;' + kernel + '&dash;' + defconfig +
                        '"><a href="/boot/' + data + '/job/' + job +
                        '/kernel/' + kernel + '/defconfig/' + defconfig + '">' +
                        '<i class="fa fa-search"></i></a></span>';
                }
            }
        ]
    });

    $('#search-area > .input-sm').attr('placeholder', 'Filter the results');
    $('.input-sm').keyup(function(key) {
        // Remove focus from input when Esc is pressed.
        if (key.keyCode === 27) {
            $(this).blur();
        }
    });
});