<?php

namespace app\admin\controller;

use app\common\controller\Common;
use think\Request;
use think\Db;


class Price extends Common
{

    protected $id;

    public function _initialize(){
        parent::_initialize();
        $param = $this->param;

        if(array_key_exists("token",$param)){
            $token = $param["token"];
            $token = str_replace(' ','+',$token);
            $token = token_decrypt($token);
            if($token){
                $token = json_decode($token, true);
                unset($this->param['token']);
                $this->id = $token['id'];
            }else{
                exit(error('请先登录','',400));
            }
        }else{
            exit(error('请先登录','',400));

        }
    }






    public function edit(){
        $param = $this->param;
        $param['updatetime'] = time();
        if(db('admin_price')->where('id',1)->update($param)){
            return success('', '编辑成功');
        }else{
            return error('编辑失败');
        }
    }






}
