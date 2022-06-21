<?php
return [
    //测试
    'test' => ['admin/base/test', ['method' => 'GET']],

    //登录接口
    '[admin/base]' => [
        'login' => ['admin/base/login', ['method' => 'POST']],
        'site' => ['admin/base/site', ['method' => 'POST,GET']],
        'distance' => ['admin/base/distance', ['method' => 'POST,GET']],
        'price' => ['admin/base/price', ['method' => 'POST,GET']],
    ],

    '[admin/site]' => [
        'add' => ['admin/site/add', ['method' => 'POST']],
        'edit' => ['admin/site/edit', ['method' => 'POST']],
        'delete' => ['admin/site/delete', ['method' => 'POST']],

    ],

    '[admin/distance]' => [
        'add' => ['admin/distance/add', ['method' => 'POST']],
        'edit' => ['admin/distance/edit', ['method' => 'POST']],
        'delete' => ['admin/distance/delete', ['method' => 'POST']]
    ],

    '[admin/price]' => [
        'edit' => ['admin/price/edit', ['method' => 'POST']]
    ],

    '[admin/order]' => [
        'index' => ['admin/order/index', ['method' => 'POST']],
        'apply' => ['admin/order/apply', ['method' => 'POST']],
        'agree' => ['admin/order/agree', ['method' => 'POST']],
        'refuse' => ['admin/order/refuse', ['method' => 'POST']],
        'delete' => ['admin/order/delete', ['method' => 'POST']],
    ],

    '[home/base]' => [
        'login' => ['home/base/login', ['method' => 'POST']],
        'register' => ['home/base/register', ['method' => 'POST']],
    ],

    '[home/cart]' => [
        'index' => ['home/cart/index', ['method' => 'POST']],
        'add' => ['home/cart/add', ['method' => 'POST']],
        'delete' => ['home/cart/delete', ['method' => 'POST']],
    ],

    '[home/order]' => [
        'index' => ['home/order/index', ['method' => 'POST']],
        'add' => ['home/order/add', ['method' => 'POST']],
        'edit' => ['home/order/edit', ['method' => 'POST']],
        'delete' => ['home/order/delete', ['method' => 'POST']],
    ],


    // MISS路由
    '__miss__' => 'admin/base/miss',
];