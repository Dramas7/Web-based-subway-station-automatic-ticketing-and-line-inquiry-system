<?php

namespace app\home\controller;

use app\common\controller\Common;
use think\Request;
use think\Db;


class Cart extends Common
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
        $list = db('home_cart')->where('user_id', $this->id)->order('id desc')->select();
        foreach ($list as $key=>$item){
            $item['start'] = $this->getSiteName($item['start']);
            $item['end'] = $this->getSiteName($item['end']);
            $item['pass'] = strlen($item['pass']) ? explode(',', $item['pass']) : [];
            foreach ($item['pass'] as $a=>$b){
                $item['pass'][$a] = $this->getSiteName($b);
            }
            $list[$key] = $item;
        }
        return success($list);
    }

    private function getSiteName($site){
        return db('admin_site')->where('uid', $site)->value('name');
    }



    public function add(){
        $param = $this->checkParam('start,end,distance,price');
        if(db('home_cart')->where('start',$param['start'])->where('end',$param['end'])->where('user_id',$this->id)->count()){
            return error('请不要重复收藏该路线');
        }
        $param['user_id'] = $this->id;

        $param['create_time'] = format_date(time());
        if(db('home_cart')->insert($param)){
            return success('', '添加成功');
        }else{
            return error('添加失败');
        }
    }




    public function delete(){
        $param = $this->checkParam('id');
        if(db('home_cart')->where('id',$param['id'])->delete()){
            return success('', '删除成功');
        }else{
            return error('删除失败');
        }
    }





}
