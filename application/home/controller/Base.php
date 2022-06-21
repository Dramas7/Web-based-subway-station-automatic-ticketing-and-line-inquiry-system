<?php

namespace app\home\controller;

use app\common\controller\Common;
use think\Request;
use think\Db;


class Base extends Common
{



    /**
     * 用户登录
     * @return \think\response\Json
     */
    public function login()
    {
        $param = $this->checkParam('username,password');
        $info = db('home_user')->where('username|email', $param['username'])->find();
        if($info){
            if ($param['password'] !== $info['password']) {
                return error('密码错误');
            }
            $token = array(
                'id' => $info['id']
            );
            $res['utoken'] = token_encrypt(json_encode($token));
            $res['username'] = $info['username'];
            $res['email'] = $info['email'];
            return success($res,'登陆成功');
        }
        return error('用户不存在');
    }

    public function register(){
        $param = $this->checkParam('username,password,email');
        if(db('home_user')->where('username',$param['username'])->count()){
            return error('用户名已经存在');
        }
        if(db('home_user')->where('email',$param['email'])->count()){
            return error('邮箱已经存在');
        }
        $param['update_time'] = time();
        if(db('home_user')->insert($param)){
            return success('', '注册成功');
        }else{
            return error('注册失败');
        }
    }


}
