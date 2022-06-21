<?php
// +----------------------------------------------------------------------
// | Description: 解决跨域问题
// +----------------------------------------------------------------------
// | Author: linchuangbin <linchuangbin@honraytech.com>
// +----------------------------------------------------------------------

namespace app\common\controller;

use think\Controller;
use think\Request;

class Common extends Controller
{
    public $param = false;
    public function _initialize()
    {
        parent::_initialize();
        //跨域
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, sessionId,n-token");
        //预检查
        header('Access-Control-Max-Age: 6000');
        $param =  Request::instance()->param();
        //GET或者POST参数
        if(count($param) > 0){
            $this->param = $param;
        }
    }

    /**
     * 检查参数
     */
    protected function checkParam($required=''){
        $param = $this->param;
        if(empty($param)){
            exit(error('参数错误'));
        }
        if(strlen($required)){
            $required = explode(",", $required);
            foreach ($required as $item){
                if(!array_key_exists($item,$param)){
                    exit(error('参数错误'));
                }
            }
        }
        return $param;
    }

}
 