<?php

namespace app\admin\controller;

use app\common\controller\Common;
use think\Request;
use think\Db;


class Order extends Common
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

    public function index(){
        $list = db('home_order')->order('id desc')->select();
        foreach ($list as $key=>$item){
            $item['start'] = $this->getSiteName($item['start']);
            $item['end'] = $this->getSiteName($item['end']);
            $item['status'] = $this->getStatusName($item['status']);
            $item['user'] = db('home_user')->where('id', $item['user_id'])->field('username,email')->find();
            $list[$key] = $item;
        }
        return success($list);
    }

    public function apply(){
        $list = db('home_order')->where('status','neq',1)->order('id desc')->select();
        foreach ($list as $key=>$item){
            $item['start'] = $this->getSiteName($item['start']);
            $item['end'] = $this->getSiteName($item['end']);
            $item['user'] = db('home_user')->where('id', $item['user_id'])->field('username,email')->find();
            $list[$key] = $item;
        }
        return success($list);
    }

    private function getSiteName($site){
        return db('admin_site')->where('uid', $site)->value('name');
    }

    private function getStatusName($status){
        if($status == 1){
            return '购买成功';
        }elseif ($status == 2){
            return '退票申请中';
        }elseif ($status == 3){
            return '退票成功';
        }else{
            return '退票失败';
        }

    }


    public function agree(){
        $param = $this->checkParam('id');

        $update['status'] = 3;

        if(db('home_order')->where('id',$param['id'])->update($update)){
            return success('', '操作成功');
        }else{
            return error('操作失败');
        }
    }

    public function refuse(){
        $param = $this->checkParam('id');

        $update['status'] = 4;

        if(db('home_order')->where('id',$param['id'])->update($update)){
            return success('', '操作成功');
        }else{
            return error('操作失败');
        }
    }




    public function delete(){
        $param = $this->checkParam('id');
        if(db('home_order')->where('id',$param['id'])->delete()){
            return success('', '删除成功');
        }else{
            return error('删除失败');
        }
    }





}
