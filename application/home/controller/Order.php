<?php

namespace app\home\controller;

use app\common\controller\Common;
use think\Request;
use think\Db;


class Order extends Common
{

    protected $id;

    public function _initialize(){
        parent::_initialize();
        $param = $this->param;
        if(array_key_exists("utoken",$param)){
            $token = $param["utoken"];
            $token = str_replace(' ','+',$token);
            $token = token_decrypt($token);
            if($token){
                $token = json_decode($token, true);
                unset($this->param['utoken']);
                $this->id = $token['id'];
            }else{
                exit(error('请先登录','',400));
            }
        }else{
            exit(error('请先登录','',400));
        }
    }

    public function index(){
        $list = db('home_order')->where('user_id', $this->id)->order('id desc')->select();
        foreach ($list as $key=>$item){
            $item['start'] = $this->getSiteName($item['start']);
            $item['end'] = $this->getSiteName($item['end']);
            $item['status'] = $this->getStatusName($item['status']);

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



    public function add(){
        $param = $this->checkParam('start,end,price');
        $param['user_id'] = $this->id;
        $param['order_id'] = 'OD' . strtoupper(uniqid());
        $param['create_time'] = format_date(time());
        $param['status'] = 1;

        if(db('home_order')->insert($param)){
            return success('', '购买成功');
        }else{
            return error('购买失败');
        }
    }

    public function edit(){
        $param = $this->checkParam('id,reason');

        $update['status'] = 2;
        $update['reason'] = $param['reason'];

        if(db('home_order')->where('id',$param['id'])->update($update)){
            return success('', '申请成功');
        }else{
            return error('申请失败');
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
