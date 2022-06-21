<?php

namespace app\admin\controller;

use app\common\controller\Common;
use think\Request;
use think\Db;


class Base extends Common
{

    public function test()
    {
        if('A03'>'A02'){
            r_dump(11);
        }else{
            r_dump(22);
        }

    }

    /**
     * 用户登录
     * @return \think\response\Json
     */
    public function login()
    {
        $param = $this->checkParam('username,password');
        $info = db('admin_user')->where('username', $param['username'])->find();
        if($info){
            if (user_md5($param['password']) !== $info['password']) {
                return error('密码错误');
            }
            $token = array(
                'id' => $info['id']
            );
            $token = token_encrypt(json_encode($token));
            return success($token,'登陆成功');
        }
        return error('用户不存在');

    }

    public function site(){
        $list = db('admin_site')->order('line asc,uid asc')->select();
        $res = [];
        foreach ($list as $item){
            $res[$item['line']][] = $item;
        }
        return success($res);
    }

    public function distance(){
        $list = db('admin_distance')->field('start,end,distance')->order('start asc')->select();
        return success($list);
    }

    public function price(){
        $list = db('admin_price')->field('id,updatetime', true)->find(1);
        return success($list);
    }


    /**
     * miss路由
     * @return string
     */
    public function miss()
    {
        if (Request::instance()->isOptions()) {
            return '';
        } else {
            echo 'VUE接口';
        }
    }
}
