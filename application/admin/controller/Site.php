<?php

namespace app\admin\controller;

use app\common\controller\Common;
use think\Request;
use think\Db;


class Site extends Common
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



    public function add(){
        $param = $this->checkParam('name,uid,line');
        if(db('admin_site')->where('uid',$param['uid'])->count()){
            return error('站点ID已经存在');
        }
        $param['updatetime'] = time();
        if(db('admin_site')->insert($param)){
            return success('', '添加成功');
        }else{
            return error('添加失败');
        }
    }


    public function edit(){
        $param = $this->checkParam('id,name,uid,line');
        if(db('admin_site')->where('uid',$param['uid'])->where('id','neq',$param['id'])->count()){
            return error('站点ID已经存在');
        }
        $param['updatetime'] = time();
        if(db('admin_site')->where('id',$param['id'])->update($param)){
            return success('', '编辑成功');
        }else{
            return error('编辑失败');
        }
    }

    public function delete(){
        $param = $this->checkParam('id');
        if(db('admin_site')->where('id',$param['id'])->delete()){
            return success('', '删除成功');
        }else{
            return error('删除失败');
        }
    }





}
