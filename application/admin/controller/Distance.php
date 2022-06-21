<?php

namespace app\admin\controller;

use app\common\controller\Common;
use think\Request;
use think\Db;


class Distance extends Common
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
        $param = $this->checkParam('start,end,distance');
        $this->changeStart($param);
        if(db('admin_distance')->where('start',$param['start'])->where('end',$param['end'])->count()){
            return error('数据已经存在');
        }
        $param['updatetime'] = time();
        if(db('admin_distance')->insert($param)){
            return success('', '添加成功');
        }else{
            return error('添加失败');
        }
    }


    public function edit(){
        $param = $this->checkParam('start,end,distance');
        $this->changeStart($param);
        $info = db('admin_distance')->where('start', $param['start'])->where('end', $param['end'])->find();
        if(!$info){
            return error('数据不存在');
        }
        $param['updatetime'] = time();
        if(db('admin_distance')->where('id',$info['id'])->update($param)){
            return success('', '编辑成功');
        }else{
            return error('编辑失败');
        }
    }

    public function delete(){
        $param = $this->checkParam('start,end');
        $this->changeStart($param);
        $info = db('admin_distance')->where('start', $param['start'])->where('end', $param['end'])->find();
        if(!$info){
            return error('数据不存在');
        }
        if(db('admin_distance')->where('id',$info['id'])->delete()){
            return success('', '删除成功');
        }else{
            return error('删除失败');
        }
    }

    private function changeStart(&$param){
        if($param['start']>$param['end']){
            $temp = $param['start'];
            $param['start'] = $param['end'];
            $param['end'] = $temp;
        }
    }





}
